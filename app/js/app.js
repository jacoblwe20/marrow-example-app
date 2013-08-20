var app;

;( function ( Marrow ) { 
	'use strict';
	var DS = {},
		debug = Debug( 'app:App' ),
		App = Marrow( 
			function App( ){
				this.count = 0;
				this.on( 'bug', function ( event ) {
					console.log('bug', event)
					if ( /:add/.test( event ) ) {
						this.count += 1;
					} else if ( /:remove/.test( event ) ) {
						this.count -= 1;
					} else if ( /:load/.test( event ) ) {
						// reset count
						this.count = 0;
					}
					this.updateCount( );
				} )
			}, {
				_store: function ( obj ) {
					if ( typeof obj === 'object' ) {
						var name = 'open:' + ( obj || 1 );
						DS[ name ] = obj;
					}
				},
				_find: function ( state ) {
					var collection = [];
					for ( var key in DS ) {
						if ( new RegExp( '^' + state + ':' ).test( key ) ) {
							collection.push( DS[ key ] );
						}
					}
					// load data
					this.emit( 'bug:load', collection );
				},
				load: function ( payload ) {
					debug.log( 'load', payload );
					this.emit( 'bug:load', payload );
				},
				updateCount: function ( ) {
					this.$count.text( this.count );
				},
				setForm: function ( form ) {
					this.form = form;
				},
				openForm: function ( form ){
					this.emit( 'form:open' );
				},
				start: function ( $el ) {
					this.$el = $el;
					this.$count = this.$el.find( '.bug-count' );
				}
			}
		);

	app = new App( );

} ( Marrow ) );