const { Move } = require('../mongoose')
// 新增-感动句子
module.exports = async (ctx, result) => {
  const data = await Move.fetch()
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}