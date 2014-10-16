module.exports = function(grunt) {

var config = {};

	grunt.initConfig ({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '*//*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> *//*\n'
			},
			build: {
				src: '_build/<%= pkg.name %>.js',
				dest: '_build/<%= pkg.name %>.min.js'
			}
		},
		'aws_s3':{
			accessKeyId:config.accessKeyId,
			secretAccessKey:config.secretAccessKey,
			production: {
				options: {
					bucket:config.bucket,
					files: [
						{expand: true, cwd: './public/js', src: ['**'], dest: 'js/'},
						{expand: true, cwd: './public/css', src: ['**'], dest: 'css/'},
						{expand: true, cwd: './public/imgs', src: ['**'], dest: 'imgs/'},
						{expand: true, cwd: './public/fonts', src: ['**'], dest: 'fonts/'}
					]
				}
			}
		},
		'angular-builder': {
			options: {
				mainModule: 'core100',
				externalModules:[
					'ngRoute',
					'ngCookies',
					'ngResource',
					'njax.directives',
					'mgcrea.ngStrap',
					'mgcrea.ngStrap.typeahead',
					'njax.socket.service'
				]
			},
			app: {
				src:  'public/js/**/*.js',
				dest: '_build/js/<%= pkg.name %>.js'
			}
		},
		less: {
			development: {
				options: {
					modifyVars: {
						imgPath: '"http://mycdn.com/path/to/images"',
						bgColor: 'red'
					},
					paths: ["public/less"]
				},
				files: {
					"_build/css/<%= pkg.name %>.css": "public/less/*.less"
				}
			},
			production: {
				options: {
					paths: ["public/less"],
					cleancss: true
				},
				files: {
					"_build/css/<%= pkg.name %>.css": "public/less/*.less"
				}
			}
		}

	});

	grunt.loadNpmTasks ('grunt-angular-builder');

	grunt.registerTask ('debug', ['angular-builder::debug'])
	grunt.registerTask ('release', ['angular-builder', 'uglify', 'contrib-less']);// 'aws-s3']);

	/*grunt.loadNpmTasks('grunt-contrib-less');
	 grunt.loadNpmTasks('grunt-aws-s3');*/





	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');



};