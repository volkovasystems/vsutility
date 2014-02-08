/*:
	@include:
		{
			"class-keys": "Keys"
		}
	@end-include
    
	@module-configuration:
		{
			"moduleName": "checkIfEmpty",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:
		Check if the entity is empty or not.
		By definition of empty it is either an empty
			string, object or array.
		It will return true if empty otherwise false.
		Numbers are treated empty if zero. It will throw an error if not.
	@end-module-documentation
*/
checkIfEmpty = function checkIfEmpty( entity ){
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
	if( parameter.entity.isObject( ) ){
		return Keys( entity ).count( ) == 0;
	}else if( parameter.entity.isArray( ) ){
		return Collection( entity ).elementCount( ) == 0;
	}else if( parameter.entity.isString( ) ){
		return entity == "";
	}else if( parameter.entity.isNull( )
		|| parameter.entity.isNotExisting( )
		|| parameter.entity.ifNumber( ) )
	{
		return true;
	}else{
		return false;
	}
};