/*:
	@include:
		{
		}
	@end-include

	@module-documentation:

	@end-module-documentation

	@module-configuration:
		{
			"moduleName": "collectionDifference",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration

	@export:
		{
		}
	@end-export
*/


collectionDifference = function collectionDifference( setA, setB ){
	/*:
		@meta-configuration:
			{
				"setA:required": "Array|object",
				"setB:required": "Array|object"
			}
		@end-meta-configuration
	*/
	if( parameter.setA.isArray( )
		&& parameter.setB.isArray )
	{
		for( var index = 0; index < setA.length; index++ ){
			
		}

	}else if( parameter.setA.isObject( )
		&& parameter.setB.isObject( ) )
	{

	}else if( ( parameter.setA.isArray( )
			&& parameter.setB.isObject( ) )
		|| ( parameter.setA.isObject( )
			&& parameter.setB.isArray( ) ) )
	{

	}
};