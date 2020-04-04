const { Schema } = require('mongoose')
const debug = require('debug')('app:user-schema')

const UserSchema = new Schema({
  username: String,
  password: String,
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
UserSchema.pre('save', function (next) {
	if (this.isNew) {
		debug('新增')
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else {
		debug('修改')
		this.meta.updateAt = Date.now()
	}
	next()
})

UserSchema.statics = {
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
      .findOne({ username: name })
      .exec(cb)
  }
}

module.exports = UserSchema
