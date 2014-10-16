var path = require('path');
module.exports = function(grunt) {
	var config = require(process.cwd() + '/config');
	var repos = [];
	var forever =  {};
	var grunt_config = {
		config: {

		},
		gitPull: {},
		forever: {}
	}
	for(var i in config.apps){
		grunt_config.gitPull[i] = {
			repos:[{
				path:  config.apps[i].path,
				repo: config.apps[i].repo
			}]
		};

		grunt_config.forever[i] =  {
			options: {
				index: path.join(path.join.apply(config.apps[i].path),  + 'app.js'),
				logDir: 'logs'
			}
		}
	}

	grunt.initConfig(grunt_config);

	grunt.registerTask('deploy', function(app_id){
		grunt.task.run('gitPull:' + app_id, 'forever:' + app_id + ':restart');
	});
	grunt.loadNpmTasks('grunt-forever');
	grunt.loadNpmTasks('grunt-gitpull');
}