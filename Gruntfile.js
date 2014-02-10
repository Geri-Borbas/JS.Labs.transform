module.exports = function(grunt)
{
    // Configuration.
    grunt.initConfig({

        // Import package information.
        package: grunt.file.readJSON('package.json'),

        // Merge includes to 'build/temp'.
        includes:
        {
            options:
            { includeRegexp: /(\s*)include\s*[(]\s*['"](\S+)['"]\s*[)]\s*;?\s*$/, },

            files:
            {
                src: ['Classes/**'],
                dest: 'build/derived',
            },
        },

        // Minifiy 'build/derived' results.
        uglify:
        {
            app :
            {
                options:
                { banner: '/* <%= package.name %> <%= package.version %> */\n' },

                files :
                {
                    'build/<%= package.name %>.min.js' :
                    [ 'build/derived/Classes/<%= package.name %>!app.js' ],

                    'build/<%= package.version %>/<%= package.name %>!app_<%= package.version %>.min.js' :
                    [ 'build/derived/Classes/<%= package.name %>!app.js' ],
                },
            },

        },

        // Build SCSS.
        sass:
        {
            options:
            { compass: true },

            dist:
            {
                files:
                [
                    {
                        expand: true,
                        cwd: 'UI/scss',
                        src: ['*.scss'],
                        dest: 'build/UI',
                        ext: '.css'
                    },
                ],
            },
        },

        // Watch.
        watch:
        {
            files: ['Classes/**/*.*', 'UI/**/*.*'],
            tasks: ['includes', 'uglify', 'sass']
        }

    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['watch']);

};