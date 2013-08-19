var app = app || {};

;( function ( Marrow ) { 
	'use strict';

	var NavBar = Marrow( 
		function NavBar( $bar ){
			var _this = this;
			this.$el = $bar;
			this.$button = this.$el.find('button');
			this.$button.on( 'click', function ( ) {
				app.emit( 'form:open' );
				_this.$button.attr({
					'disabled': 'disabled'
				})
				app.once( 'form:close', function ( ) {
					_this.$button.removeAttr('disabled')
				} )	
			});
		}
	);

	app.NavBar = NavBar;

} ( Marrow ) );