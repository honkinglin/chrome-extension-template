// 创建日期后缀
module.exports = function createSuffix () {
  const date = new Date()
  return [
    [
      date.getFullYear(),
      ('00' + (date.getMonth() + 1)).slice(-2),
      ('00' + date.getDate()).slice(-2),
    ].join(''),
    [
      ('00' + date.getHours()).slice(-2),
      ('00' + date.getMinutes()).slice(-2),
      ('00' + date.getSeconds()).slice(-2),
    ].join(''),
  ].join('')
}
