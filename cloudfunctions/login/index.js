
const cloud = require('wx-server-sdk')

// 初始化 cloud 可配置环境
cloud.init() 

/**
 * 
 * event 参数包含小程序端调用传入的 data
 */
exports.main = (event, context) => {
  console.log('event', event)
  console.log('context', context)

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
