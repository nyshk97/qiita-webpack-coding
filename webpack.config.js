const path = require('path');

module.exports = {
  mode: 'production',
  // devtool: 'eval-source-map',
  entry: {
    main: './src/javascripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/[name]-[hash].js',
  },
  module: {
    rules: [],
  },
  plugins: [],
};