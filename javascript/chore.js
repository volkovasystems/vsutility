/*:
	@include:
		{
			"child_process": "childprocess"
		}
	@end-include

	@module-documentation:
		This chore function is a simple command execution engine
			with the following features:
			1. Execute command.
			2. Return on error.
			3. Do not listen to output stream.

		This is a global function and I hope that the word "chore",
			will not be used anywhere in the vscode environment.
	@end-module-documentation
*/

chore = function chore( command, callback ){
	/*:
		@meta-configuration:
			{
				"command": "string",
				"callback": "Callback"
			}
		@end-meta-configuration
	*/
	var task = childprocess.exec( command );
	var error = "";
	task.stderr.on( "data",
		function( data ){
			error += data.toString( ).replace( /^\s+|\s+$/g, "" );
		} );
	task.on( "close",
		function( ){
			if( error ){
				callback( new Error( error ), false );
			}else{
				callback( null, true );
			}
		} );
};

