/*:
*/
/*
	This chore function is a simple command execution engine
		with the following features:
		1. execute command
		2. return on error
		3. do not listen to output stream

	This is a global function and I hope that the word "chore",
		will not be used anywhere in the vscode environment.
*/
var childprocess = require( "child_process" );

exports.boot = function boot( ){
	//Don't insert again.
	if( "chore" in global ){
		return;
	}
	
	var chore = function chore( command, callback ){
		var task = childprocess.exec( command );
		var error = "";
		task.stderr.on( "data",
			function( data ){
				error += data.toString( );
			} );
		task.on( "close",
			function( ){
				if( error ){
					error = new Error( error );
					callback( error );
				}else{
					callback( null, true );
				}
			} );
	};

	global.contaminated = true;
	global.chore = chore;

	exports.isGlobal = true;
	exports.chore = chore;
};

