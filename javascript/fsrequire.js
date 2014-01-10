/*
	fsrequire is basically a fast finding 'require' for module.
	You generally require the module normally.
	If the module is not existing then it will either do the following:
		1. Check the entire filesystem depending on the depth from
			the initial execution directory of fsrequire
			up to the 5 levels (default) outside the directory.
		2. Check npm if it is existing there or in bower (future).
*/
var S = require( "string" );
require( "./search-file.js" ).boot( );

var customRequire = require;
var setRequireStrategy = function setRequireStrategy( ){

};

exports.useExtendedRequire = function useExtendedRequire( ){


};

exports.boot = function boot( ){
	if( "fsrequire" in global ){
		return;
	}

	var fsrequire = function fsrequire( namespace, referencePath, depth ){

	}

	global.contaminated = true;
	global.fsrequire = fsrequire;

	exports.isGlobal = true;
	exports.fsrequire = fsrequire;

	return exports;
};
