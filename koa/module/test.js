// 测试
module.exports = async (ctx, result) => {
  result.set({
    code: 200,
    msg: '操作成功',
    data: {
      path: '/api/test'
    }
  })
}
