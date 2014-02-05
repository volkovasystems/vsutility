/*:
	@module-configuration:
		{
			"fileName": "work.js",
			"moduleName": "work",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:
		This work function is a simple command execution engine
		with the following features:
			1. execute command
			2. return on error
			3. listen to output stream
	@end-module-documentation

	@include:
		{
			"child_process": "childprocess"
		}
	@end-include
*/
work = function work( command, callback ){
	/*:
		@meta-configuration:
			{
				"command:required": "string",
				"callback:optional": "Callback"
			}
		@end-meta-configuration
	*/
	var task = childprocess.exec( command );
	var error = "";
	var output = "";
	task.stdout.on( "data",
		function( data ){
			output += data.toString( );
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