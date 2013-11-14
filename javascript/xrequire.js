var vm = require( "vm" );
var fs = require( "fs" );

var sharedDependencies = { };
var sharedEnvironment = { };
var dependencyLoaded = false;

/*
	This should be called before boot.
	This will prepare the necessary dependencies, populate the require cache,
		and made it available to all modules.
*/
exports.loadDependencyConfiguration = function loadDependencyConfiguration( configuration ){
	var dependency = "";

	for( var key in configuration ){
		depedency = configuration[ key ];
		sharedDependencies[ key ] = require( dependency );
	}

	dependencyLoaded = true;
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
		sharedDependencies[ namespace ] = filePath;	
	}
};

/*
	Dependency environment that can be set to all modules.
*/
exports.injectEnvironment = function injectEnvironment( environment ){
	for( var key in environment ){
		sharedEnvironment[ key ] = environment[ key ];	
	}
};

/*
	This will be called by any bootloader engine. 
	Should be called on the very first execution of the nodejs.
*/
exports.boot = function boot( ){
	if( !dependencyLoaded ){
		throw new Error( "dependency not loaded" );
	}

	if( !( "xrequire" in global ) ){
		return;
	}

	global.xrequire = function xrequire( namespace, dependencies ){
		if( !fs.statSync( namespace ).isFile( )
			&& !( namespace in sharedDependencies ) )
		{
			throw new Error( "invalid file namespace" );
		}

		//We are doing this because we want to say that this file as a namespace can be
		//	a general namespace reference that can be used by other modules.
		if( namespace in sharedDependencies ){
			namespace = sharedDependencies[ namespace ];
		}

		var context= { };

		//Set the environment.
		for( var key in sharedEnvironment ){
			context[ key ] = sharedEnvironment[ key ];	
		}

		//Set the dependencies.
		for( var index in dependencies ){
			var dependency = dependencies[ index ];
			context[ dependency ] = sharedDependencies[ dependency ];
		}

		context = vm.createContext( context );

		var script = fs.readFileSync( namespace, { "encoding": "utf8" } );

		vm.runInContext( script, context );

		return context;
	};
};