import { webpack } from '.';
const HtmlWebpackPlugin = require('./plugins/html-webpack-plugin.cjs');
const jsonLoader = require('./loaders/json-loader.cjs');

const path = require('path');

const config = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: jsonLoader
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'template.html'
    })
  ]
};

webpack(config);
