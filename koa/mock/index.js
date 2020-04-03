const debug = require('debug')('app:mock')

const generateArr = (len, id = 0) => {
  const arr = []
  for(let i = 0; i < len; i++) {
    arr.push({
      id: id * 10 + i,
      name: `节点${id * 10 + i}`
    })
  }
  return arr
}

const generateTree = (deep, root) => {
  if(deep === 10) { return }
  const children = generateArr(10, root.id)
  root.children = children
  deep++
  generateTree(deep, root.children[0])
  generateTree(deep, root.children[1])
  // generateTree(deep, root.children[2])
}
const root = {
  id: 001,
  name: 'root',
  data: generateArr(10000, 0)
}
console.time()
// generateTree(0, root)
const fs = require('fs')
fs.writeFile('big-data.json', JSON.stringify(root), (err) => {
  err && console.log(err)
  console.log("数据写入成功！")
  console.timeEnd()
})