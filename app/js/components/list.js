var app = app || {};

;( function ( Marrow ) { 
	'use strict';

	var debug = Debug( 'app:List' ),
		List = Marrow( 
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
					_this.addBug.apply( _this, arguments );
				} );

				app.on( 'bug:load', function ( collection ) {
					//clear list
					_this.$el.empty( );
					for ( var i = 0; i < collection.length; i ++ ) {
						if ( collection[ i ] ) {
							app.emit( 'bug:add', collection[ i ] );
						}
					}
				})
			
			
			}, {
				addBug: function ( obj ) {
					debug.log( 'addBug', obj );
					if ( /(open|all)/.test( app.filter ) || app.filter === obj.status ) {
						var item = new app.Bug( this._listItem.clone( ), obj );
						this.$el.prepend( item.$el );
					}
				},
				reorderList: function ( ) {
					
				}
			}
		);

	app.List = List;

} ( Marrow ) );