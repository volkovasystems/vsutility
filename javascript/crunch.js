/*
	Crunching a js module basically involves making the module to run
		as a standalone utility.

	This crunch module can be run as is or can be included in any module
		that needs standalone capability.

	The crunch requires xfsrequire function, which is basically,
		a combination of xrequire and fsrequire.
*/
var optimist = require( "optimist" );
