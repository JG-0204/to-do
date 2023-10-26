const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle[contenthash:5].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
