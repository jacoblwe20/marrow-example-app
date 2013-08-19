var app = app || {};

;( function ( Marrow ) { 
	'use strict';

	var Form = Marrow( 
		function Form( $form ){
			var _this = this;
			this.$el = $form;
			this.$title = this.$el.find( '#title' );
			this.$body = this.$el.find( '#body' );
			this.$submit = this.$el.find( 'button' );

			this.$submit.on( 'click', function ( e ) {
				e.preventDefault( );
				_this.addBug( );
			});

			app.on( 'form:open', function ( ) {
				_this.$el.addClass( 'show' );
			});

			app.on( 'form:close', function ( ) {
				_this.$el.removeClass( 'show' );
			});

		}, {
			clearForm: function ( ) {
				this.$title.val( '' ),
				this.$body.val( '' );
			},
			addBug: function ( ) {
				var 
				title = this.$title.val( ),
				body = this.$body.val( );

				if ( title.length && body.length ) {
					app.emit( 'bug:add', {
						title: title,
						body: body
					});
					this.clearForm( );
				} else {
					app.emit( 'error', 'Your bug has bugz' );
					this.showErrors( title, body )
				}
			},
			showErrors: function ( title, body ) {

			}
		}
	);

	app.Form = Form;

} ( Marrow ) );