const { Move } = require('../mongoose')
// 新增-感动句子
module.exports = async (ctx, result) => {
  const { move, type, from, creator } = ctx.request.body
  const _move = new Move({
    move,
    type,
    from,
    creator
  })
  const data = await _move.save()
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}
