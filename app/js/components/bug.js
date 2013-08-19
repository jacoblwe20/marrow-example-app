var app = app || {};

;( function ( Marrow ) { 
	'use strict';

	var Bug = Marrow( 
		function Bug( $item, data ){
			var _this = this;
			this.$el = $item;
			this.$complete = this.$el.find( '.bug-complete' );
			this.$del = this.$el.find( '.bug-delete' );
			this.$title = this.$el
				.find('h3')
				.text( data.title );
			this.$body = this.$el
				.find('p')
				.text( data.body );

			// bind buttons
		}
	);

	app.Bug = Bug;

} ( Marrow ) );