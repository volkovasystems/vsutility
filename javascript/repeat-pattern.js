/*:
	@include:
		{
			"class-keys": "Keys"
		}
	@end-include

	@module-documentation:

	@end-module-documentation

	@module-configuration:
		{
			"fileName": "repeat-pattern.js",
			"moduleName": "repeatPattern",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration
*/
repeatPattern = function repeatPattern( pattern, count, template ){
	/*:
		@meta-configuration:
			{
				"pattern:required": "string",
				"count:required": "number",
				"template:optional": "object"
			}
		@end-meta-configuration
	*/
	pattern = ( new Array( count + 1 ) ).join( pattern );
	if( self.template.isExisting( ) ){
		Keys( template )
	}
};