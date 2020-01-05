const { resolve } = require('./util')

module.exports = {
  name: '浏览器插件',
  outputPath: resolve(),
  keyPath: resolve('key.pem'),
  contentPath: resolve('plugin')
}
