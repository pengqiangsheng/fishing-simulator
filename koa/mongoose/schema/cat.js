const { Schema } = require('mongoose')
const event = require('../../tools/event')
const debug = require('debug')('app:cat-schema')
const { CAT, CLEARCACHE } = require('../../tools/constant')
const CatSchema = new Schema({
  name: String,
  desc: String,
	meta: {
		creatAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
	}
})

// save动作之前的动作
CatSchema.pre('save', function (next) {
	if (this.isNew) {
		debug('新增', this)
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else {
		debug('修改', this)
		this.meta.updateAt = Date.now()
	}
	event.emit(CLEARCACHE, CAT)
	next()
})

CatSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
  },
  findByName: function(name, cb) {
    return this
      .findOne({name: name})
      .exec(cb)
  }
}

module.exports = CatSchema
