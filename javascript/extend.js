//TODO: Auto reload the needed dependencies here if not existing.
define( "extend",
	[ 
		"underscore",
		"Class",
		"apply"
	],
	function( Class, apply ){
		var extend = function extend( blueprint ){
			var methods = { 
				"constructor": function constructor( ){
					apply( blueprint, this, arguments );
				}
			};
			methods = _.extend( methods, blueprint.prototype );
			return Class.extend( methods );
		};

		return extend;
	} );