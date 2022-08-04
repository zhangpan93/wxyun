//index.js
const app = getApp()

Page({
  data: {
    imgUrl: '',
},

  onLoad: function() {
  },

  // 上传图片
  doUpload: function () {
    console.log('图片上传成功111：', this)
    // 选择图片
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        
        const cloudPath = `${Date.now()}${Math.floor(Math.random(0, 1) * 10000000)}.png` //云路径，也是图片名字
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('图片上传成功：', res)
            app.globalData.fileID = res.fileID
          },
          fail: e => {
            console.error('error', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  doDownload: function () {
    wx.showLoading({
      title: '下载中',
    })
    wx.cloud.downloadFile({
      fileID: app.globalData.fileID,
      // config: {
      //   env: 'yunid', // 环境
      // }
      success: res => {
        console.log('图片下载成功：', res)
        this.setData({
          imgUrl: res.tempFilePath,
        })
      },
      fail: e => {
        console.error(e)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  doDownloadFromServer: function () {
    wx.showLoading({
      title: '下载中',
    })
    wx.cloud.callFunction({
      name: 'getFile',
      data: {
        fileID: app.globalData.fileID,
      },
      success: res => {
        console.log('通过云函数图片下载成功：', res)
        this.setData({
          imgUrl: res.result,
        })
      },
      fail: e => {
        console.error(e)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  doDelete: function () {
    wx.showLoading({
      title: '删除中',
    })
    wx.cloud.deleteFile({
      fileList: [app.globalData.fileID],
      success: res => {
        this.setData({
          imgUrl: '',
        })
      },
      fail: err => {
        console.error(e)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }

})
