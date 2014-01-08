/*:
*/
/*
*/

var vm = require( "vm" );
var fs = require( "fs" );
var util = require( "util" );

var encodify = require( "./encodify.js" );
var decodify = require( "./decodify.js" );

var sharedDependencies = { };
var sharedEnvironment = { };
var dependencyLoaded = false;
var filePattern = /[-\w]+\.js$/;
var otherFilePattern = /[-\w]+$/;
var uncontaminatedGlobal = { };

/*
	This should be called before boot.
	This will prepare the necessary dependencies, populate the require cache,
		and made it available to all modules.

	The difference here with the shared environment is that
		the dependency can only be applied if needed.
		This function will just cache it. Shared environment,
		on the other hand, is loaded explicitly from the moment
		on and succeeding requires will adapt the current shared environment.

	The configuration contains an object with keys similar
		to the way we require modules (the module name itself)
		and the path or the module name as the value.

	The dependency configuration is given on the very first boot of this module.

	Generally we have 3 kinds of dependency,
		1. IN-BOOT Dependency
			This dependency is given on the boot of this module.
		2. SHARED dependency
			This dependency is given during the execution of the program
			thus affects other modules that already loaded.
		3. LOCAL Dependency
			This dependency only affects this module.
*/
exports.loadDependencyConfiguration = function loadDependencyConfiguration( configuration ){
	var dependency = "";

	for( var key in configuration ){
		depedency = configuration[ key ];
		sharedDependencies[ key ] = require( dependency );
	}

	dependencyLoaded = true;
};

var loadDefaultGlobalDependencies = function loadDefaultGlobalDependencies( ){
	if( !( "contaminated" in global ) ){
		for( var key in global ){
			uncontaminatedGlobal[ key ] = global[ key ];
		}
	}
};

/*
	We can bind a "file as a namespace" into a "namespace reference" visible to other modules.
	
	File as a namespace is like this,
		require( "./file/path/engine.js" );
	
	Namespace reference is like this,
		require( "engine" );

	So if instead doing the file as a namespace procedure we want to do the namespace
		reference procedure for concise approach.

	This has a major and extreme issue because you cannot reuse the same namespace
		for different files.
*/
exports.injectDependency = function injectDependency( namespace, filePath ){
	if( fs.statSync( filePath ).isFile( ) ){
		if( namespace in sharedDependencies ){
			var data = JSON.stringify( {
				"namespace": namespace,
				"filePath": filePath,
				"date": Date.now( )
			} );
			data = encodify( data );
			console.log( "warning:namespace already exists[" + data + "]" );
		}
		sharedDependencies[ namespace ] = require( filePath );	
	}
};

/*
	Dependency environment that can be set to all modules.
*/
exports.injectEnvironment = function injectEnvironment( environment ){
	for( var key in environment ){
		if( key in sharedEnvironment ){
			var data = JSON.stringify( {
				"entity": key,
				"date": Date.now( )
			} );
			data = encodify( data );
			console.log( "warning:module already exists[" + data + "]" );
		}
		sharedEnvironment[ key ] = environment[ key ];	
	}
};

/*
	This will be called by any bootloader engine. 
	Should be called on the very first execution of the nodejs.
*/
exports.boot = function boot( ){
	if( !dependencyLoaded ){
		throw new Error( "dependency configuration not loaded" );
	}

	if( "xrequire" in global ){
		return;
	}

	loadDefaultGlobalDependencies( );

	/*
		xrequire can load javascript files different from
			a traditional nodejs module file.

		xrequire is built with modularization in mind and such the following
			strict rules should be followed:
			1. No var keyword outside.
			2. Variables should contain a value.
			3. Preferably, variables should contain functions.
			4. Dependencies should be explicitly loaded outside and
				should be assumed that it is global inside.

		xrequire loaded javascripts exhibits the following behaviors:
			1. Variables inside functions without var leaks to other functions.
			2. State persists outside locally executed environment.

		Example:
			myVariable = function myVariable( ){
				//Statements here.
			};

		When accessing you can do this:
			loadedModule.myVariable( );
	*/
	global.contaminated = true;
	global.xrequire = function xrequire( namespace, dependencies ){
		/*
			A namespace may be a filepath so we have to remove other
				string tokens and focus on the filename.
			We will assume that the filename of the module is the same
				with the namespace of the module.
		*/
		var name = "";
		if( filePattern.test( namespace ) ){
			name = namespace.match( filePattern );
		}else if( otherFilePattern.test( namespace ) ){
			name = namespace.match( otherFilePattern );
		}

		if( !fs.statSync( namespace ).isFile( )
			&& !( name in sharedDependencies ) )
		{
			var data = JSON.stringify( {
				"namespace": namespace,
				"name": name
			} );
			data = encodify( data );
			throw new Error( "invalid file namespace[" + data + "]" );
		}

		/*
			We are doing this because we want to say that this file as a namespace can be
				a general namespace reference that can be used by other modules.
		*/
		if( !( name in sharedDependencies ) ){
			sharedDependencies[ name ] = namespace;
		}else if( sharedDependencies[ name ] !== namespace ){
			//The path is different that makes it more complicated.
			//TODO: Should we throw an error here?
			var data = JSON.stringify( {
				"namespace": namespace,
				"sharedDependencies": sharedDependencies
			} );
			data = encodify( data );
			throw new Error( "conflicting namespace[" + data + "]" );
		}

		var context= { 
			"module": { },
			"require": require,
			"exports": { }
		};

		//Set the globals
		for( var key in uncontaminatedGlobal ){
			context[ key ] = uncontaminatedGlobal[ key ];
		}

		//Set the environment.
		for( var key in sharedEnvironment ){
			context[ key ] = sharedEnvironment[ key ];	
		}

		//Set the dependencies.
		/*
			The value of the dependencies may be
				1. a reference name
				2. a filepath
		*/
		var dependencyName = "";
		for( var index in dependencies ){
			var dependency = dependencies[ index ];

			//If dependency is inside the sharedDependencies it is a file path.
			if( dependency in sharedDependencies ){
				dependency = sharedDependencies[ dependency ];
			}
			
			if( fs.existsSync( dependency ) ){
				//If dependency is a file we cannot look inside sharedDependencies.
				if( filePattern.test( dependency ) ){
					dependencyName = dependency.match( filePattern );
				}else if( otherFilePattern.test( namespace ) ){
					dependencyName = dependency.match( otherFilePattern );
				}
				context[ dependencyName ] = require( dependency );
				//I hope this continue works!
				continue;
			}

			//If the dependency is either present or not in the shared dependency list.
			context[ dependency ] = require( dependency );
		}

		context = vm.createContext( context );

		var script = fs.readFileSync( namespace, { "encoding": "utf8" } );

		try{
			vm.runInContext( script, context );
		}catch( error ){
			var data = JSON.stringify( {
				"namespace": namespace,
				"dependencies": dependencies,
				"error": error.stack
			} );
			data = encodify( data );
			throw new Error( "internal error[" + data + "]" );
		}

		var moduleBoot = context.exports.boot;
		context.exports.boot = function boot( ){			
			moduleBoot( );

			for( var key in context.global ){
				if( !( key in global ) ){
					global[ key ] = context.global;
				}
			}
		};

		return context.exports;
	};
};

exports.loadDependencyConfiguration( );
exports.boot( );

xrequire( "./ocf-parser.js" ).boot( );