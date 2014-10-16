module.exports = function(grunt) {
	var config = require('./config');
	var repos = [];
	var forever =  {};
	for(var i in config.apps){
		repos.push({
			path:  config.apps[i].path,
			repo: config.apps[i].repo
		});
		forever[i] =  {
			options: {
				index: config.apps[i].path + '/app.js',
				logDir: 'logs'
			}
		}
	}
	grunt.initConfig({
		config: {

		},
		gitPull: {
			example: {
				repos: [

				]
			}
		},
		forever: forever
	});

	grunt.registerTask('deploy', function(app_id){
		grunt.task.run('gitPull:' + app_id, 'forever:' + app_id + ':restart');

	});

	grunt.loadNpmTasks('grunt-gitPull');
}