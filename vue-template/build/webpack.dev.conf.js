const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseConf = require('./webpack.base.conf')

module.exports = merge(baseConf, {
  mode: 'development',
  watch: true,
  devtool: '#eval-source-map',
  plugins: [
    new FriendlyErrorsPlugin()
  ]
})
