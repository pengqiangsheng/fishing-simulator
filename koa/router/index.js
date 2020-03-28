const Router = require('@koa/router')
const router = new Router()
const jsonwebtoken = require('jsonwebtoken')
const util = require('util')
const crypto = require('crypto')

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
    await ctx.render('index', {
      name: '彭小呆'
    })
  })
  .get('/sign-in', async ctx => {
    ctx.set('cache-control', 'public, max-age=3600')
    await ctx.render('sign')
  })
  .post('/sign-up', async ctx => {
    const { email, password } = ctx.request.body

    let result = null
    if(email && password) {
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
    // ctx.redirect(`/?msg=1`)
    // ctx.status = 301
    ctx.body = result
  })


router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  const pwdmd5 = cryptPwd(password)
  // const checkUser = username == USER.username && pwdmd5 == USER.password
  const checkUser = true
  if (checkUser) {
    ctx.body = {
      code: 200,
      msg: '登录成功',
      token: jsonwebtoken.sign(
        { name: USER.username, id: USER.id },
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