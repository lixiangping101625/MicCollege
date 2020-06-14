//app.js
var app = getApp()
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("code: " + res.code);
        //赋值到全局code
        that.globalData.code = res.code;
        var userInfo1 = getApp().globalData.userInfo;

        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                withCredentials: true,
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId

                  console.log("encryptedData: " + res.encryptedData)
                  console.log("iv: " + res.iv)

                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }

                }
              })
              console.log('用户已授权');

            } else {
              //未授权，跳转到授权页面
              wx.showModal({
                title: '提示',
                content: '您还未授权，授权后体验更好!',
                showCancel: false,
                cancelText: '',
                cancelColor: '',
                confirmText: '去授权',
                confirmColor: '',
                success: function(res) {
                  wx.redirectTo({
                    url: '/pages/auth/auth',
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                  })
                },
                fail: function(res) {},
                complete: function(res) {},
              })
            }
          }
        })
      }
    })


  },
  
  globalData: {
    userInfo: null,
    rank_arr: [],
    encryptedData: '',
    iv: '',
    code: '',
    photo: '',
    nick: '',
    userId: '',
    openid: '',
    host: 'http://localhost:80',
    // host: 'http://college.gsgkzyl.com:8080',
    
    // host: 'http://47.114.74.130:8080/college',
    // host: "https://www.gsgkzyl.com/gsgkzyl",
  }
})