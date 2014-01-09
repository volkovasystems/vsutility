/*:
	@require:
		{
			"os": "os"
		}
	@end-require
*/
var os = require( "os" );

exports.boot = function boot( ){
	if( "osType" in global ){
		return;
	}

	var osType = function osType( ){
		var type = os.type( ).toLowerCase( );
		var isWindowsFlag = false;
		var isLinuxFlag = false;
		var isMacFlag = false;
		/*
			This will be extended for other os architectures.
		*/
		if( ( /windows/ ).test( type ) ){
			type = "windows";
			isWindowsFlag = true;
		}else if( ( /linux/ ).test( type ) ){
			type = "linux";
			isLinuxFlag = true;
		}else if( ( /osx/ ).test( type ) ){
			type = "mac";
			isMacFlag = true;
		}
		//...s

		var osTypeFactory = {
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

		return osTypeFactory;
	};

	global.contaminated = true;
	global.osType = osType;

	exports.isGlobal = true;
	exports.osType = osType;

	return exports;
};
