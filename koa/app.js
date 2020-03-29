const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const logger = require('koa-logger')
const { resolve } = require('path')
const router = require('./router')
const user = require('./router/user')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const koajwt = require('koa-jwt')
const SECRET = 'pqs-secret'

app.use(cors())
app.use(logger())
app.use(bodyParser())

app.use(async (ctx, next) => {
	console.log(ctx.path)
	if(ctx.path === '/') {
		console.log('game')
		ctx.redirect('/game')
		ctx.status = 301
	}else {
		await next()
	}
})
// 中间件对token进行验证
app.use(async (ctx, next) => {
	return next().catch((err) => {
		if (err.status === 401) {
			ctx.status = 401;
			ctx.body = {
				code: 401,
				msg: err.message
			}
		} else {
			throw err
		}
	})
})

app.use(koajwt({ secret: SECRET }).unless({
	// 登录接口不需要验证
	path: [/^\/login/, /^\/sign-in/, /^\/sign-up/, /\/game/, /\/registry/]
}))

app.use(views(resolve(__dirname, './template'), {
	extension: 'pug'
}))

app.use(async (ctx, next) => {
	ctx.type = 'application/json; charset=UTF-8'
	ctx.set('Cache-Control','no-cache')
	await next()
})


app
	.use(router.routes())
	.use(user.routes())
  .use(router.allowedMethods())

app.listen(2333, () => {
	console.log('sever is running on 2333!')
})