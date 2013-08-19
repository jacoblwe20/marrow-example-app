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
					"app/js/app.js",	
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




	grunt.registerTask('compile', ['sass', 'concat']);

	// Run the server and watch for file changes
	grunt.registerTask('server', [ 'compile', 'concurrent' ]);

	// Default task(s).
	grunt.registerTask('default', ['compile']);
};
