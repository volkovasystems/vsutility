/*:
*/
exports.boot = function boot( ){
	if( "encodify" in global ){
		return;
	}
	
	global.encodify = function encodify( entity ){
		if( typeof entity != "string" ){
			entity = entity.toString( );
		}
		var base64Encoded = ( new Buffer( entity ) ).toString( "base64" );
		var URIencoded = encodeURIComponent( base64Encoded ).toString( );
		return URIencoded;
	};
};