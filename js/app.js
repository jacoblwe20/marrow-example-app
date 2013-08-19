/* marrow-example-app - 0.0.1 1376895032539 */


/*
 * Marrow.js - 0.0.20 
 * Description : Marrow is constructor that extends your constructors to help emit events and create a conventions to help manage components 
 * Project Url : https://github.com/jacoblwe20/marrow 
 * Author : Jacob Lowe <http://jacoblowe.me> 
 * License : MIT 
 */

!function(a){var b={},c=function(a,b){if(!(this instanceof c))return new c(a,b);"function"==typeof b&&b(this),"object"==typeof b&&this.merge(this,b);var d=function(){return this.emit("initialize"),a.apply(this,arguments)};return this.constructor=a,this.on("initialize",function(){this._store()}),this.merge(d.prototype,a.prototype,this),d};c.prototype._store=function(){b[this.constructor.name]||(b[this.constructor.name]=[]);var a=b[this.constructor.name];a.push(this),this.ts=+new Date+a.length},c.prototype.merge=function(){var a=arguments[0];if("object"==typeof a){for(var b=0;b<=arguments.length-1;b+=1){var c=arguments[b];if("object"==typeof c)for(var d in c)a[d]=c[d]}return a}},c.prototype.getState=function(){return this.__state},c.prototype.setState=function(a){this.__state=+a},a.Marrow=c}(this),function(a){var b=/\:/g,c=function(a){return"string"==typeof a?a.split(b):null};a.prototype.__events=function(){this._events={}},a.prototype.on=function(a,b){if("object"==typeof a)return a=this._objBind(a,b,arguments[2]),null;if("function"==typeof b&&"string"==typeof a){var d=c(a),e=d.length>1?d[0]+":"+d[1]:d[0];this._events||this.__events(),"object"!=typeof this._events[e]&&(this._events[e]=[]),"number"==typeof this._events[e].length&&this._events[e].push(b)}return this},a.prototype.once=function(a,b){var c=this,d=function(){b.apply(c,arguments),c.off(a,d),c.off(a,b)};this.on(a,d)},a.prototype.off=function(a,b){if("object"==typeof a)return a=this._objUnbind(a,b,arguments[2]),null;if("object"==typeof this._events&&"string"==typeof a&&"object"==typeof this._events[a]&&this._events[a].length){var c=this._events[a];if("function"==typeof b)for(var d=0;d<c.length;d+=1)""+c[d]==""+b&&(this._events[a][d]=null);else this._events[a]=[]}else"undefined"==typeof a&&"undefined"==typeof b&&(this._events={})},a.prototype.emit=function(a){if("object"==typeof this._events&&"string"==typeof a){var b,d=c(a),e=[].slice.call(arguments);this._events||this.__events();for(var f=0;f<d.length;f+=1)if(b=f?d[0]+":"+d[f]:d[f],"object"==typeof this._events[b]&&this._events[b].length)for(var g=0;g<this._events[b].length;g+=1){var h=!f&&d.length>1?e:e.slice(1);this._events[b][g]&&this._events[b][g].apply(this,h)}}},a.prototype._objBind=function(a,b,c){return a||"function"==typeof a.on||"string"==typeof b||"function"==typeof c?(a.on(b,c),void 0):null},a.prototype._objUnbind=function(a,b,c){return a||"function"==typeof a.off||"string"==typeof b?(a.off(b,c),void 0):null}}(Marrow),function(a){a.prototype.__extend=function(a,b,c){var d=this;this[a]=function(){"function"==typeof this[c]&&d[c].apply(this,arguments),"number"==typeof b&&(d.__state=b);var e=[].concat(a,Array.prototype.slice.call(arguments));d.emit.apply(this,e)}},a.prototype.to=function(a,b,c){if("string"==typeof a&&"function"==typeof b){var d="__"+a;this[d]=b,this.__extend(a,c,d)}}}(Marrow);
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