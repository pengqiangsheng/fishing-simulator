module.exports = class {
  constructor() {
    this.init({})
  }
  init = ({ code, msg, data}) => {
    this.code = code || -1
    this.msg = msg || '接口错误'
    this.data = data || {}
  }
  set = (...args) => {
    if(args.length === 0) {
      throw new Error('参数错误')
    }
    if(args.length === 1 && typeof(args[0]) === 'object') {
      this.init(args[0])
    }
    if(args.length === 2) {
      this[args[0]] = args[1]
    }
  }
  format = () => ({
    code: this.code,
    msg: this.msg,
    data: this.data
  })
}