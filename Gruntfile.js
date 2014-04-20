module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // reload: {
    //     port: 8080,
    //     proxy: {
    //         host: 'localhost',
    //     }
    // },
    watch: {
      files: ['Gruntfile.js', 'public/js/**/*.js'],
      // tasks: 'reload',
      options: {
        livereload: true
      }
    },
    nodemon: {
        dev: {
            script: 'server.js',
            options: {
                args: [],
                ignore: ['public/**'],
                ext: 'js,html',
                nodeArgs: ['--debug'],
                delayTime: 1,
                env: {
                    PORT: 8080
                },
                cwd: __dirname
            }
        }
    },
    concurrent: {
        tasks: ['nodemon'],
        options: {
            logConcurrentOutput: true
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  // grunt.loadNpmTasks('grunt-reload');
  

  grunt.registerTask('default', ['concurrent']);

}