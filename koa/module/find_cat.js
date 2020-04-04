const { Cat } = require('../mongoose')
// 首页
module.exports = () => {
  return async ctx => {
    const data = await Cat.fetch()
    ctx.apicacheGroup = 'cat'
    ctx.body = data || {
      code: -1,
      msg: 'no find'
    }
  }
}
