// pages/video_class/video_class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counterend: false,//计时器结束标志
    fill_skill_list: [],//填报技巧
  },

  switch2GK:function(){
    wx.switchTab({
      url: '../home/home',
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
    this.fill_skills();
  },

  counterend:function(){
    this.setData({
      counterend: true
    })
  },

  /**tb技巧列表 */
  fill_skills: function () {
    const that = this;
    wx.request({
      url: getApp().globalData.host + '/fillskill/all',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if (res.statusCode === 200 && res.data.status === 0) {
          var skillVOs = res.data.data; //数组
          that.setData({
            fill_skill_list: skillVOs
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
    let that = this
    setTimeout(function () {
      that.setData({
        zindex: -999
      })
    }, 2000)

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
    // wx.showNavigationBarLoading()
    // wx.startPullDownRefresh();
    this.onLoad()
    setTimeout(() => {
      // wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
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