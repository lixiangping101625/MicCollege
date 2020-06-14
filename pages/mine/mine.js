// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_xuanchuan: 0,
  },

  perfect_info: function (e) {
    wx.navigateTo({
      // url: '../perfect_info/perfect_info?user_id=' + e.currentTarget.dataset.idx,
      url: '../perfect_info/perfect_info?user_id=' + e.currentTarget.dataset.idx + '&pass_by_regist=0',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  show_jieshao:function(){
    this.setData({
      is_xuanchuan: 1
    })
  },

  close: function () {
    this.setData({
      is_xuanchuan: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowHeight = wx.getSystemInfoSync().windowHeight
    this.setData({
      windowHeight: windowHeight
    })
  },
  /**跳转到视频课 */
  video_class: function () {
    wx.switchTab({
      url: '../video_class/video_class',
      complete: (res) => { },
      fail: (res) => { },
      success: (result) => { },
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

  },

})