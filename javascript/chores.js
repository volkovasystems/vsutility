var chore = require( "./chore.js" );
var async = require( "async" );
var _ = require( "underscore" );

/*
	This is the multi modularize command execution processing of chore.
	Basically it breaks down the command using any command separator
		then executes each command through the chore function.
	The errors are preserved. It means it will execute other chores
		if previous chores has errors.
	If you don't want this procedure you may opt to use the chore method only.
*/
//Don't insert again.
if( "chores" in global ){
	return;
}
global.chores = function chores( command, callback ){
	//For now we will support && and ;
	//TODO: Support other separators
	var commands = command.split( /\s*&&\s*|\s*;\s*/ );
	var errorList = [ ];
	async.map( commands,
		function( command, callback ){
			callback( null, function( callback ){
				chore( command,
					function( error, state ){
						if( error ){
							errorList.push( {
								"error": error,
								"command": command
							} );
							state = false;
						}
						callback( null, state );
					} );
			} );
		},
		function( error, choreList ){
			if( error ){
				callback( error );
				return;
			}
			async.series( choreList,
				function( error, result ){
					if( error ){
						callback( error );
						return;
					}
					
					if( _.compact( result ).length == choreList.length ){
						callback( null, true );
					}else{
						callback( new Error( JSON.stringify( errorList ) ) );
					}
				} );
		} );
};