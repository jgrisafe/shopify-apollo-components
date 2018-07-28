// @flow

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = exampleName => ({
  entry: `${__dirname}/examples/${exampleName}/index.js`,
  output: {
    path: `${__dirname}/examples/${exampleName}/dist`,
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
      template: `${__dirname}/examples/${exampleName}/index.ejs`,
      filename: `${__dirname}/examples/${exampleName}/dist/index.html`,
      base: `${__dirname}/examples/${exampleName}/dist/`
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: `${__dirname}/examples/${exampleName}/dist`,
  }
})

const exampleName = (process.argv[7] || 'product-by-handle')
module.exports = config(exampleName)
