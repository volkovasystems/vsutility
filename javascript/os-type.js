/*:
*/
/*
*/
var os = require( "os" );

exports.boot = function boot( ){
	if( "osType" in global ){
		return;
	}

	var osType = function osType( ){
		var type = os.type( ).toLowerCase( );
		var isWindows = false;
		var isLinux = false;
		var isMac = false;
		/*
			This will be extended for other os architectures.
		*/
		if( ( /windows/ ).test( type ) ){
			type = "windows";
			isWindows = true;
		}else if( ( /linux/ ).test( type ) ){
			type = "linux";
			isLinux = true;
		}else if( ( /osx/ ).test( type ) ){
			type = "mac";
			isMac = true;
		}
		//...s

		return {
			"toString": function toString( ){
				return type;
			},
			"isWindows": function isWindows( ){
				return isWindows;
			},
			"isLinux": function isLinux( ){
				return isLinux;
			},
			"isMac": function isMac( ){
				return isMac;
			}
		};
	};

	global.contaminated = true;
	global.osType = osType;

	exports.isGlobal = true;
	exports.osType = osType;
};
