const { resolve } = require('path')
const fs = require('fs')
// 首页
module.exports = () => {
  return async ctx => {
    const buffer = fs.readFileSync(resolve(__dirname, '../mock/big-data.json'), 'utf-8')
    ctx.body = {
      data: JSON.parse(buffer)
    }
  }
}
