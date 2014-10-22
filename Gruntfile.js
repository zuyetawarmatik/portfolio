module.exports = function (grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	RegExp.quote = function (string) {
		return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
	};

	var fs = require('fs');
	var path = require('path');
	var npmShrinkwrap = require('npm-shrinkwrap');

	// Project configuration.
	grunt.initConfig({

		// Task configuration.
		clean: {
			dist: ['dist']
		},

		copy: {
			img: {
				src: 'img/*',
				dest: 'dist/'
			},
			fonts: {
				expand: true,
				flatten: true,
				cwd: 'fonts/',
				src: ['**/*.eot', '**/*.ttf', '**/*.otf', '**/*.woff', '**/*.svg'],
				dest: 'dist/fonts/'
			},
			vendor: {
				files: [
					{src: "bower_components/html5-boilerplate/css/normalize.css", dest: "dist/vendor/css/html5-boilerplate/normalize.css"},
					{src: "bower_components/html5-boilerplate/css/main.css", dest: "dist/vendor/css/html5-boilerplate/main.css"},

					{expand: true, cwd: "bower_components/polymer/", src: ['**/*'], dest: "dist/vendor/import/polymer/"},

					{src: "bower_components/platform/platform.js", dest: "dist/vendor/js/platform.js"},
					{src: "bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js", dest: "dist/vendor/js/modernizr-2.6.2.min.js"},
					{src: "bower_components/angular/angular.min.js", dest: "dist/vendor/js/angular.min.js"},
					{src: "bower_components/angular-route/angular-route.min.js", dest: "dist/vendor/js/angular-route.min.js"},
					{src: "bower_components/angular-animate/angular-animate.min.js", dest: "dist/vendor/js/angular-animate.min.js"},
					{src: "bower_components/svg.js/dist/svg.min.js", dest: "dist/vendor/js/svg.min.js"},
					{src: "bower_components/jquery/dist/jquery.min.js", dest: "dist/vendor/js/jquery.min.js"},
				]
			}
		},

		imagemin: {
			portfolio: {
				files: [{
					expand: true,
					cwd: 'dist/img/',
					src: ['*.png'],
					dest: 'dist/img/'
				}]
			}
		},

		concat: {
			js: {
				src: [
					'js/app.js',
					'js/common.js',
					'js/controllers.js',
					'js/directives.js',
					'js/services.js'
				],
				dest: 'dist/js/app.js'
			},
			fonts: {
				src: [
					'fonts/Paytone_One/Paytone_One.css',
					'fonts/Source_Sans_Pro/Source_Sans_Pro.css',
					'fonts/font-awesome-4.2.0/font-awesome.min.css'
				],
				dest: 'dist/fonts/fonts.css'
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			js: {
				src: '<%= concat.js.dest %>',
				dest: 'dist/js/app.js'
			},
		},

		less: {
			compile: {
				options: {
					strictMath: true,
				},
				files: {
					'dist/css/app.css': 'css/app.less.css'
				}
			},
		},

		autoprefixer: {
			options: {
				browsers: [
					'Android 2.3',
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24', // Firefox 24 is the latest ESR
					'Explorer >= 8',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6'
				]
			},
			portfolio: {
				src: ['dist/css/app.css']
			},
		},

		csscomb: {
			portfolio: {
				expand: true,
				cwd: 'dist/css/',
				src: ['*.css', '!*.less.css'],
				dest: 'dist/css/'
			},
		},

		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				noAdvanced: true
			},
			css: {
				files: {
					'dist/css/app.css': 'dist/css/app.css'
				}
			},
			fonts: {
				files: {
					'dist/fonts/fonts.css': 'dist/fonts/fonts.css',
				}
			}
		},

		exec: {
			npmUpdate: {
				command: 'npm update'
			}
		}
	});

	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

	var runSubset = function (subset) {
		return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
	};
	var isUndefOrNonZero = function (val) {
		return val === undefined || val !== '0';
	};

	// Full distribution task.
	grunt.registerTask('image', ['imagemin']);
	grunt.registerTask('dist', ['clean', 'copy', 'concat', 'uglify', 'less', 'autoprefixer', 'csscomb', 'cssmin']);
	grunt.registerTask('dist-full', ['dist', 'image']);

	// Task for updating the cached npm packages used by the Travis build (which are controlled by test-infra/npm-shrinkwrap.json).
	// This task should be run and the updated file should be committed whenever Bootstrap's dependencies change.
	grunt.registerTask('update-shrinkwrap', ['exec:npmUpdate', '_update-shrinkwrap']);
	grunt.registerTask('_update-shrinkwrap', function () {
		var done = this.async();
		npmShrinkwrap({ dev: true, dirname: __dirname }, function (err) {
			if (err) {
				grunt.fail.warn(err)
			}
			var dest = 'test-infra/npm-shrinkwrap.json';
			fs.renameSync('npm-shrinkwrap.json', dest);
			grunt.log.writeln('File ' + dest.cyan + ' updated.');
			done();
		});
	});
};
