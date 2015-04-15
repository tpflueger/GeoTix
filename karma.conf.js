// Karma configuration
// Generated on Mon Apr 06 2015 12:26:39 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'lib/assets/bower_components/angular/angular.js',
        'app/assets/javascripts/**/*.html',
        'lib/assets/bower_components/angular-mocks/angular-mocks.js',
        'lib/assets/bower_components/angular-devise/lib/devise.js',
        'lib/assets/bower_components/angular-google-maps/dist/angular-google-maps.js',
        'lib/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
        'lib/assets/bower_components/jquery/dist/jquery.js',
        'lib/assets/bower_components/lodash/dist/lodash.js',
        'lib/assets/bower_components/ngDialog/js/ngDialog.js',
        'lib/assets/bower_components/semantic-ui/dist/semantic.js',
        'app/assets/javascripts/app.js',
        'app/assets/javascripts/**/*.js',
        'app/assets/javascripts/test/*.js',
        'app/assets/javascripts/test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
        'app/assets/javascripts/application.js',
        'karma.conf.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/assets/javascripts/**/*.html': ['ng-html2js'],
        '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
        // we want all templates to be loaded in the same module called 'templates'
        moduleName: 'templates'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 8765,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
