var app = app || {};

;( function ( Marrow ) { 
	'use strict';

	var debug = Debug( 'app:Bug' ),
		Bug = Marrow( 
			function Bug( $item, data ){

				debug.log( 'constructor', arguments );

				var _this = this;
				this.data = data;
				this.$el = $item;
				this.$complete = this.$el.find( '.bug-complete' );
				this.$del = this.$el.find( '.bug-delete' );
				this.$title = this.$el
					.find('h3')
					.text( data.title );
				this.$body = this.$el
					.find('p')
					.text( data.body );

				this.$complete.on( 'click', function ( ) {
					_this.done( );
				})

				// bind buttons
			}, {
				done: function ( ) {
					// change look to be done
					app.emit( 'bug:done', this.data.id );
					this.$el.addClass( 'done' );
				}
			}
		);

	app.Bug = Bug;

} ( Marrow ) );