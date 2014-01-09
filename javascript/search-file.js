/*:
	@require:
		{
			"fs": "fs"
			"os-type": "osType",
			"work": "work"
		}
	@end-require
*/
var fs = require( "fs" );
require( "./os-type.js" ).boot( );
require( "./work.js" ).boot( );

exports.boot = function boot( ){
	if( "searchFile" in global ){
		return;
	}

	var searchFile = function searchFile( fileName, filePath, depth, callback ){
		if( !callback ){
			callback = function callback( ){ };
		}

		if( !fileName ){
			var error = new Error( "invalid file name" );
			callback( error );
			return;
		}

		if( !filePath ){
			var error = new Error( "invalid file path" );
			callback( error );
			return;
		}

		if( !depth ){
			depth = 5;
		}

		fs.stat( filePath,
			function( error, fileStatistic ){
				if( error ){
					console.log( error );
					callback( error )
				}else if( fileStatistic.isDirectory( ) ){
					filePath += ( new Array( depth + 1 )).join( "../" );

					var searchCallback = function searchCallback( error, state, output ){
						if( error ){
							console.log( error );
							callback( error );
						}else if( state ){
							callback( null, output );
						}else{
							var error = new Error( "indeterminate result" );
							console.log( error );
							callback( error );
						}
					};

					if( osType( ).isWindows( ) ){
						work( "cd " + filePath + " && dir " + fileName + " /b/s", searchCallback );
					}else{
						work( "find " + filePath + " -name '" + fileName + "'", searchCallback );
					}
				}else{
					var error = new Error( "file path is not a valid directory" );
					console.log( error );
					callback( error );
				}
			} );
	};	

	global.contaminated = true;
	global.searchFile = searchFile;

	exports.isGlobal = true;
	exports.searchFile = searchFile;

	return exports;
};