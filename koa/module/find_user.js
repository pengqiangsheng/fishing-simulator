const { Cat } = require('../mongoose')

// 首页
module.exports = () => {
  return async ctx => {
    const data = await Cat.findByName('11')
    ctx.body = data || {
      code: -1,
      msg: 'no find'
    }
  }
}

// const kitty = new Cat({
//   name: 'kitty1',
//   desc: 'I am a cute cat.'
// })
// (async function() {
//   try {
//     const kitty = await kitty.findByName('kitty')
//     debug(kitty)
//   }catch(err) {
//     debug(err)
//   }
// })()
// const newKitty = {
//   name: 'new kitty',
//   desc: 'I a new kitty'
// }
// Cat.findByName('kitty').then(data => {
//   debug('findeByName', data)
//   Cat.updateOne({ _id: data._id }, newKitty, (err, row) => {
//     err && debug(err)
//     debug(row)
//   })
//   // _kitty.save()
// })
// Cat.updateMany({ name: 'kitty1' }, newKitty)
//   .then((err, row) => {
//     err && debug(err)
//     debug(row)
//   })
// kitty.save().then(kitty => debug('save ', kitty._id, 'in mongodb.'))
// const Cat = mongoose.model('Cat', { name: String })
// const kitty = new Cat({ name: 'Zildjian' })
// kitty.save().then(kitty => debug('save', kitty))
