const fs = require('fs')
const { model } = require('mongoose')
const { join } = require('path')
const debug = require('debug')('app:schema')

debug('============ Generate Schema ============')
const obj = {}
fs.readdirSync(join(__dirname, './schema')).reverse().forEach(file => {
  if(!file.endsWith('.js')) return
  file = file.replace(/\.js$/i, '')
  const modelName = file.charAt(0).toUpperCase() + file.slice(1)
  const schema = require(`./schema/${file}`)
  obj[modelName] = model(modelName, schema)
})
debug('schema result:', obj)
debug('============  Generate End   ============')

module.exports = obj