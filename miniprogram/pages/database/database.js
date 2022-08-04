// pages/databaseGuide/databaseGuide.js

const app = getApp()

Page({

  data: {
    memberId: '',
  },

  onLoad: function() {
    this.db = wx.cloud.database()
  },

  onAdd: function () {
    // const db = wx.cloud.database({
    //   env: 'test1-id'
    // }) 
    this.db.collection('members').add({ // 集合必须在云开发控制台中创建
      data: {
        name: '张三',
        age: 25,
        tag: [
          '程序员',
          '前端',
        ]
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          memberId: res._id,
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('新增记录成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
      }
    })
  },

  onQuery: function() {
    this.db.collection('members').where({
      // _openid: app.globalData.openid, 查询当前用户所有的 counters
      name: '张三'
    }).get({
      success: res => {
        console.log('查询记录成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },

  onUpdate: function() {
    this.db.collection('members').doc(this.data.memberId).update({
      data: {
        age: 30,
      },
      success: res => {
        console.log('更新记录成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '更新记录失败'
        })
      }
    })
  },

  onUpdateFromServer: function() {
    wx.cloud.callFunction({
      name: 'changeName',
      data: {
        memberId: this.data.memberId,
      },
      success: res => {
        console.log('通过云函数更新记录成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '通过云函数更新记录失败'
        })
      }
    })
  },

  onRemove: function() {
    if (this.data.memberId) {
      this.db.collection('members').doc(this.data.memberId).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            memberId: '',
          })
          console.log('删除记录成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  }

})