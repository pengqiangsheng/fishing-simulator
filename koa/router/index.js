const Router = require('@koa/router')
const router = new Router()
const jsonwebtoken = require('jsonwebtoken')
const util = require('util')
const crypto = require('crypto')
const DB = require('../fs')
const db = new DB('account')
// const fs = require('fs')
const SECRET = 'pqs-secret'

const USER = {
  username: 'pqs@qq.com',
  password: '253c61e3431952c2ea475e69989fa1e4',
  id: 100
}

const cryptPwd = (password, salt = 'pqs') => {
  const md5 = crypto
    .createHash('md5')
    .update(password + salt)
    .digest('hex')
  console.log('md5:', md5)
  return md5
}

const getUserInfo = async ({ authorization: token }) => {
  const payload = await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], SECRET)
  return payload
}

router
  .get('/game', async ctx => {
    await ctx.render('index')
  })
  .get('/sign-in', async ctx => {
    await ctx.render('sign', {
      url: '/login',
      btnText: '登陆'
    })
  })
  .get('/sign-up', async ctx => {
    await ctx.render('sign', {
      url: '/registry',
      btnText: '马上注册'
    })
  })
  .post('/registry', async ctx => {
    const { email, password } = ctx.request.body

    let result = null
    if(email
      && password
      && db.insert({
        username: email,
        password: cryptPwd(password)
      })
    ) {
      result = {
        code: 200,
        msg: '注册成功',
        user: {
          email,
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


router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  const pwd = cryptPwd(password)
  const data = db.find(username)
  let checkUser = false
  if(data.length) {
    checkUser = data[0].password === pwd
  }
  if (checkUser) {
    ctx.body = {
      code: 200,
      msg: '登录成功',
      token: jsonwebtoken.sign(
        { name: username },
        SECRET,
        { expiresIn: '1h' }
      )
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '用户名密码不匹配'
    }
  }
})

router.get('/user', async ctx => {
  // const payload = await getUserInfo(ctx.header)
  // console.log(payload)
  ctx.body = {
    code: 200,
    data: { 
      name: 111
    },
    msg: '请求成功'
  }
})

router.get('/user1', async ctx => {
  ctx.body = {
    code: 200,
    data: { 
      name: 'user1'
    },
    msg: '请求成功'
  }
})

// router.redirect('/login', 'sign-in')

module.exports = router