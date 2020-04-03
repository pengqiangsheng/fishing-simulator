const Router = require('@koa/router')
const router = new Router({
  prefix: '/page'
})

router
  .get('/home', async ctx => {
    await ctx.render('index')
  })
  .get('/sign-in', async ctx => {
    await ctx.render('sign', {
      url: '/api/login',
      btnText: '登陆'
    })
  })
  .get('/sign-up', async ctx => {
    await ctx.render('sign', {
      url: '/api/registry',
      btnText: '马上注册'
    })
  })

module.exports = router
