const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  entry: './src/index',

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
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'inline-source-map',

  devServer: {
    contentBase: __dirname,
    publicPath: '/out',
    hot: true,
  },
}
