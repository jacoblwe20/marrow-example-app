var app = app || {};

;( function ( Marrow, exports ) { 
	'use strict';

	var debug = Debug( 'app:DS' ),
		DS = {},
		DataStore = Marrow( 
			function DataStore( ){
				
			},{
				_store: function ( obj ) {
					if ( typeof obj === 'object' ) {
						var name = obj.status + ':' + ( obj.id || 1 );
						DS[ name ] = obj;
					}
				},
				_updateStatus: function ( status, id ) {
					if ( status === 'del' ) {
						this._del( id );
						return null;
					}
					debug.log( status, id );
					if( DS[ 'open:' + id ] ){
						DS[ 'open:' + id ].status = status;
						DS[ status + ':' + id ] = DS[ 'open:' + id ];
						DS[ 'open:' + id ] = null;
					}
				},
				_readAll: function ( ) {
					return DS;
				},
				_find: function ( state ) {
					var collection = [];
					app.filter = state;
					if ( state ){			
						for ( var key in DS ) {
							if ( 
								new RegExp( '^' + app.filter + ':' ).test( key ) || 
								app.filter === 'all' 
							) {
								collection.push( DS[ key ] );
							}
						}
					}
					// load data
					app.emit( 'bug:load', collection );
				},
				load: function ( payload ) {
					debug.log( 'load', payload );
					app.emit( 'bug:load', payload );
				},
				_del: function ( id ) {
					if ( id ){			
						for ( var key in DS ) {
							if ( new RegExp( ':' + id ).test( key ) ) {
								delete DS[ key ];
							}
						}
					}
				}
			}
		);

	app.DS = new DataStore( );
	exports.DS = DS

} ( Marrow, this ) );