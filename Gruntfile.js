module.exports = function (grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	// grunt.loadNpmTasks('grunt-customize-bootstrap');
	// grunt.loadNpmTasks('');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		,watch: {
			options:{
				event: 'all'
				,spawn: false
			}
			,build: {
				files: ['src/**/*.js', 'src/**/*.jade', 'src/**/*.styl', 'tests/**/*.spec.js', 'Gruntfile.js', 'package.json', '!**/node_modules/**']
				,tasks: ['build']
				// ,options: {
				// 	livereload: 35720 // port
				// }
			}
			,karma: {
				files: ['src/**/*.js', 'src/**/*.jade', 'src/**/*.styl', 'tests/**/*.spec.js', 'Gruntfile.js', 'karma.conf.js', '!**/node_modules/**']
				,tasks: ['unitTests']
				// ,options: {
				// 	livereload: 35721 // port
				// }
			}
		}
		,clean: {
			build: ["./build/"]
			,dist: ["./dist/"]
		}
		,karma: {//unit  tests
			unit: {
				configFile: 'karma.conf.js'
				,background: true
			}
		}
		,jade: {//html
			options: {
				namespace: false
				,data: {
					timestamp: '<%= grunt.template.today() %>'
				}
			}
			,build: {
				options: {
					pretty: true
					,data: {
						dev: true
					}
				}
				,files: {
					'build/index.html': 'src/index.jade'
					,'build/wifi.html': 'src/wifi.ptl.jade'
					,'build/done.html': 'src/done.ptl.jade'
				}
			}
			,dist: {
				options: {
					pretty: false
					,data: {
						dev: false
					}
				}
				,files: {
					'dist/index.html': 'src/index.jade'
					,'dist/wifi.html': 'src/wifi.ptl.jade'
					,'dist/done.html': 'src/done.ptl.jade'
				}
			}
			// ,ghpages: { //gh-pages Branch
			// 	options: {
			// 		pretty: true
			// 		,data: {
			// 			ghPages: true
			// 			,dev: false
			// 		}
			// 	}
			// 	,files: {
			// 		'index.html': 'src/index.jade'
			// 	}
			// }
		}
		,uglify: {//javascript
			options: {
				mangle: false
			}
			,build: {
				options: {
					beautify: true
				}
				,files: {
					'build/index.min.js': [
						'src/index.module.js'//
						,'src/index.routes.js'
						,'src/index.ctrl.js'
						,'src/wifi.ctrl.js'
						,'src/done.ctrl.js'
					]//
				}
			}
			,dist: {
				options: {
					beautify: false
				}
				,files: {
					'dist/index.min.js': [
						'src/index.module.js'//
						,'src/index.routes.js'
						,'src/index.ctrl.js'
						,'src/wifi.ctrl.js'
						,'src/done.ctrl.js'
					]//
				}
			}
		}
		,copy: {
			build: {
				files: [{
					expand: false
					,filter: 'isFile'
					,dest: 'build/'
					,src: [
						'vendor/angular/v1.3.0/angular.min.js'//
						,'vendor/angular/v1.3.0/angular.min.js.map'
						,'vendor/angular/v1.3.0/angular-route.min.js'
						,'vendor/angular/v1.3.0/angular-route.min.js.map'
						,'vendor/jquery/v2.1.1/jquery.min.js'
						,'vendor/jquery/v2.1.1/jquery.min.map'
						,'vendor/bootstrap/v3.2.0/dist/css/bootstrap.min.css'
						,'vendor/bootstrap/v3.2.0/dist/js/bootstrap.min.js'
						,'vendor/fontawesome/v4.2.0/css/font-awesome.min.css'
						,'vendor/fontawesome/v4.2.0/fonts/*'
						,'images/*'
					]//
				}]
			}
			,dist: {
				files: [{
					expand: false
					,filter: 'isFile'
					,dest: 'dist/'
					,src: [
						'vendor/angular/v1.3.0/angular.min.js'//
						,'vendor/angular/v1.3.0/angular.min.js.map'
						,'vendor/angular/v1.3.0/angular-route.min.js'
						,'vendor/angular/v1.3.0/angular-route.min.js.map'
						,'vendor/jquery/v2.1.1/jquery.min.js'
						,'vendor/jquery/v2.1.1/jquery.min.map'
						,'vendor/bootstrap/v3.2.0/dist/css/bootstrap.min.css'
						,'vendor/bootstrap/v3.2.0/dist/js/bootstrap.min.js'
						,'vendor/fontawesome/v4.2.0/css/font-awesome.min.css'
						,'vendor/fontawesome/v4.2.0/fonts/*'
						,'images/*'
					]//
				}]
			}
		}
		,stylus: {
			build: {
				files: {
					'build/index.css': ['src/index.styl']
				}
			}
			,dist: {
				files: {
					'dist/index.css': ['src/index.styl']
				}
			}
		}
		// ,'customize-bootstrap': {
		// 	build: {
		// 		options: {
		// 			bootstrapPath: 'vendor/bootstrap/v3.2.0',
		// 			src: 'build/vendor/bootstrap/v3.2.0',
		// 			dest: 'src/styles/',
		// 		}
		// 	}
		// }

	});

	grunt.registerTask('unitTests', ['karma:unit:run']);//
	grunt.registerTask('build', ['copy:build', 'uglify:build', 'jade:build', 'stylus:build']);
	grunt.registerTask('dist', ['copy:dist', 'uglify:dist', 'jade:dist', 'stylus:dist']);//'jade:ghpages', 
	grunt.registerTask('initTests', ['karma:unit', 'watch:karma']);
	
	grunt.registerTask('default', ['watch:build']);
};