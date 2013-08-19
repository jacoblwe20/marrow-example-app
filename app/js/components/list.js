var app = app || {};

;( function ( Marrow ) { 
	'use strict';

	var List = Marrow( 
		function List( $list ){
			var _this = this;
			this.$el = $list;

			this._listItem = $(' <li/> ').append(
				'<div class="pure-u-2-3">' +
					'<h3></h3>' +
					'<p></p>' +
				'</div>' +
				'<div class="pure-u-1-3 actions">' +
					'<button class="pure-button bug-delete">Delete</button>' +
					'<button class="pure-button pure-button-primary bug-complete">Done</button>' +
				'</div>' 
			);

			app.on( 'bug:add', function( ){
				console.log('asdsadfasdf')
				_this.addBug.apply( _this, arguments );
			} );
		
		
		}, {
			addBug: function ( obj ) {
				var item = new app.Bug( this._listItem.clone( ), obj );
				this.$el.prepend( item.$el );
			},
			reorderList: function ( ) {
				
			}
		}
	);

	app.List = List;

} ( Marrow ) );