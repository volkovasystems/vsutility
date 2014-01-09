/*:
*/
/*
	This work function is a simple command execution engine
		with the following features:
		1. execute command
		2. return on error
		3. listen to output stream
*/
var childprocess = require( "child_process" );

exports.boot = function boot( ){
	//Don't insert again.
	if( "work" in global ){
		return;
	}
	
	var work = function work( command, callback ){
		if( !callback ){
			callback = function callback( ){ };
		}

		if( !command || typeof command != "string" ){
			var error = new Error( "invalid command" );
			callback( error );
			return;
		}
		
		var task = childprocess.exec( command );
		var error = "";
		var output = "";
		task.stdout.on( "data",
			function( data ){
				output += data.toString( ).replace( /^\s+|\s+$/g, "" );
			} );
		task.stderr.on( "data",
			function( data ){
				error += data.toString( ).replace( /^\s+|\s+$/g, "" );
			} );
		task.on( "close",
			function( ){
				if( error ){
					error = new Error( error );
					callback( error );
				}else{
					/*
						TODO: Add validation here that 
						will be returned as second parameter.
					*/
					callback( null, true, output );
				}
			} );
	};

	global.contaminated = true;
	global.work = work;

	exports.isGlobal = true;
	exports.work = work;
};