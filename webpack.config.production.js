var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: [
    './src/ReactDashboard.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-dashboard.min.js',
    libraryTarget: 'umd',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin('react-dashboard.min.css'),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: [
          path.join(__dirname, 'src')
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    d3: {
      root: 'd3',
      commonjs: 'd3',
      commonjs2: 'd3',
      amd: 'd3',
    },
    moment: {
      root: 'moment',
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
    },
    NVD3Chart: {
      root: 'NVD3Chart',
      commonjs: 'NVD3Chart',
      commonjs2: 'NVD3Chart',
      amd: 'NVD3Chart',
    },
    'flux': {
      root: 'flux',
      commonjs: 'flux',
      commonjs2: 'flux',
      amd: 'flux',
    },
  },
};
