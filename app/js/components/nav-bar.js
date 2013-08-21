var app = app || {};

;( function ( Marrow ) { 
	'use strict';

	var debug = Debug( 'app:NavBar' ),
		NavBar = Marrow( 
				function NavBar( $bar ){
					var _this = this;
					this.$el = $bar;
					this.$button = this.$el.find( 'button' );
					this.$links = this.$el.find( 'a' );

					this.$links.on( 'click', function ( e ) {
						var $el = $(e.target),
							filter = $el.data( 'filter' );

						debug.log( 'link:click', $el, filter );
						_this._removeActive( );
						$el.closest('li')
							.addClass('active');
						app.emit( 'list:filter', filter );

					} )

					this.$button.on( 'click', function ( ) {
						app.emit( 'form:open' );
						_this.$button.attr({
							'disabled': 'disabled'
						})
						app.once( 'form:close', function ( ) {
							_this.$button.removeAttr( 'disabled' )
						} )	
					});
				}, {
					_removeActive: function ( ) {
						this.$links.each( function ( ) {
							$(this).closest('li')
								.removeClass('active');
						} )
					}
				}
			);

	app.NavBar = NavBar;

} ( Marrow ) );