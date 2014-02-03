/*:
	@include:
		{
			"os-type": "osType",
			"class-path": "Path",
			"work": "work"
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
scanAllDirectory = function scanAllDirectory( origin, callback ){
	/*:
		@meta-configuration:
			{
				"origin:optional": "Path|string",
				"callback:optional": "Callback"	
			}
		@end-meta-configuration
	*/
	var command = "";

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
			command = "cd " + path.getLocation( ) + " && ";
		}
	}

	

	if( osType( ).isWindows( ) ){
		command += "";
	}else{
		command += "dir /b /s /ad";
	}
	work( command,
		function( ){

		} );
};