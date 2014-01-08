/*:
	@require:
		{
			"work": "work"
		}
	@end-require
*/
/*
	This is the multi modularize command execution processing of work.
	Basically it breaks down the command using any command separator
		then executes each command through the work function.
	The errors are preserved. It means it will execute other works
		if previous works has errors.
	If you don't want this procedure you may opt to use the work method only.
*/
var async = require( "async" );
var _ = require( "underscore" );

exports.boot = function boot( ){
	//Don't insert again.
	if( "works" in global ){
		return;
	}

	global.contaminated = true;
	var works = function works( command, callback ){
		//For now we will support && and ;
		//TODO: Support other separators
		var commands = command.split( /\s*&&\s*|\s*;\s*/ );
		var errorList = [ ];
		async.map( commands,
			function( command, callback ){
				callback( null, function( callback ){
					work( command,
						function( error, state, output ){
							if( error ){
								errorList.push( {
									"error": error,
									"command": command
								} );
								state = false;
							}
							callback( null, state, output );
						} );
				} );
			},
			function( error, workList ){
				if( error ){
					console.log( error );
					callback( error );
					return;
				}
				async.series( workList,
					function( error, result ){
						if( error ){
							console.log( error );
							callback( error );
							return;
						}
						
						if( _.compact( result ).length == workList.length ){
							callback( null, true );
						}else{
							callback( new Error( JSON.stringify( errorList ) ) );
						}
					} );
			} );
	};
	global.works = works;
	exports.works = works;
};