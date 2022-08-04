//app.js
App({
  globalData: {
    openid: '',
    fileID: '',
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力') // 云开发能力从基础库 2.2.3 开始支持
    } else {
      // function init(options): void
      wx.cloud.init({
        env: 'yunid', // 环境
        // env: 'test1-id', // 环境
        traceUser: true, // 是否在将用户访问记录到用户管理中，在控制台中可见
      })
      this.getOpenid()
    }
  },

  getOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('res: ', res)
        this.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('error', err)
      }
    })
  },
  
})
