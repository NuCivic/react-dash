var path = require('path');
var webpack = require('webpack');
var indexPath;

console.log("ENV", process.env.REACT_DASH_EX);

// load example based on env set in npm script
switch (process.env.REACT_DASH_EX) {
  case 'js_static':
    indexPath = './examples/js_static_example/app.js';
    break;
  case 'jsx_static':
    indexPath = './examples/jsx_static_example/app.js';
    break;
  default:
    indexPath = './examples/index.js';
}

console.log('INDEX PATH', indexPath);

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    indexPath
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'examples')
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  }
};
