// pages/product_intro_deatail/product_intro_deatail.js
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    introduce: {},
    introduce_items: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.introduce_id)
    const that = this;
    wx.request({
      url: getApp().globalData.host + '/introduce/detail/' + options.introduce_id,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.data.data)
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            introduce: res.data.data.introduce,
            introduce_items: res.data.data.introduceItems
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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