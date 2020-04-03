// 首页
module.exports = () => {
  return async ctx => {
    ctx.body = {
      name: 'pqs',
      desc: '这是一个测试接口！'
    }
  }
}
