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
			this.$close = this.$el.find( '.close' );

			this.$submit.on( 'click', function ( e ) {
				e.preventDefault( );
				_this.addBug( );
			});

			this.$close.on( 'click', function ( ) {
				app.emit( 'form:close' );
			} )

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
						status: 'open',
						id: +new Date( ),
						title: title,
						body: body
					});
					this.clearForm( );
					app.emit( 'form:close' );
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