/*:
	@module-configuration:
		{
			"moduleName": "checkIfEmpty",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration
*/
checkIfEmpty = function checkIfEmpty( entity ){
	if( self.entity.isObject( ) ){
		return Object.keys( entity ).length == 0;
	}else if( self.entity.isArray( ) ){
		return entity.length == 0;
	}else if( self.entity.isExisting( ) ){
		return entity === null;
	}else if( entity === undefined ){
		return true;
	}else{
		return false;
	}
};