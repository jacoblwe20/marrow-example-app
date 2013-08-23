var app = app || {};

;( function ( Marrow ) { 
	'use strict';

	var debug = Debug( 'app:Menu' ),
		Menu = Marrow( 
				function Menu( $link, options ){
					debug.log( 'Menu' );
					var _this = this;
					this.options =  options;
					this.items = [];
					this.$link = $link;
					this.$body = $( 'body' );
					this.$label = $('<label/>');
					this.$menu = this.List( options );

					debug.log( 'link', this.$link );
					debug.log( 'menu', this.$menu );

					// toggles menu
					this.$link.on( 'click', function ( e ) {
						e.stopPropagation( );
						if ( !( _this.getState( ) ) ) {
							_this.open( );
						} else {
							_this.close( );
						}
					} );

					this.$body.on( 'click', function ( ) {
						if ( _this.getState( ) ) {
							_this.close( );
						}
					} );

					this.$menu
						.appendTo( this.$link
							.append(
								this.$label
									.text( options[ 0 ].text ) 
							)
							.addClass( 'menu-link' )
						)
						.find( 'li' )
							.on( 'click', function ( e ) {
								var i = $( e.target ).data( 'index' );
								_this.emit( 'select', _this.options[ i ] );
							});

					this.to( 'open', function ( ) {
						this.$menu.addClass('show');
					}, 1 )

					this.to( 'close', function ( ) {
						this.$menu.removeClass('show');
					}, 0);

					this.on( 'select', function ( option ) { 
						this.$label.text( option.text );
					})
				}, {
					Item: function ( option, index ) {
						return $( '<li/>' ).append( option.text ).attr({
							'data-index' : index
						});
					},
					List: function ( option ) {
						var $el = $( '<ul/>' )
							.addClass( 'menu-list' );
						for ( var i = 0; i < option.length; i += 1 ) {
							var $item = this.Item( option[ i ], i );
							$el.append( $item );
						}

						debug.log( $el );
						return $el;
					}
				}
			);

	app.Menu = Menu;

} ( Marrow ) );