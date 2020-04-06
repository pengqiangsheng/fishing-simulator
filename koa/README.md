# Koa + redis + mongodb

## 项目结构
项目结构
|---------------------|
|-- middleware 中间件
|-- mock 数据生成
|-- module 路由模块
|-- mongoose 数据库model
|-- public 静态资源
|-- router 路由控制器
|-- template 模板
|-- tools 工具
|-- app.js 入口文件
|---------------------|

## 更新说明
[更新说明](./history.md)

## 运行说明
- 1.安装mongodb、redis数据库（端口默认）
- 2.安装项目所有依赖
- 3.`yarn dev`: 以开发环境下运行
- 4.`yarn start`: 以生产环境下运行

## 环境说明

> 本项目分为开发环境和生产环境两种

异同点：

- 1.拥有相同的日志输出
- 2.token验证仅在生产环境生效

## 开发说明

### 路由开发

> 在`module`文件下开始开发你的第一个接口

```js
const { Cat } = require('../mongoose')
// 首页
module.exports = async (ctx, result) => {
	// 从数据库中查找所有cat
	const data = await Cat.fetch()
	// 返回结果
  result.set({
    code: 200,
    msg: '查询成功',
    data
  })
}
```
路由开发规范：
- 1.路由名称将会以文件名命名
- 2.文件名格式：小写单词 + 下划线连接
- 3.路由会自动添加前缀`/api`,

例如:
- 上述文件 `test.js` 映射到项目的路由将变成`/api/test`
- `find_cat.js` ===> `/api/find/cat`
- `get_cat_data.js` ===> `/api/get/cat/data`

注意：所有路由都以`post`形式，所以你需要安装`postman软件`去测试你的接口。

### 数据层model 开发

> 在`mongoose/schema`文件夹下开发。

schema文件开发规范：
- 1.文件名用小写驼峰表示：猫类 ==> cat.js 灰猫类 ==> grayCat.js
- 2.实例化类名单词开头大写表示：`const CatSchema = new Schema()`

schema是什么？
> 什么？你不会，没关系 [mongoose文档](http://www.mongoosejs.net/)

```js
// cat.js
// 引入 mongoose库下的Schema类
const { Schema } = require('mongoose')
// 引入debug模块做日志输出
const debug = require('debug')('app:cat-schema')

const CatSchema = new Schema({
  name: String,
  desc: String,
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

// 输出日志
debug('CatSchema 初始化')
// 将会如下形式输出
// app:cat-schema CatSchema 初始化

// 模块导出
module.exports = CatSchema
```

### 日志输出规范

> 以上述`cat.js` 说明

```js
// cat.js
const debug = require('debug')('app:cat-schema')
debug('hello, world')
```

步骤如下：

- 1.首先引入debug模块，然后在后面加上本文件前缀`app:cat-schema`
- 2.注意前缀统一格式为：`app:` + 本文件简短描述（小写单词连接用中划线）
- 3.`debug(msg)` msg为anything（字符串、对象、变量、甚至是方法...）


