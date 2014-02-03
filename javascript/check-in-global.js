/*:
	@module-configuration:
		{
			"fileName": "check-in-global.js",
			"moduleName": "checkInGlobal",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:
	@end-module-documentation

	@include:
		{
		}
	@end-include
*/
checkInGlobal = function checkInGlobal( variable ){
	/*:
		@meta-configuration:
			{
				"variable:required": "string;checkFormat",
				";checkFormat": function checkFormat( variable ){
					return !( /^[\w\$_][\w\d\$_]+$/ ).test( variable );
				}
			}
		@end-meta-configuration
	*/
	try{
		eval( variable + ";" );
	}catch( error ){
		if( error.name != "ReferenceError" ){
			var error = new Error( "indeterminate result" );
			console.log( error );
			throw error;
		}else{
			return true;
		}
	}
};