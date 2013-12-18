/*:
*/
exports.boot = function boot( ){
	if( "decodify" in global ){
		return;
	}
	
	global.decodify = function decodify( entity ){
		if( typeof entity != "string" ){
			entity = entity.toString( );
		}

		var URIdecoded = decodeURIComponent( entity );
		var base64Decoded = ( new Buffer( URIdecoded ), "base64" ).toString( "utf8" );
		return base64Decoded;
	};
};