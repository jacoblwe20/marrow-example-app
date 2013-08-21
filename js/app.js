/* marrow-example-app - 0.0.1 1377057639569 */


/*
 * Marrow.js - 0.0.20 
 * Description : Marrow is constructor that extends your constructors to help emit events and create a conventions to help manage components 
 * Project Url : https://github.com/jacoblwe20/marrow 
 * Author : Jacob Lowe <http://jacoblowe.me> 
 * License : MIT 
 */

!function(a){var b={},c=function(a,b){if(!(this instanceof c))return new c(a,b);"function"==typeof b&&b(this),"object"==typeof b&&this.merge(this,b);var d=function(){return this.emit("initialize"),a.apply(this,arguments)};return this.constructor=a,this.on("initialize",function(){this._store()}),this.merge(d.prototype,a.prototype,this),d};c.prototype._store=function(){b[this.constructor.name]||(b[this.constructor.name]=[]);var a=b[this.constructor.name];a.push(this),this.ts=+new Date+a.length},c.prototype.merge=function(){var a=arguments[0];if("object"==typeof a){for(var b=0;b<=arguments.length-1;b+=1){var c=arguments[b];if("object"==typeof c)for(var d in c)a[d]=c[d]}return a}},c.prototype.getState=function(){return this.__state},c.prototype.setState=function(a){this.__state=+a},a.Marrow=c}(this),function(a){var b=/\:/g,c=function(a){return"string"==typeof a?a.split(b):null};a.prototype.__events=function(){this._events={}},a.prototype.on=function(a,b){if("object"==typeof a)return a=this._objBind(a,b,arguments[2]),null;if("function"==typeof b&&"string"==typeof a){var d=c(a),e=d.length>1?d[0]+":"+d[1]:d[0];this._events||this.__events(),"object"!=typeof this._events[e]&&(this._events[e]=[]),"number"==typeof this._events[e].length&&this._events[e].push(b)}return this},a.prototype.once=function(a,b){var c=this,d=function(){b.apply(c,arguments),c.off(a,d),c.off(a,b)};this.on(a,d)},a.prototype.off=function(a,b){if("object"==typeof a)return a=this._objUnbind(a,b,arguments[2]),null;if("object"==typeof this._events&&"string"==typeof a&&"object"==typeof this._events[a]&&this._events[a].length){var c=this._events[a];if("function"==typeof b)for(var d=0;d<c.length;d+=1)""+c[d]==""+b&&(this._events[a][d]=null);else this._events[a]=[]}else"undefined"==typeof a&&"undefined"==typeof b&&(this._events={})},a.prototype.emit=function(a){if("object"==typeof this._events&&"string"==typeof a){var b,d=c(a),e=[].slice.call(arguments);this._events||this.__events();for(var f=0;f<d.length;f+=1)if(b=f?d[0]+":"+d[f]:d[f],"object"==typeof this._events[b]&&this._events[b].length)for(var g=0;g<this._events[b].length;g+=1){var h=!f&&d.length>1?e:e.slice(1);this._events[b][g]&&this._events[b][g].apply(this,h)}}},a.prototype._objBind=function(a,b,c){return a||"function"==typeof a.on||"string"==typeof b||"function"==typeof c?(a.on(b,c),void 0):null},a.prototype._objUnbind=function(a,b,c){return a||"function"==typeof a.off||"string"==typeof b?(a.off(b,c),void 0):null}}(Marrow),function(a){a.prototype.__extend=function(a,b,c){var d=this;this[a]=function(){"function"==typeof this[c]&&d[c].apply(this,arguments),"number"==typeof b&&(d.__state=b);var e=[].concat(a,Array.prototype.slice.call(arguments));d.emit.apply(this,e)}},a.prototype.to=function(a,b,c){if("string"==typeof a&&"function"==typeof b){var d="__"+a;this[d]=b,this.__extend(a,c,d)}}}(Marrow);
/*
 * Marrow-Debug.js - 0.0.2 
 * Description : Marrow Debug is a small utitlity that allows you to debug code and not have to worry about scattering console logs everywhere 
 * Project Url : https://github.com/jacoblwe20/marrow-debug 
 * Author : Jacob Lowe <http://jacoblowe.me> 
 * License : MIT 
 * Depedencies: Marrow.js 
 */

!function(a,b){var c=function(){};c=a(c);var d=new c,e=function(a,b){return this instanceof e?(this.config=a,this):new e(a,b)};e.prototype.listenTo=function(a){d.on(a,function(a){"object"==typeof console&&console.log.apply(console,a)})},e.prototype.log=function(){if(this.config){var a=Array.prototype.slice.call(arguments,0);d.emit(this.config,a)}},b.Debug=e}(Marrow,this);
var app;

;( function ( Marrow ) { 
	'use strict';
	var DS = {},
		debug = Debug( 'app:App' ),
		App = Marrow( 
			function App( ){
				var _this = this;
				this.count = 0;
				this.filter = 'all';
				this.on( 'bug', function ( event, payload ) {
					console.log('bug', event, payload)
					if ( /:add/.test( event ) ) {
						_this.count += 1;
						_this.DS._store( payload );
					} else if ( /:remove/.test( event ) ) {
						_this.count -= 1;
						_this.DS._updateStatus( 'done', payload );
					} else if ( /:done/.test( event ) ) {
						_this.count -= 1;
						_this.DS._updateStatus( 'done', payload );
					} else if ( /:load/.test( event ) ) {
						// reset count
						_this.count = 0;
					}
					this.updateCount( );
				} );
				this.on( 'list:filter', function ( filter ) {
					debug.log( 'filter', filter );
					if ( filter ) {
						_this.DS._find( filter );
					}
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
				},
				load: function( ){
					this.DS.load.apply( this.DS, arguments );
				}
			}
		);

	app = new App( );

} ( Marrow ) );
var app = app || {};

;( function ( Marrow, exports ) { 
	'use strict';

	var debug = Debug( 'app:DS' ),
		DS = {},
		DataStore = Marrow( 
			function DataStore( ){
				
			},{
				_store: function ( obj ) {
					if ( typeof obj === 'object' ) {
						var name = obj.status + ':' + ( obj.id || 1 );
						DS[ name ] = obj;
					}
				},
				_updateStatus: function ( status, id ) {
					debug.log( status, id );
					if( DS[ 'open:' + id ] ){
						DS[ 'open:' + id ].status = status;
						DS[ status + ':' + id ] = DS[ 'open:' + id ];
						DS[ 'open:' + id ] = null;
					}
				},
				_readAll: function ( ) {
					return DS;
				},
				_find: function ( state ) {
					var collection = [];
					app.filter = state;
					if ( state ){			
						for ( var key in DS ) {
							if ( 
								new RegExp( '^' + app.filter + ':' ).test( key ) || 
								app.filter === 'all' 
							) {
								collection.push( DS[ key ] );
							}
						}
					}
					// load data
					app.emit( 'bug:load', collection );
				},
				load: function ( payload ) {
					debug.log( 'load', payload );
					app.emit( 'bug:load', payload );
				},
				del: function ( id ) {
					if ( id ){			
						for ( var key in DS ) {
							if ( new RegExp( ':' + id ).test( key ) || app.filter === 'all' ) {
								delete DS[ key ];
							}
						}
					}
				}
			}
		);

	app.DS = new DataStore( );
	exports.DS = DS

} ( Marrow, this ) );
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
				})

				// bind buttons
			}, {
				done: function ( ) {
					// change look to be done
					app.emit( 'bug:done', this.data.id );
					this.$el.addClass( 'done' );
				}
			}
		);

	app.Bug = Bug;

} ( Marrow ) );
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