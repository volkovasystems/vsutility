/*:
	@include:
		{
			"set-intersection": "setIntersection"
		}
	@end-include

	@module-documentation:
		The gateway will be the exports variable and
			the subProcedures will be the contents of the module.

		Additional configurations can be set that will provide further
			extensibility to the module.

		The following configurations are supported
			1. isGlobal:boolean
			2. isLocal:boolean
			3. isRemotelyAccessible:boolean
			4. isExtensible:boolean
			5. flavors:Array-string

		Syrup is a group of decorator engines or what we call "candy wrappers"

		They give flavor to the function so by adding flavors and selecting
			which is to be wrapped then we can add more extensible procedures
			to the function.
	@end-module-documentation

	@module-configuration:
		{
			"moduleName": "syrup",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration

	@export:
		{
			"queryModule": "queryModule"
		}
	@end-export
*/

( function module( dependency ){
	var errorWrapper = function errorWrapper( ){

	};

	var metaWrapper = function metaWrapper( ){

	};

	var callbackWrapper = function callbackWrapper( ){

	};

	var addFlavor = function addFlavor( flavorName, flavorEngine ){

	};

	var removeFlavor = function removeFlavor( flavorName ){

	};

	var syrup = function syrup( method ){

	};
} )( dependency );