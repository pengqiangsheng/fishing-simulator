const { Schema } = require('mongoose')
const debug = require('debug')('app:move-schema')

const MoveSchema = new Schema({
  move: String,
  type: String,
  from: String,
  creator: String,
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
MoveSchema.pre('save', function (next) {
	if (this.isNew) {
		debug('新增', this)
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else {
		debug('修改', this)
		this.meta.updateAt = Date.now()
	}
	next()
})

MoveSchema.statics = {
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

module.exports = MoveSchema
