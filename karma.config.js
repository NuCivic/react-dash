var webpack = require('karma-webpack');

module.exports = function (config) {
  config.set({
    frameworks: [ 'jasmine' ],
    files: [
      // polyfills
      './node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/fetch-polyfill/fetch.js',
      
      // tests
      'tests/**/*_spec.js',

      // fixtures
      { pattern:'tests/fixtures/*.js', watched: true, served: true, included: false },
      { pattern: 'tests/fixtures/*.json', watched: true, served: true, included: false },
      { pattern: 'tests/fixtures/*.geojson', watched: true, served: true, included: false }
    ],
    plugins: [webpack, 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage', 'karma-spec-reporter', 'karma-sourcemap-loader'],
    browsers: [ 'PhantomJS' ],
    preprocessors: {
      'tests/**/*_spec.js': ['webpack', 'sourcemap'],
      'src/**/*.js': ['webpack', 'sourcemap']
    },
    reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader',
            query: {compact: false}
          },
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.json$/, loader: "json-loader" },
          { test: /\.geojson$/, loader: "json-loader" },
          { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
        ]
      },
      devtool: 'inline-source-map',
    },
    webpackMiddleware: { noInfo: true }
  });
};
