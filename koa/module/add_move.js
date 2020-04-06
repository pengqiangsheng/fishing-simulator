const { Move } = require('../mongoose')
const { getUserInfo } = require('../tools')
const debug = require('debug')('app:add-move')
// 新增-感动句子
module.exports = async (ctx, result) => {
  const { authorization } = ctx.headers
  const user = await getUserInfo({authorization})
  const { move, type, from } = ctx.request.body
  const _move = new Move({
    move,
    type,
    from,
    creator: user.name
  })
  const data = await _move.save()
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}
