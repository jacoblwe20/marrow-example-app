var app;

;( function ( Marrow ) { 
	'use strict';

	var App = Marrow( 
		function App( ){
			this.count = 0;
			this.on( 'bug', function ( event ) {
				console.log('bug', event)
				if ( /add/.test( event ) ) {
					this.count += 1;
				} else if ( /remove/.test( event ) ) {
					this.count -= 1;
				}
				this.updateCount( );
			} )
		}, {
			updateCount: function ( ) {
				this.$count.text( this.count );
			},
			setForm: function ( form ) {
				this.form = form;
			},
			openForm: function ( form ){
				this.emit( 'form:open' );
			},
			start: function ( $el ) {
				this.$el = $el;
				this.$count = this.$el.find( '.bug-count' );
			}
		}
	);

	app = new App( );

} ( Marrow ) );