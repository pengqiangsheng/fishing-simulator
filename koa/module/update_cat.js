const { Cat } = require('../mongoose')
const apicache = require('@pengqiangsheng/apicache')
const debug = require('debug')('app:cat-find-and-update')

module.exports = () => {
  return async ctx => {
    try{
      // 新增or修改 清除缓存分组cat
      apicache.clear('cat')
      const { query, name } = ctx.request.body
      if(!query || !name) {
        ctx.body = {
          code: 500,
          msg: '请求参数出错'
        }
        return
      } 
      const data = await Cat.findByName(query)
      debug('findeByName', data)
      if(!data) {
        ctx.body = {
          code: 500,
          msg: '数据库没有此条数据'
        }
        return
      }
      Object.assign(data, { name: name })
      data.save()
      ctx.body = {
        code: 200,
        msg: '更新成功'
      }
    }catch(err) {
      ctx.body = {
        code: 500,
        msg: err
      }
    }
  }
}