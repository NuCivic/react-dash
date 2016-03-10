var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
console.log(config);
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: path.join(__dirname, 'examples'),
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
