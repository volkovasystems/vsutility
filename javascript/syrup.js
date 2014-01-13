/*:
*/

exports.addFlavor = function addFlavor( flavorName, flavorEngine ){

};

exports.removeFlavor = function removeFlavor( flavorName ){

};

/*
	This is basically a decorator for all modules
		following extensible modules.
*/
exports.boot = function boot( ){
	if( "syrup" in global ){
		return;
	}

	/*
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
	*/
	var syrup = function syrup( gateway, subProcedures, configurations ){

	};

	global.contaminated = true;
	global.syrup = syrup;

	exports.isGlobal = true;
	exports.syrup = syrup;

	return exports;
};