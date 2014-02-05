/*:
	@include:
		{
			"check-if-empty": "checkIfEmpty"
		}
	@end-include
	@module-configuration:
		{
			"fileName": "check-if-not-empty.js"
			"moduleName": "checkIfNotEmpty",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:
		Check if the entity is not empty.
		By definition of empty it is either an empty
			string, object or array.
		It will return true if not empty otherwise false.
		Numbers are treated empty if zero. It will throw an error if not.
	@end-module-documentation
*/
checkIfNotEmpty = function checkIfNotEmpty( entity ){
	/*:
		@meta-configuration:
			{
				"entity:required": "object|Array|Collection|string;ifNumber"
				";ifNumber": function ifNumber( entity ){
					return entity === 0;
				}
			}
		@end-meta-configuration
	*/
	return !checkIfEmpty( entity );
};