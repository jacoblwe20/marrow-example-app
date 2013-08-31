var confg = require('confg').init( );
	Handlebars = require('handlebars'),
	fs = require('fs');

	Handlebars.registerHelper('json', function ( object ) {
		return JSON.stringify( object );
	})

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat : {
			options : {
				banner : "/* <%=pkg.name%> - <%=pkg.version%> " + (+new Date()) + " */\n\n\n" // im a hack
			},
			dist: {
				src : [
					// the actual app files
					'app/js/libs/marrow.min.js',
					'app/js/libs/marrow-debug.min.js',
					"app/js/app.js",	
					"app/js/DS.js",
					"app/js/components/**/*.js"				
				],
				dest : 'js/app.js'
			}
		},
		sass: {                            
	        dist: {                         
	            files: {                        
	                'css/app.css': 'app/sass/app.scss'     
	            }
	        }
	    },
		watch: {
			app : {
				files : 'app/js/**/*.js',
				tasks: ['concat'],
				options : {
					interrupt : false
				}
			},
			stylesheets: {
        		files:  'app/sass/**/*.scss',
        		tasks: ['sass'],
        		options: {
          			interrupt: false
        		}
      		},
      		precompile: {
        		files:  'templates/*.hbs',
        		tasks: ['precompile'],
        		options: {
          			interrupt: false
        		}
      		}
		},
		connect: {
		    server: {
		      	options: {
			        port: 9001,
			        base: './',
			        keepalive : true
		      	}
		    }
		},
		concurrent : {
			target : {
				tasks : [ "connect", "watch" ],
				options: {
					logConcurrentOutput: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-sass');


	grunt.registerTask(
		'precompile', 
		'Precompiles index file for ' + 
		'better configurations',
		function ( ) { 
			var file = fs.readFileSync( 'templates/index.hbs' );
			var template = Handlebars.compile( file.toString() );
			var result = template( {
				Data: require( './data/bugz.json' ),
				DEBUG: process.env.DEBUG,
				config: {
					appName: process.env.NAME,
					version: process.env.VERSION
				},
				ts: process.env.APPSTARTUP,
				link: 'made with <a href="https://github.com/jacoblwe20/marrow">marrow</a>'
			} );

			fs.writeFileSync('./index.html', result );
			grunt.log.writeln('file index.html created');
		}
	);


	grunt.registerTask('compile', ['precompile', 'sass', 'concat']);

	// Run the server and watch for file changes
	grunt.registerTask('server', [ 'compile', 'concurrent' ]);

	// Default task(s).
	grunt.registerTask('default', ['compile']);
	
};
