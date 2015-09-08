'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    index: path.join(__dirname, 'example/index'),
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },

  externals: {
    react: 'React'
  },

  resolve: {
    extensions: ['', '.js', '.scss']
  },

  module: {
    loaders: [{
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        loose: 'all',
        stage: 0
      }
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css-loader!' + 'sass-loader'),
      exclude: /node_modules/,
    }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}
