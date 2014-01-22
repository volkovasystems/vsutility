/*:
	@include:
		{
			"fs": "fs",
			"check-if-empty": "checkIfEmpty",
			"class-path": "Path",
			"subset": "subset",
			"class-range": "Range"
		}
	@end-include

	@export:
		{
			"parseCommands": "parseCommands"
		}
	@end-export
*/

commandFormat = /^(?:(?:\/\*|\/\/)\:\s*@((?!end)[a-z][a-z0-9]+(?:-[a-z][a-z0-9]+)*):\s*((?:.|[^\b])+?)\s*(?:@end-(?:\1|[a-z][a-z0-9]+(?:-[a-z][a-z0-9]+)*|command))\s*(?:\*\/))/;

parseCommands = function parseCommands( fileContents, callback ){
	//First we have to get all commented commands.
	//This will return the command and the command parameters.
	/*
		TODO: Add flags #flag-name: parameter
				This is a one liner internal command after the colon

			Add multiple command set parsing.
			Add multiple commands per set parsing.		
	*/
	var extractedCommands = fileContents.match( commandFormat ) || [ ];
	var parsedCommands = subset( extractedCommands, Range( 1, "N" ) );
	if( checkIfEmpty( parsedCommands ) ){
		return callback( null, null );
	}else{
		return callback( null, parsedCommands );	
	}
};

ocfParser = function ocfParser( fileData, callback ){
	/*:
		@meta-configuration:
			{
				"fileData:required": "Path|string",
				"callback:required": "Callback" 
			}
		@end-meta-configuration
	*/

	var parseFileContents = function parseFileContents( fileContents ){
		parseCommands( fileContents, callback );
	};

	if( self.fileData.isPath( ) ){
		File( fileData ).read( parseFileContents );
	}else{
		parseFileContents( fileData )
	}
};