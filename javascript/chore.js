var childprocess = require( "child_process" );

/*
	This chore function is a simple command execution engine
		with the following features:
		1. execute command
		2. return on error
		3. do not listen to output stream
*/
//Don't insert again.
if( "chore" in global ){
	return;
}
global.chore = function chore( command, callback ){
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