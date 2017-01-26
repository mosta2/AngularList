module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            combine: {
                files: {
                    'Content/main.css': ['Content/angular-material.min.css', 'Content/app.css']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js',  'app/app.module.js', 'app/common/app.config.js',
                    'app/common/logger.service.js', 'app/common/data.service.js', 'app/common/navigate.service.js',
                    'app/index.controller.js', 'app/List/List.controller.js', 'app/List/addItem.controller.js']
        },
        uglify: {
            my_target: {
                files: {
                    'Scripts/main.js': ['Scripts/angular.js', 'Scripts/angular-route.min.js',
                        'Scripts/angular-animate/angular-animate.min.js', 'Scripts/angular-aria/angular-aria.min.js',
                        'Scripts/angular-material/angular-material.min.js', 'app/app.module.js', 'app/common/app.config.js',
                        'app/common/logger.service.js', 'app/common/data.service.js', 'app/common/navigate.service.js',
                        'app/index.controller.js', 'app/List/List.controller.js', 'app/List/addItem.controller.js']
                }
            }
        },
        concat: {
            dist: {
                src: ['Scripts/angular.js','Scripts/angular-route.min.js',
                    'Scripts/angular-animate/angular-animate.min.js','Scripts/angular-aria/angular-aria.min.js',
                    'Scripts/angular-material/angular-material.min.js','app/app.module.js','app/common/app.config.js',
                    'app/common/logger.service.js','app/common/data.service.js','app/common/navigate.service.js',
                    'app/index.controller.js','app/List/List.controller.js','app/List/addItem.controller.js'],
                dest: 'Scripts/main.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
   
    grunt.registerTask('default', ['cssmin'], ['uglify']);
};