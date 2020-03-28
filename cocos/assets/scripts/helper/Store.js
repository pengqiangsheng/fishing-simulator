class Store {
  constructor({ state, actions, mutations, getters, watcher }) {
    // 状态
    this.state = {};
    // 异步函数
    this.actions = actions || {};
    // 同步函数
    this.mutations = mutations || {};
    // 观察者
    this.watcher = watcher || {}
    // getters
    this.getters = {}
    // 初始化
    this.initState(state)
    // 初始化
    this.initGetters(getters)
  }
  // 观察者
  observe = (key, val) => {
    normalizeMap(this.watcher).forEach(({ type: fn, key: name }) => {
      // 触发观察变量改变事件
      if(key === name) {
        typeof fn === 'function' && fn(val)
      }
    })
  }
  // 调用 mutations 中的同步函数
  commit = (fun, ...args) => {
    if (fun) {
      this.mutations[fun].call(this, this.state, ...args)
    } else {
      return false
    }
  }
  // 调用 actions 中的异步函数
  dispatch = (fun, ...args) => {
    if (fun) {
      this.actions[fun].call(this, { commit: this.commit }, ...args)
    } else {
      return false
    }
  }
  // 初始化Getters
  initGetters = (opts) => {
    Object.keys(opts).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => opts[key](this.state),
        enumerable: true
      })
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
        get: () => value,
        enumerable: true
      })
    })
  }
  // 魔法函数
  mapState = (args) => {
    const res = {}
    if(!isValidMap(args)) {
      throw new Error('参数必须为Array 或者 Object!')
    }
    console.log(this.state)
    normalizeMap(args).forEach(({ type, key }) => {
      res[key] = typeof type === 'function'
      ? () => type(this.state)
      : () => this.state[type]
    })
    return res
  }
  // 魔法函数
  mapGetters = (args) => {
    const res = {}
    if(!isValidMap(args)) {
      throw new Error('参数必须为Array 或者 Object!')
    }
    normalizeMap(args).forEach(({ type, key }) => {
      if(this.getters.hasOwnProperty(type)) {
        res[key] = () => this.getters[type]
      }
    })
    return res
  }
  // 魔法函数
  mapMutations = (args) => {
    const res = {}
    if(!isValidMap(args)) {
      throw new Error('参数必须为Array 或者 Object!')
    }
    normalizeMap(args).forEach(({ type, key }) => {
      if(this.mutations.hasOwnProperty(type)) {
        res[key] = (...args) => this.commit(type, ...args)
      }
    })
    return res
  }
  // 魔法函数
  mapActions = (args) => {
    const res = {}
    if(!isValidMap(args)) {
      throw new Error('参数必须为Array 或者 Object!')
    }
    normalizeMap(args).forEach(({ type, key }) => {
      if(this.actions.hasOwnProperty(type)) {
        res[key] = (...args) => this.dispatch(type, ...args)
      }
    })
    return res
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

