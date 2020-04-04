const { model } = require('mongoose')
const CatSchema = require('./schema/cat')
const UserSchema = require('./schema/user')

const Cat = model('Cat', CatSchema)
const User = model('User', UserSchema)

module.exports = {
  Cat,
  User
}