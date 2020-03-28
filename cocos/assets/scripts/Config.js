// 获取全局状态配置
const config = require('App')

// Store仓库
const StoreClass = require('Store')
const store = new StoreClass(config)

// Http请求
const http = require('Http')

// 事件中心
const EventDispatcher = require('EventDispatcher')
const event = EventDispatcher.getInstance()

// Store仓库
const DataStore = require('DataStore')
const { state } = new DataStore({
  state: {
    name: 'rock',
    obj: {
      name: 'pqs'
    },
    list: []
  },
  // 观察者
  watcher: {
    // 监听name属性变化
    name: val => {
      console.log('name改变了:', val)
    },
    obj: val => {
      console.log('obj改变了:', val)
    },
    list: val => {
      console.log('list改变了:', val)
    }
  }
})

state.obj.name = 1


module.exports = {
  store,
  state,
  event,
  http,
  mapState: store.mapState,
  mapGetters: store.mapGetters,
  mapMutations: store.mapMutations,
  mapActions: store.mapActions,
}