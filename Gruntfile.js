module.exports = function(grunt) {
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			sass: {
				dist: {
					files: {
						'app/assets/css/main.css' : 'scss/main.scss'
					}
				}
			},
			watch: {
				css: {
					files: 'scss/**/*.scss',
					tasks: ['sass']
				}
			}
		});
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-watch');

		// Auto. build css out of a scss Files
		grunt.registerTask('myWatcher', ['watch']);
  		

		// A very basic default task.
  		grunt.registerTask('default', 'Hello Grunt', function() {
    		console.log('hello grunt...');
  		});

};