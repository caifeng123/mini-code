import { webpack } from '.';
import { JsonLoader } from './loaders/JsonLoader';
import { HtmlWebpackPlugin } from './plugins/htmlWebpackPlugin';

const path = require('path');

const config = {
  entry: path.resolve(__dirname, '../example/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: JsonLoader
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
