module.exports = function(grunt) {

var debug_mode = false;

// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),



  ngdocs: {
    all: [ 'src/js/**/*.js', ],
  },



  copy: {
    angular: {
      expand: true,
      flatten: true,
      cwd: 'src/js_ready/',
      src: '**',
      dest: 'js/',
    },
  },



  sass: {
    dist: {
      options: {
        style: debug_mode ?
          'expanded' :
          'compressed',
        sourcemap: 'inline',
      },
      files: {
        'temp/css/standards/base.css': 'src/scss/base.scss',
      },
    },
  },



  autoprefixer: {

    options: {
      browsers: [ 'last 10 versions', 'ie 8', 'ie 9', ],
      map: true,

      cascade: debug_mode ?
        true :
        false,
    },

    single_file: {
      options: {},

      src: 'temp/css/standards/base.css',
      dest: 'css/base.css',
    },
  },



  ngtemplates:  {
    options: {
      htmlmin: debug_mode ?
        {
          collapseBooleanAttributes:      false,
          collapseWhitespace:             false,
          removeAttributeQuotes:          false,
          removeComments:                 false,
          removeEmptyAttributes:          false,
          removeRedundantAttributes:      false,
          removeScriptTypeAttributes:     false,
          removeStyleLinkTypeAttributes:  false
        } :
        {
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeComments:                 true, // Only if you don't use comment directives!
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        },
    },

    myApp:        {
      src:      'templates/**/**.html',
      dest:     'temp/js/my_app/templates.js',
    },
  },



  concat: {
    options: {
      separator: '\n;',
    },

    mu_system: {
      src: [ 'src/js/MU_system/app.js', 'src/js/MU_system/services/muMain.js', 'src/js/MU_system/services/muContent.js', 'src/js/MU_system/directives/*.js', ],
      dest: 'temp/js/concat/MU_system.js',
    },

    my_app: {
      src: [ 'src/js/my_app/app.js', 'temp/js/my_app/templates.js', 'src/js/my_app/services/*.js', 'src/js/my_app/directives/*.js', ],
      dest: 'temp/js/concat/my_app.js',
    },
  },



  uglify: {
    my_target: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,

        mangle: debug_mode ?
          false :
          {
            except: [ 'angular', ],
          },

        beautify: debug_mode ? true : false,
      },
      files: {
        'js/all.min.js': [ 'temp/js/concat/MU_system.js', 'temp/js/concat/my_app.js', ],
      },
    },
  },



  watch: {
    options: {
      spawn: false,
      livereload: true,
    },

    styles: {
      files: ['src/scss/*.scss', 'src/scss/**/*.scss', ],
      tasks: ['sass', 'autoprefixer', ],
      options: {
        spawn: false,
        livereload: true,
      },
    },

    scripts: {
      files: ['src/js/*.js', 'src/js/**/*.js', ],
      tasks: ['concat', 'uglify', ],
      options: {
        spawn: false,
        livereload: true,
      },
    },

    templates: {
      files: ['templates/**/*.html', ],
      tasks: ['ngtemplates', 'concat', 'uglify', ],
      options: {
        spawn: false,
        livereload: true,
      },
    },

    html: {
      files: ['**/*.html', ],
      tasks: [],
      options: {
        spawn: false,
        livereload: true,
      },
    },
  },



});




grunt.loadNpmTasks('grunt-ngdocs');

grunt.loadNpmTasks('grunt-contrib-copy');

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');

grunt.loadNpmTasks('grunt-angular-templates');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.loadNpmTasks('grunt-contrib-watch');

// Default tasks.
grunt.registerTask('default', ['copy', 'sass', 'autoprefixer', 'ngtemplates', 'concat', 'uglify', 'watch', ]);
grunt.registerTask('ngdocs', ['ngdocs', ]);

};