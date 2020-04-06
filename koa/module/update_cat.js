const { Cat } = require('../mongoose')

module.exports = async (ctx, result) => {
  const { query, name } = ctx.request.body
  if(!query || !name) {
    result.set({
      code: 500,
      msg: '查询参数错误'
    })
    return
  }
  const data = await Cat.findByName(query)
  if(!data) {
    result.set({
      code: 500,
      msg: '无数据'
    })
    return
  }
  Object.assign(data, { name: name })
  data.save()
  result.set({
    code: 200,
    msg: '更新成功',
    data
  })
}