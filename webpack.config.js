var path = require('path');

module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0, plugins: ['./babelRelayPlugin']}
      }
    ]
  },
  devServer: {
    contentBase: "./public",
    inline: true,
    port: 8080
  },
};
