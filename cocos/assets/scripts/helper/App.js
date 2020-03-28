module.exports = {
  // 变量
  state: {
    name: 'rock',
    dollor: '300',
    count: 0
  },
  // 改变state中的状态
  mutations: {
    SET_NAME: (state, value) => {
      state.name = value
    },
    CHANGE_COUNT: state => {
      state.count += 1
    }
  },
  // 提交改变
  actions: {
    init: ({ commit }, value) => {
      commit('SET_NAME', value)
    },
    changeCount: ({ commit }) => {
      commit('CHANGE_COUNT')
    }
  },
  // 获取state中的属性
  getters: {
    name: state => {
      return state.name
    },
    count: state => state.count
  },
  // 观察者
  watcher: {
    // 监听name属性变化
    name: val => {
      console.log('name改变了:', val)
    }
  }
}
