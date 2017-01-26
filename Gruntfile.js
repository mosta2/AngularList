module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            combine: {
                files: {
                    'Content/main.css': ['Content/angular-material.min.css', 'Content/app.css']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',['cssmin']);
};