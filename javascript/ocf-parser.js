/*:
	@require:
		{
			"fs": "fs",
			"underscore": "_",
			"require": "require"
		}
	@end-require
*/

var fs = require( "fs" );
var _ = require( "underscore" );

var commandFormat = /^(?:(?:\/\*|\/\/)\:\s*@((?!end)[a-z][a-z0-9]+(?:-[a-z][a-z0-9]+)*):\s*((?:.|[^\b])+?)\s*(?:@end-(?:\1|[a-z][a-z0-9]+(?:-[a-z][a-z0-9]+)*|command))\s*(?:\*\/))/;

var parseCommands = function parseCommands( fileContents, callback ){
	//First we have to get all commented commands.
	//This will return the command and the command parameters.
	/*
		TODO: Add flags #flag-name: parameter
				This is a one liner internal command after the colon

			Add multiple command set parsing.
			Add multiple commands per set parsing.		
	*/
	var parsedCommands = _.rest( fileContents.match( commandFormat ) || [ ] );
	if( _.isEmpty( parsedCommands ) ){
		callback( null, null );
	}else{
		callback( null, parsedCommands );	
	}
};
exports.parseCommands = parseCommands

exports.boot = function boot( ){
	if( "ocfParser" in global ){
		return;
	}

	/*
		The file data can be the file path or the content of the file.

		File data containing /*: or //: at the beginning signals a file content.
			else it should be tested if it is a file path.
	*/
	
	var ocfParser = function ocfParser( fileData, callback ){
		if( !fileData ){
			var error = new Error( "invalid file data" );
			callback( error );
			return;
		}

		if( !callback ){
			callback = function callback( ){ };
		}

		fs.stat( fileData,
			function( error, fileStatistic ){
				var fileContents = "";
				if( error ){
					if( error.code == "ENOENT" ){
						fileContents = fileData;
					}else{
						console.log( error );
						callback( error );
						return;
					}
				}

				if( fileContents ){
					parseCommands( fileContents,
						function( error, parsedCommands ){
							if( error ){
								console.log( error );
								callback( error );
							}else{
								callback( null, parsedCommands );	
							}
						} );

				}else if( fileStatistic.isFile( ) ){
					fs.readFile( fileData, 
						{ "encoding": "utf8" },
						function( error, fileContents ){
							if( error ){
								console.log( error );
								callback( error );
								return;
							}
							//We can start the parsing here.
							parseCommands( fileContents,
								function( error, parsedCommands ){
									if( error ){
										console.log( error );
										callback( error );
									}else{
										callback( null, parsedCommands );	
									}
								} );
						} );
				}else{
					var error = new Error( "invalid file data" );
					console.log( error );
					callback( error );
				}
			} );
	};

	global.contaminated = true;
	global.ocfParser = ocfParser;

	exports.isGlobal = true;
	exports.ocfParser = ocfParser;
};