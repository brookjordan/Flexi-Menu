module.exports = function(grunt) {

var debug_mode = false;

// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),



  sass: {
    dist: {
      options: {
        style: debug_mode ?
          'expanded' :
          'compressed',
        sourcemap: 'inline',
      },
      files: {
        'src/css_standards/base.css': 'src/scss/base.scss',
      }
    }
  },



  autoprefixer: {

    options: {
      cascade: false,
      browsers: ['last 10 versions', 'ie 8', 'ie 9'],

      map: {
        inline: false,
        sourceContent: true,
        annotation: true,
      },
    },

    single_file: {
      options: {},

      src: 'src/css_standards/base.css',
      dest: 'css/base.css',
    },
  },



  concat: {
    options: {
      separator: '\n;',
    },

    mu_system: {
      src: ['src/js/MU_system/app.js', 'src/js/MU_system/services/*.js', 'src/js/MU_system/directives/*.js', 'src/js/MU_system/controllers/*.js',],
      dest: 'src/js_concat/MU_system.js',
    },

    my_app: {
      src: ['src/js/my_app/app.js', 'src/js/my_app/services/*.js', 'src/js/my_app/directives/*.js', 'src/js/my_app/controllers/*.js',],
      dest: 'src/js_concat/my_app.js',
    },
  },



  ngdocs: {
    all: ['src/js/**/*.js']
  },



  uglify: {
    my_target: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,

        mangle: debug_mode ?
          false :
          {
            except: ['angular',],
          },

        beautify: debug_mode ? true : false,
      },
      files: {
        'js/all.min.js': ['src/js_concat/MU_system.js', 'src/js_concat/my_app.js',],
      }
    }
  },



  watch: {
    options: {
      spawn: false,
      livereload: true,
    },

    styles: {
      files: ['src/scss/*.scss', 'src/scss/**/*.scss'],
      tasks: ['sass', 'autoprefixer'],
      options: {
        spawn: false,
        livereload: true,
      },
    },

    scripts: {
      files: ['src/js/*.js', 'src/js/**/*.js'],
      tasks: ['concat', 'uglify'],
      options: {
        spawn: false,
        livereload: true,
      },
    },

    html: {
      files: ['**/*.html'],
      tasks: [],
      options: {
        spawn: false,
        livereload: true,
      },
    },
  },



});





grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-ngdocs');

// Default tasks.
grunt.registerTask('default', ['sass', 'autoprefixer', 'concat', 'uglify', 'watch', ]);
grunt.registerTask('ngdocs', ['ngdocs', ]);

};