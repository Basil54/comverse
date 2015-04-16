
module.exports = function (grunt) {
	// This is the default port that livereload listens on;
	// change it if you configure livereload to use another port.
	var LIVERELOAD_PORT = 35729;
	// lrSnippet is just a function.
	// It's a piece of Connect middleware that injects
	// a script into the static served html.
	var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
	// All the middleware necessary to serve static files.
	var livereloadMiddleware = function (connect, options) {
		return [
		// Inject a livereloading script into static files.
		lrSnippet,
		// Serve static files.
		connect.static(options.base[0]),
		// Make empty directories browsable.
		connect.directory(options.base[0])
	  ];
	};
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
		},
			// The connect task is used to serve static files with a local server.
		connect: {
		  comverse: {
			options: {
			  // The server's port, and the folder to serve from:
			  // Ex: 'localhost:9000' would serve up 'comverse/index.html'
			  port: 9000,
			  //base:['*/**'],
			  // Custom middleware for the HTTP server:
			  // The injected JavaScript reloads the page.
			  middleware: livereloadMiddleware
			}
		  }
		},
			// The watch task is used to run tasks in response to file changes
		watch: {
		  comverse: {
			// '**' is used to include all subdirectories
			// and subdirectories of subdirectories, and so on, recursively.
			files: ['**/*'],
			// In our case, we don't configure any additional tasks,
			// since livereload is built into the watch task,
			// and since the browser refresh is handled by the snippet.
			// Any other tasks to run (e.g. compile CoffeeScript) go here:
			tasks:[],
			options: {
			  livereload:LIVERELOAD_PORT
			}
		  }
		}
	});

	// Load the plugin that provides the "md2html" task.
	grunt.loadNpmTasks('grunt-md2html');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default', ['connect:comverse','watch:comverse']);
};