/*:
	@require:
		{
			"fsrequire": "fsrequire"
			"xrequire": "xrequire",
			"ocf-parser": "ocfParser",
			"require": "require"
		}
	@end-require
*/
var fsrequire = require( "./fsrequire.js" );
var xrequire = require( "./xrequire.js" );
var ocfParser = require( "./ocf-parser.js" );

/*
	This contains 2 module bootloader.
	The native module bootloader and this include module
		for the javascript modules.

	
*/

/*
	A brief concept on OCIS Command Format

	The OCIS command format states the convention for executing
		in-editor and in-boot commands.

	Specifically, it covers two types of commands,
		* IN-EDITOR
			This command is executed during the execution of a plugged
			editor.
		* IN-BOOT
			This command is executed during the boot-up of the module.

	This include module focuses on in-boot commands.

	Basically, we have a main problem of how to execute commands
		without the programmer requiring them.

	The ideal thing is to boot every module such that commands
		required will only be within their environment scope
		such that it is booted on that module but not
		visible on other modules that does not require them.

	By doing this we can isolate the globality of any variable names
		within the module scope.
*/
exports.parseBootCommands = function parseBootCommands( ){

};

exports.boot = function boot( ){
	if( "include" in global ){
		return;
	}

	global.include = function include( namespace, settings ){

	};
};