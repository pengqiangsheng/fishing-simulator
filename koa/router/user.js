const Router = require('@koa/router')
const router = new Router({
  prefix: '/api'
})
router.get('/user', async ctx => {
  ctx.body = {
    code: 200,
    data: { 
      name: 'pqs111'
    },
    msg: '请求成功'
  }
})

module.exports = router