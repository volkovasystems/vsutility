define( "apply",
	function( ){
		var apply = function apply( method, self, parameters ){
			if( typeof method != "function" ){
				throw new Error( "invalid method type" );
			}
			method.apply( self, parameters );
		};

		return apply;		
	} );