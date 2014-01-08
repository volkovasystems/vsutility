/*:
	@require: 
		{
			"os-type": "osType",
			"chore": "chore"
		}
	@end-require
*/
/*
	We basically needs two things when cloning a file:
		* The source file.
		* The destination path.

	The following optional procedure are supported:
		0. Force create. Force delete.
			This will forcefully create/delete the destination if not existing/existing.
			By default this is false.
		1. Destination directory.
			This will basically create the file there and
				on succeeding clone sync, it will do
				the normal procedure.
		2. Synchronization pause duration.
			This is the gap duration between syncs.
			By default this is not applied.
		3. Number of sync cycles.
			This is rarely used but sometimes useful.
			Like we can sync the file after until several cycles only.
		4. Number of synclets.
			By default, a synclet can sync N files and
				if the number of files being manage exceeds N
				it will create a new synclet.
			The number of synclet denotes how many synclets
				we can create for any specific period of usage.
		5. Automatic fail over. 
			This uses forever module.

	The procedure for cloning the file,
		1. Set the destination and source.
		2. Check if destination exists if not create it.
			(Note that this is only applicable to directories)
		3. Copy the new instance of the source to the destination.
		4. 
*/
var optimist = require( "optimist" );
var _ = require( "underscore" );
var util = require( "util" );
var fs = require( "fs" );
var async = require( "async" );

//Set the default variables.
var isForceDelete = false;
var isForceCreate = false;

exports.checkSource = function checkSource( source, callback ){
	fs.stat( source,
		function( error, fileStatistic ){
			if( error ){
				console.log( error );
				callback( error );
				return;
			}
			if( fileStatistic.isFile( ) ){
				callback( null, true );
			}else{
				var error = new Error( "invalid source file" );
				console.log( error );
				callback( error );
			}
		} );
};

exports.checkDestination = function checkDestination( destination, callback ){
	fs.stat( destination,
		function( error, fileStatistic ){
			if( error.code == "ENOENT" ){
				/*
					There may be a scenario that the directory does not exists.
					We have to check if this is a directory or not.
					We assume that every entry has extension token.
				*/
				if( ( /.+?\.\w+?$/ ).test( destination ) ){
					//Then this is a file.
					//The file does not exist then we can start cloning.
					callback( null, true );
				}else{
					//This is a directory as we assumed to be.
					//Then we have to create it.
					completeDestination( destination, callback );	
				}
				return;	
			}
			if( error ){
				console.log( error );
				callback( error );
				return;
			}
			if( fileStatistic.isFile( ) ){
				//We have to delete it.
				if( isForceDelete ){
					fs.unlink( destination,
						function( error ){
							if( error ){
								console.log( error );
								callback( error );
							}
							callback( null, true );
						} );
				}else{
					var error = new Error( "force delete is disabled for existing file" );
					console.log( error );
					callback( error );
				}
			}else if( fileStatistic.isDirectory( ) ){
				//This is a directory so we can start cloning.
				callback( null, true );
			}else {
				callback( new Error( "invalid destination" ) );
			}
		} );
};

var completeDestination = function completeDestination( destination, callback ){
	if( osType.isWindows( ) ){
		chore( "mkdir " + destination, callback );
	}else{
		chore( "mkdir -p" + destination, callback );
	}
};
exports.completeDestination = completeDestination;

exports.copyFile = function copyFile( ){
	if( osType.isWindows( ) ){
		chore( "copy " + source + " " + destination );
	}else{
		chore( "cp " + source + " " + destination );
	}
};

exports.createSynclet = function createSynclet( ){

};

exports.watchFile = function watchFile( ){

};

exports.boot = function boot( ){
	if( "cloneFile" in global ){
		return;
	}

	var cloneFile = function cloneFile( source, destination ){



	};

	global.contaminated = true;
	global.cloneFile = cloneFile;

	exports.isGlobal = true
	exports.cloneFile = cloneFile;
};