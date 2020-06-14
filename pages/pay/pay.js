// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1
  },

  wx_pay: function () {
    let that = this;
    var openid = getApp().globalData.openid;
    console.log("openid: " + openid);

    //1次签名
    wx.request({
      url: getApp().globalData.host + '/weixin/Placeanorder/' + openid,
      data: {
        // encryptedData: res.encryptedData,
        // iv: res.iv,
        // code: res.code
        // openid:'oThf74k_zhLnEvQJdc0Q4P5H2cYU'
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("下单数据： " + res.data)
        //下单成功后支付
        if (res.data.status == 0) {

          //后台2次签名
          wx.request({
            url: getApp().globalData.host + '/weixin/twosign/' + openid,
            data: '',
            header: {
              'Content-Type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log(res)

              wx.requestPayment({
                timeStamp: res.data.data.timeStamp,
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.package,
                signType: res.data.data.signType,
                paySign: res.data.data.paySign,
                success: function (res) {
                  if (res.errMsg === 'requestPayment:ok') {//支付成功
                    wx.showModal({
                      title: '提示',
                      content: '感谢您对我们的信赖，祝您使用愉快！',
                      showCancel: false,
                      confirmText: '朕已阅',
                      success: function (res) {
                        if (res.confirm) {
                          wx.showLoading({
                            title: '正在跳转',
                            mask: true,
                            success: function (res) { },
                            fail: function (res) { },
                            complete: function (res) { },
                          })
                          setTimeout(function () {
                            wx.hideLoading();
                            wx.navigateBack({
                              delta: -1,
                            })
                          }, 500)
                        }
                      },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  } else if (res.errMsg === 'requestPayment:fail cancel') {//用户取消
                    wx.showModal({
                      title: '提示',
                      content: '检测到您已取消支付，建议开通（升级）会员，畅享使用！',
                      showCancel: false,
                      confirmText: '朕已阅',
                      confirmColor: '',
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  } else if (res.errMsg === 'requestPayment:fail(detail message)') {//支付失败
                    wx.showModal({
                      title: '提示',
                      content: '支付失败，建议稍后重新支付！',
                      showCancel: false,
                      confirmText: '朕已阅',
                      confirmColor: '',
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  }

                  // success requestPayment: ok 调用支付成功
                  // fail requestPayment: fail cancel 用户取消支付
                  // fail requestPayment: fail(detail message) 调用支付失败，其中 detail message 为后台返回的详细失败原因 
                  //
                },
                fail: function (res) {
                  console.log(res.data)
                },
                complete: function (res) { },
              })
            },
            fail: function (res) {
              console.log()
            },
            complete: function (res) { },
          })

          // var nonceStr= res.data.data.nonce_str;
          // var signType= "MD5";
          // var package1 = "prepay_id=" + res.data.data.prepay_id;
          // var paySign = res.data.data.sign;

        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 设置付款类型
   */
  setIndex: function (e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      index: e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})