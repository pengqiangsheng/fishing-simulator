const { Move } = require('../mongoose')
const debug = require('debug')('app:del-move')
// 删除-感动句子
module.exports = async (ctx, result) => {
  const { id } = ctx.request.body
  debug('params',  ctx.request.body)
  debug('id', id)
  if(!id) return
  const data = await Move.deleteOne({_id: id})
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}
