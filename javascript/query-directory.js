/*:
	@include:
		{
			"class-path": "Path"
		}
	@end-include

	@module-documentation:

	@end-module-documentation
*/
queryDirectory = function queryDirectory( path, callback ){
	/*:
		@meta-configuration:
			{
				"path:required": "Path|string~query",
				"query:optional": "string"
			}
		@end-meta-configuration
	*/

	if( parameter.query.isExisting( ) ){
		
	}

	if( parameter.path.isString( ) ){
		path = Path( path );
	}

	return path.verifyLocation( function callback( state ){
		if( state ){
			//We will list all directories parent to this directory.
			return path.generateHierarchyList( function( ){
				return callback( null, path.getHierarchyList( ) );
			} ); 
		}else{
			var error = new Error( "invalid path" );
			console.log( error );
			return callback( error );
		}
	} );
};