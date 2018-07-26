// @flow

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: `${__dirname}/examples/product-by-handle/index.js`,
  output: {
    path: `${__dirname}/examples/product-by-handle/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/examples/product-by-handle/index.ejs`,
      filename: `${__dirname}/examples/product-by-handle/dist/index.html`,
      base: '/examples/product-by-handle/dist/'
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './examples/product-by-handle/dist',
  }
}
