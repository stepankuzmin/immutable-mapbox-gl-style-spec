const path = require('path');
const webpack = require('webpack');

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'immutable-mapbox-gl-style-spec',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
  },
  externals: {
    immutable: 'immutable'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'flow']
          }
        }
      }
    ]
  }
};
