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
			less: {
				src: 'css/app.less.css',
				dest: 'dist/css/app.less.css'
			},
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
			compilePages: {
				options: {
					strictMath: true,
				},
				files: {
					'dist/css/pages.css': 'css/pages.less.css'
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
				src: ['dist/css/pages.css']
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
					'dist/css/pages.css': 'dist/css/pages.css',
					'dist/css/app.less.css': 'dist/css/app.less.css',
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
	grunt.registerTask('dist', ['clean', 'copy', 'imagemin', 'concat', 'uglify', 'less', 'autoprefixer', 'csscomb', 'cssmin']);

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
