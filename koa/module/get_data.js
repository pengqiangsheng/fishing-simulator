const { resolve } = require('path')
const fs = require('fs')
// 首页
module.exports = async (ctx, result) => {
  const buffer = fs.readFileSync(resolve(__dirname, '../mock/big-data.json'), 'utf-8')
  result.set({
    code: 200,
    msg: '查询成功',
    data: JSON.parse(buffer)
  })
}
