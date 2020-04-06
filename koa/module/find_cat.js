const { Cat } = require('../mongoose')
const { CAT } = require('../tools/constant')
// 首页
module.exports = async (ctx, result) => {
  const data = await Cat.fetch()
  ctx.apicacheGroup = CAT
  result.set({
    code: 200,
    msg: '查询成功',
    data
  })
}
