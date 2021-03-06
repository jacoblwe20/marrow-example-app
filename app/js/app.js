var app;

;( function ( Marrow ) { 
	'use strict';
	var DS = {},
		debug = Debug( 'app:App' ),
		App = Marrow( 
			function App( ){
				var _this = this;
				this.count = 0;
				this.filter = 'all';
				this.on( 'bug', function ( event, payload ) {
					debug.log('bug', event, payload)
					if ( /:add/.test( event ) ) {
						_this.count += 1;
						_this.DS._store( payload );
					} else if ( /:remove/.test( event ) ) {
						_this.count -= 1;
						_this.DS._updateStatus( 'done', payload );
					} else if ( /:done|:del/.test( event ) ) {
						debug.log( event );
						_this.DS._updateStatus( event.split(':')[1], payload );
						if ( /:del/.test( event ) ) {
							_this.count -= 1;							
						}

					} else if ( /:load/.test( event ) ) {
						// reset count
						_this.count = 0;
					}
					this.updateCount( );
				} );
			}, {
				filterList: function ( ) {
					var _this = this;
					return function ( obj ) {
						var filter = obj.filter;
						if ( filter ) {
							_this.DS._find( filter );
						}
					}
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
				},
				load: function( ){
					this.DS.load.apply( this.DS, arguments );
				},
				set: function ( config ) {
					this.config = app.merge( 
						this.config || {}, 
						config || {} 
					);
				}
			}
		);

	app = new App( );

} ( Marrow ) );