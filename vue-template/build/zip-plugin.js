// require modules
const fs = require('fs')
const archiver = require('archiver')
const { resolve } = require('./util')
const { version } = require('../package.json')

module.exports = function zipPlugin (zipName) {
  return new Promise(cb => {
    // create a file to stream archive data to.
    const outputPath = resolve(`${zipName}.zip`)
    const output = fs.createWriteStream(outputPath)
    const archive = archiver('zip', {
      zlib: {
        level: 9
      } // Sets the compression level.
    })

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      cb(archive.pointer() / 1014 | 0)
    })

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
      console.log('END')
    })

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
      console.log('WARN', err)
    })

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      console.log('ERROR', err)
    })

    // pipe archive data to the file
    archive.pipe(output)

    // append files from a sub-directory and naming it `new-subdir` within the archive
    archive.directory(resolve('plugin'), `欢乐逛旺铺助手V${version}【注意！安装后此文件夹不能删除和移动】`).finalize()
  });
}
