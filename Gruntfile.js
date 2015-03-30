module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		md2html: {
      one_file: {
        options: {},
        files: [{
          src: ['outline.md'],
          dest: 'outline.html'
        }]
      }
    }
	});

	// Load the plugin that provides the "md2html" task.
	grunt.loadNpmTasks('grunt-md2html');
};