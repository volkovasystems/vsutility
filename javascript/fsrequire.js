/*
	fsrequire is basically a fast finding 'require' for module.
	You generally require the module normally.
	If the module is not existing then it will either do the following:
		1. Check the entire filesystem depending on the depth from
			the initial execution directory of fsrequire
			up to the 5 levels (default) outside the directory.
		2. Check npm if it is existing there or in bower (future).
*/
var fs = require( "fs" );