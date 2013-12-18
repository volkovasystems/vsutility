/*:
*/
/*
*/
var os = require( "os" );

exports.boot = function boot( ){
	if( "osType" in global ){
		return;
	}

	global.osType = function osType( ){
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
			"valueOf": function valueOf( ){
				return {
					"isWindows": function isWindows( ){
						return isWindows;
					},
					"isLinux": function isLinux( ){
						return isLinux;
					},
					"isMac": function isMac( ){
						return isMac;
					},
					"toString": function toString( ){
						return type;
					}
				};
			}
		};
	};
};