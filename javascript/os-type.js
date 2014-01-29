/*:
	@include:
		{
			"os": "os"
		}
	@end-include

	@module-documentation:

	@end-module-documentation

	@module-configuration:
		{
			"moduleName": "hyperCut",
			"authorName": "Richeve S. Bebedor",
			"isGlobal": true
		}
	@end-module-configuration

	@export:
		{
		}
	@end-export
*/
osType = function osType( ){
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
