/*:
	@include:
		{
		}
	@end-include

	@module-documentation:

	@end-module-documentation

	@module-configuration:
		{
			"moduleName": "arrayIntersection",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration

	@export:
		{
		}
	@end-export
*/


arrayIntersection = function arrayIntersection( setA, setB ){
	/*:
		@meta-configuration:
			{
				"setA:required": "Array|object",
				"setB:required": "Array|object"
			}
		@end-meta-configuration
	*/
	if( self.setA.isArray( )
		&& self.setB.isArray )
	{

	}else if( self.setA.isObject( )
		&& self.setB.isObject( ) )
	{

	}else if( ( self.setA.isArray( )
			&& self.setB.isObject( ) )
		|| ( self.setA.isObject( )
			&& self.setB.isArray( ) ) )
	{

	}
};