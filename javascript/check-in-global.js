checkInGlobal = function checkInGlobal( variable ){
	if( typeof variable != "string" ){
		var error = new Error( "cannot evaluate non-string parameter" );
		console.log( error );
		throw error;
	}

	if( !( /^[\w\$_][\w\d\$_]+$/ ).test( variable ) ){
		var error = new Error( "invalid variable string" );
		console.log( error );
		throw error;
	}

	try{
		eval( variable + ";" );
	}catch( error ){
		if( error.name != "ReferenceError" ){
			var error = new Error( "indeterminate result" );
			console.log( error );
			throw error;
		}else{
			return true;
		}
	}
};