const Router = require('@koa/router')
const router = new Router({
  prefix: '/page'
})
const { Move } = require('../mongoose')

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
  .get('/move', async ctx => {
    const list = await Move.fetch()
    await ctx.render('move', {
      list
    })
  })

module.exports = router
