// pages/auth/auth.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    getUserInfo: false,
    userInfo: {},
  },
  //授权
  onAuth() {
    wx.showLoading({
      title: '授权中...',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    let that = this;
    wx.getSetting({
      success: (res) => {

        //用户授权
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              const userInfo = res.userInfo
              const nickName = userInfo.nickName
              const avatarUrl = userInfo.avatarUrl
              const gender = userInfo.gender // 性别 0：未知、1：男、2：女
              const province = userInfo.province
              const city = userInfo.city
              const country = userInfo.country


              // console.log(res)
              // console.log("encryptedData: " + res.encryptedData)
              // console.log("iv: " + res.iv)
              // console.log("code: " + getApp().globalData.code)
              // console.log("photo: " + res.userInfo.avatarUrl)
              getApp().globalData.userInfo = res.userInfo;
              getApp().globalData.encryptedData = res.encryptedData;
              getApp().globalData.iv = res.iv;
              getApp().globalData.headphoto = res.userInfo.avatarUrl;
              getApp().globalData.nick = res.userInfo.nickName;
              that.setData({
                getUserInfo: true,
                userInfo: res.userInfo
              })

              wx.setStorage({
                key: 'nick',
                data: nickName,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
              wx.setStorage({
                key: 'headPhoto',
                data: avatarUrl,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })

              var params = {
                encryptedData: getApp().globalData.encryptedData,
                iv: getApp().globalData.iv,
                code: getApp().globalData.code,
                headphoto: getApp().globalData.headphoto,
              }
              //插入数据库
              var url = getApp().globalData.host + '/user/wxregister';
              wx.request({
                // url: '192.168.1.121:8090/user/wxregister',
                url: getApp().globalData.host + '/user/wxregister',
                data: params,
                // header: {},
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {
                  // console.log(res)
                  if (res.data.status == 0) {
                    var logs = wx.getStorageSync('logs') || []
                    logs.unshift(Date.now() + '用户已授权')
                    wx.setStorageSync('logs', logs)
                    //为userId赋值
                    // console.log(getApp().globalData.userId);
                    getApp().globalData.userId = res.data.data.id;
                    getApp().globalData.openid = res.data.data.wx_open_id;
                    // console.log(getApp().globalData.userId);
                    // console.log(getApp().globalData.openid);

                    let openid = res.data.data.wx_open_id;
                    let userid = res.data.data.id;

                    wx.setStorage({
                      key: 'user_open_id',
                      data: openid,
                    })
                    wx.setStorage({
                      key: 'userId',
                      data: userid,
                    })

                    //500毫秒后跳转到首页
                    setTimeout(function() {
                      wx.switchTab({
                        url: '/pages/video_class/video_class',
                      })
                    }, 1000)
                  } else {
                    wx.showLoading({
                      title: '授权失败',
                      mask: true,
                    })
                    setTimeout(function() {
                      wx.hideLoading();
                    }, 400)
                  }
                },
                fail: function(res) {
                  console.log('失败');
                },
                complete: function(res) {
                  wx.hideLoading();
                },
              })

            }
          })

        } else if (!res.authSetting['scope.userInfo']) { //用户拒绝授权
          var logs = wx.getStorageSync('logs') || []
          logs.unshift(Date.now() + '用户未授权')
          wx.setStorageSync('logs', logs)

          wx.getUserInfo({
            success(res) {
            },
            fail(res) {
            }
          })
        }
      }

    })
    wx.hideLoading();
  },

  onLoad: function() {

  }

})