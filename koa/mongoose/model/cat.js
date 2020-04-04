const { model } = require('mongoose')
const CatSchema = require('../schema/cat')
const Cat = model('Cat', CatSchema)

module.exports = Cat