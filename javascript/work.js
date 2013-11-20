var childprocess = require( "child_process" );

/*
	This work function is a simple command execution engine
		with the following features:
		1. execute command
		2. return on error
		3. listen to output stream
*/
//Don't insert again.
if( "work" in global ){
	return;
}
global.work = function work( command, callback ){
	var task = childprocess.exec( command );
	var error = "";
	var output = "";
	task.stdout.on( "data",
		function( data ){
			output += data.toString( );
		} );
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
				callback( null, true, output );
			}
		} );
};