const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const logger = require('koa-logger')
const { resolve } = require('path')
const router = require('./router')
const page = require('./router/page')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const koajwt = require('koa-jwt')
const serve = require('koa-static')
const { SECRET } = require('./tools/constant')
const debug = require('debug')('app:app')
const { simpleErrorHandler, interceptToken } = require('./middleware')


app.use(cors())
app.use(logger())
app.use(bodyParser())
app.use(serve('public', { maxage: 60 * 60 * 1000 }))

debug('现在的环境：', process.env.NODE_ENV)
if(process.env.NODE_ENV === "production") {
  debug('开启token验证')
  // 对token进行验证
  app.use(interceptToken())
  // 路由白名单
  app.use(koajwt({ secret: SECRET }).unless({
    path: [/\/api\/login/, /\/api\/registry/, /\/page/]
  }))
}

app.use(simpleErrorHandler())

app.use(views(resolve(__dirname, './template'), {
	extension: 'pug'
}))

app
	.use(router.routes())
	.use(page.routes())
  .use(router.allowedMethods())

const port = process.env.PORT || 2333
const host = process.env.HOST || ''

app.listen(port, host, () => {
  debug(`server running @ http://${host ? host : 'localhost'}:${port}`)
})
