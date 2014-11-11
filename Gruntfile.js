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

		less: {
			compile: {
				options: {
					strictMath: true,
				},
				files: {
					'dist/css/index.css': 'css/index.less'
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
				src: ['dist/css/index.css']
			}
		},

		csscomb: {
			portfolio: {
				expand: true,
				cwd: 'dist/css/',
				src: ['*.css', '!*.less.css'],
				dest: 'dist/css/'
			}
		},

		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				noAdvanced: true
			},
			css: {
				files: {
					'dist/css/index.css': 'dist/css/index.css'
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
	grunt.registerTask('dist', ['clean', 'copy', 'less', 'autoprefixer', 'csscomb', 'cssmin']);
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
