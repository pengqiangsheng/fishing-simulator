const fs = require('fs')
const { resolve } = require('path')

class DB {
  constructor(path) {
    this.path = resolve(__dirname, 'data/' + path + '.md')
    console.log(this.path)
  }

  find = (name = '') => {
    const buffer = this.read()
    const data = buffer.split('\n').slice(0, -1).map(str => {
      const [ username, password ] = str.split(' ')
      return {
        username,
        password
      }
    })
    if(!name) return data
    return data.filter(({ username }) => username === name)
  }

  read = () => {
    return fs.readFileSync(this.path, 'utf-8')
  }

  insert = ({ username, password }) => {
    let result = this.find(username)
    if(!result.length) {
      fs.appendFileSync(this.path, username + ' ' + password + '\n')
      result = 1
    }else {
      result = 0
    }
    return result
  }

  remove = (name) => {
    const data = this.find(name)
    const index = data.findIndex(({ username }) => username === name)
    if(index > -1) {
      data.splice(index, 1)
      const buffer = data.reduce((r, i) => {
        return `${r.username} ${r.password}` + '\n' + `${i.username} ${i.password}` + '\n'
      })
      fs.writeFileSync(this.path, buffer)
      return 1
    }
    return 0
  }
}

// new DB('account')
// console.log('-------')
module.exports = DB
