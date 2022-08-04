建新环境需要10分钟才能正常调用


文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理


数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
database: 获取数据库引用，
collection: 获取集合引用
doc: 获取对一个记录的引用

云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码


Server API 不再接受回调（success, fail, complete），统一返回 Promise
Server 端有批量写和批量删除的权限，即可在集合或查询语句上调用 update 或 remove
Server 端独有 API 如创建集合（db.createCollection）

## 参考文档
https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html