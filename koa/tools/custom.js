// import Exif from 'exif-js'

// /**
//  * 获取图片自身的角度信息
//  * @param {File} file 文件
//  * @param {String} tag 标签
//  * @return {Number} or 角度信息
//  * or信息：   6  1  3  8
//  * 对应角度：-90 0 180 90
//  */
// const getImageTag = (file, tag) => {
//   if (!file) return 0
//   return new Promise((resolve) => {
//     /* eslint-disable func-names */
//     // 箭头函数会修改this，所以这里不能用箭头函数
//     Exif.getData(file, function () {
//       const o = Exif.getTag(this, tag)
//       resolve(o)
//     })
//   })
// }

/**
 * @desc 将base64的图片转为文件流
 * @param {String} dataUrl base64数据
 * @return {Object} 文件流
 */
const dataURLtoFile = (dataUrl) => {
  const filename = `img-${Date.now()}`
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// 下载文件流，要设置请求头{responseType: 'blob'}属性
function downFile(res, fileName = null) {
  if (fileName === null) {
    fileName = decodeURI(res.headers['content-disposition'].split('=')[1])
  }
  const type = res.headers['content-type']
  const blob = new Blob([res.data], { type })
  var oa = document.createElement('a')
  var href = URL.createObjectURL(blob)
  oa.href = href
  oa.download = fileName
  document.body.appendChild(oa)
  oa.click()
  document.body.removeChild(oa)
  window.URL.revokeObjectURL(href)
}

// 下载图片(触发a事件)
const downImg = (stream, name) => {
  let a = document.createElement("a");
  let event = new MouseEvent("click");
  a.download = name || "photo.png";
  a.href = stream;
  a.dispatchEvent(event);
  a = null;
}
// 从canvas下载图片
const fromCanvasDownload = name => {
  const canvas = document.querySelector('canvas');
  const url = canvas.toDataURL('image/jpg');
  downImg(url, name)
}
// 从一个链接下载图片
const fromUrlDownload = (imgUrl, name) => {
  const image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous");
  image.src = imgUrl;
  image.onload = function() {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    const url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    downImg(url, name)
  };
}

const setTitle = title => document.title = title
const createEl = label => document.createElement(label)
const addEl = (el, target = document.body) => target.appendChild(el)
const removeEl = (el, target = document.body) => target.removeChild(el)
const findEl = css => document.querySelector(css)

const debounce = (fn, delay = 100) => {
  let timer
  return function() {
    if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        fn.apply(this, arguments)
      }, delay)
  }
}

const throttle = (fn, delay = 100) => {
  let timer
  return function() {
    !timer && (timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(this, arguments)
    }, delay))
  }
}

// 深度拷贝(symbol, function 等除外)
const deepClone = obj => JSON.parse(JSON.stringify(obj))


// 区分单双击
const diffTapAndDbTap = (function() {
  let firstTap = 0
  let tapLock = 0
  let exeDbTap = 0
  return function(funcTap, funcDoubleTap, event) {
    if(1 == exeDbTap) { // 如果双击事件执行过，那么重置所有状态位
      firstTap = 0
      tapLock = 0
      exeDbTap = 0
    }

    if(firstTap == 0) { // 0代表单击状态位
      firstTap = 1
      setTimeout(function() {
        if(tapLock == 0) { // 单击没有被锁住，则执行单击事件
          funcTap(event)
        }
        firstTap = 0
      }, 200)
      return
    }

    if(firstTap == 1) { // 1代表单击状态位
      tapLock = 1 // 锁住单击事件
      funcDoubleTap(event)
      exeDbTap = 1 // 表示双击事件已经执行过
    }
  }
})()

// compose函数 从右至左交付结果给下一个函数
// 实现方式：reduce
// 反向：1.reduceRight 2.funs.reverse()
const compose = (...funs) => {
  const { length } = funs
  if(!length) return (...args) => args
  if(length === 1) return funs[0]
  return funs.reduce((a, b) => (...args) => a(b(...args)))
}

// 反向compose
// 实现方式：闭包+循环
const composeReverse = (...funs) => {
  let { length } = funs
  funs = funs.reverse()
  return (...args) => {
    let result =  length > 0 ? funs[--length].apply(this, args) : args
    while(length) {
      result = funs[--length].call(this, result)
    }
    length = null
    return result
  }
}

// 反向compose实现2
// 闭包 + 递归
const composeReverse2 = (...funs) => {
  let { length } = funs
  let result
  funs = funs.reverse()
  console.log(funs)
  return function fn(...args) {
    if(funs.length === 0) return args
    if(length === 0) return result
    result = funs[--length].apply(this, args)
    return fn(result)
  }
}

// 函数柯里化
const curry = (fn, ...args1) => (...args2) => fn.apply(null, [...args1, ...args2])

// 自定义实现call, bind, apply
const selfChangeCtx = () => {
  Function.prototype._call = function(...args){
    const ctx = args.shift() || window
    ctx.fn = this
    const result = ctx.fn(...args)
    delete ctx.fn
    return result
  }
  Function.prototype._apply = function(context, ...args){
    const ctx = context || window
    ctx.fn = this
    const result = args.length ? ctx.fn(...args[0]) : ctx.fn()
    delete ctx.fn
    return result
  }
  Function.prototype._bind = function(...args1){
    const ctx = args1.shift() || window
    const fn = this
    return (...args2) => fn._call(ctx, ...[...args1, ...args2])
  }
}


// 防抖 节流 深拷贝 compose
export {
  debounce,
  throttle,
  deepClone,
  curry,
  compose,
  composeReverse,
  composeReverse2,
  diffTapAndDbTap,
  selfChangeCtx
}

// DOM 操作有关
export {
  setTitle,
  createEl,
  addEl,
  removeEl,
  findEl
}

// 下载相关
export {
  fromCanvasDownload,
  fromUrlDownload,
  downFile,
  downImg
}

// 图片处理相关
export {
  getImageTag,
  dataURLtoFile
}
