const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/index',
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out'),
    publicPath: '/out',
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'awesome-typescript-loader',
      include: /src/,
    }],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],

  devtool: 'inline-source-map',

  devServer: {
    contentBase: __dirname,
    publicPath: '/out',
  },
}
