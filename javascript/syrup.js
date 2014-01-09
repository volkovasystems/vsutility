/*:
*/

/*
	This is basically a decorator for all modules
		following extensible modules.
*/
exports.boot = function boot( ){
	if( "syrup" in global ){
		return;
	}

	var syrup = function syrup( gateway, subProcedures ){

	};

	global.contaminated = true;
	global.syrup = syrup;

	exports.isGlobal = true;
	exports.syrup = syrup;

	return exports;
};