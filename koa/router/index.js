const Router = require('@koa/router')
const router = new Router({
  prefix: '/api'
})
const DB = require('../fs')
const db = new DB('account')
const fs = require('fs')
const { join } = require('path')
const debug = require('debug')('app:router')
const { cryptPwd, generateToken } = require('../tools')
const cache = require('@pengqiangsheng/apicache')
                    .options({ debug: process.env.NODE_ENV === 'development' })
                    .middleware
// 缓存白名单
const whitePath = {
  '/api/registry': true,
  '/api/login': true
}
// 接口缓存
router.use(cache('2 minutes', ctx => {
  if(whitePath[ctx.path]) {
    debug('缓存白名单：', ctx.path)
    return false
  }else {
    return true
  }
}))

// 注册
router.post('/registry', async ctx => {
  const { username, password } = ctx.request.body
  let result = null
  if(username
    && password
    && db.insert({
      username: username,
      password: cryptPwd(password)
    })
  ) {
    result = {
      code: 200,
      msg: '注册成功',
      user: {
        username,
        password
      }
    }
  }else {
    result = {
      code: 400,
      msg: '注册失败'
    }
  }
  ctx.body = result
})

// 登录
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  const pwd = cryptPwd(password)
  const data = db.find(username)
  const { password: orgin } = data[0]
  const comPwd = orgin.replace(/\r/, '')
  debug('login db pwd:', comPwd)
  let checkUser = false
  if(data.length) {
    checkUser = comPwd === pwd
  }
  debug('login checkUser %o', checkUser)
  if (checkUser) {
    ctx.body = {
      code: 200,
      msg: '登录成功',
      token: generateToken(username)
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '用户名密码不匹配'
    }
  }
})

// router.redirect('/login', 'sign-in')

// router
const special = {
  'daily_signin.js': '/daily_signin',
  'fm_trash.js': '/fm_trash',
  'personal_fm.js': '/personal_fm'
}
debug('========== Generate Router ==========')
fs.readdirSync(join(__dirname, '../module')).reverse().forEach(file => {
  if(!file.endsWith('.js')) return
  let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  let fn = require(join(__dirname, '../module', file))
  let methods = 'get'
  debug('add runtime route:', route)
  router[methods](route, fn())
})
debug('=========== Generate End ============')


module.exports = router
