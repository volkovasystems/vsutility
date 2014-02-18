/*:
	@include:
		{
			"os-type": "osType",
			"class-path": "Path",
			"class-command": "Command",
			"check-if-not-empty": "checkIfNotEmpty"
		}
	@end-include

	@module-documentation:

	@end-module-documentation

	@module-configuration:
		{
			"fileName": "scan-all-directory.js",
			"moduleName": "scanAllDirectory",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration
*/
scanAllDirectory = function scanAllDirectory( origin, depth, callback ){
	/*:
		@meta-configuration:
			{
				"origin:optional": "Path|string~depth",
				"depth:optional": "number",
				"callback:optional": "Callback"	
			}
		@end-meta-configuration
	*/
	var command = null;

	if( self.origin.isExisting( ) ){
		if( self.origin.isString( ) ){
			origin = Path( origin );
			return origin.verifyLocation( function callback( state ){
				if( state ){
					return self.recall( origin, callback );
				}else{
					return self.recall( callback );
				}
			} );
		}else{
			command = Command( "cd " + path.getLocation( ) );
		}
	}else{
		command = Command( "cd ." );
	}

	if( osType( ).isWindows( ) ){
		command.append( "dir /b /s /ad" );
	}else{
		command.append( "find ." );
	}
	return command.executeWork( function callback( error, results ){
		if( error ){
			return callback( error );
		}else if( checkIfNotEmpty( results ) ){
			//We will have to separate the results and return as a collection

		}else{
			return callback( null, null );
		}
	} );
};