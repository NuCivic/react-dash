var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var args = require('minimist')(process.argv.slice(2));
console.log(args.port);
console.log(config);

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: args.hot,
  historyApiFallback: true,
  contentBase: path.join(__dirname, 'examples'),
}).listen(args.port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
