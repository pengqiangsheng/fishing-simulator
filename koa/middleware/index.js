const debug = require('debug')('app:custom-middleware')

const simpleErrorHandler = () => async (ctx, next) => {
  const error = `${ctx.status}`
  if(error.startsWith('4') || error.startsWith('5')) {
    debug('error-handler:', error)
    ctx.body = {
      code: ctx.status,
      msg: '抱歉出错了'
    }
  }
  await next()
}

const interceptToken = () => async (ctx, next) => next().catch((err) => {
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

module.exports = {
  simpleErrorHandler,
  interceptToken
}