const { Cat } = require('../mongoose')
const { CAT } = require('../tools/constant')
// 首页
module.exports = () => {
  return async ctx => {
    const data = await Cat.fetch()
    ctx.apicacheGroup = CAT
    ctx.body = data || {
      code: -1,
      msg: 'no find'
    }
  }
}
