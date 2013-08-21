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
				this.$el.addClass( data.status );

				this.$complete.on( 'click', function ( ) {
					if ( app.filter === 'open' ) {
						_this.$el.remove();
					}
					_this.done( );
				});

				this.$del.on( 'click', function ( ) {
					_this.del( );
				})

				// bind buttons
			}, {
				done: function ( ) {
					// change look to be done
					app.emit( 'bug:done', this.data.id );
					this.$el.addClass( 'done' );
				},
				del: function ( ) {
					var _confirm = confirm( 
						'Are you sure you want to delete, "' + 
						this.data.title + 
						'"' 
					);

					if ( _confirm ) {
						app.emit( 'bug:del', this.data.id );
						this.$el.remove( );
					}

				}
			}
		);

	app.Bug = Bug;

} ( Marrow ) );