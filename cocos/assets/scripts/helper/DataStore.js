class Store {
  constructor({ state, watcher }) {
    // 状态
    this.state = {};
    // 观察者
    this.watcher = watcher || {}
    // 初始化
    this.initState(state)
  }
  // 观察者
  observe = (_name, val, key) => {
    normalizeMap(this.watcher).forEach(({ type: fn, key: name }) => {
      console.log(_name + ' change:' + key)
      // 触发观察变量改变事件
      if(_name === name) {
        typeof fn === 'function' && fn(val)
      }
    })
  }
  // 初始化State
  initState = (opts) => {
    Object.keys(opts).forEach(key => {
      let value = opts[key]

      Object.defineProperty(this.state, key, {
        set: val => {
          value = val
          this.observe(key, val)
        },
        get: () => value
      })
      // if(isObject(value)) {
      //   this.definedState(key, value)
      // }
    })
  }

  definedState = (name, obj) => {
    console.log(name)
    console.log(this.state[name])
    Object.keys(obj).forEach(key => {
      let value = obj[key]
      Object.defineProperty(this.state[name], key, {
        set: val => {
          value = val
          this.observe(name, val, key)
        },
        get: () => value
      })
    })
  }
}

function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, type: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, type: map[key] }); })
}

function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

module.exports = Store

