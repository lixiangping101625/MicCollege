// pages/video_class/video_class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_guanggao: 0,
    videoArr: Array,
    vedio_src: '',
    index: 1,

    counterend: false,//计时器结束标志
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
    this.top8();
  },
  counterend:function(){
    this.setData({
      counterend: true
    })
  },
  play: function (e) {
    var video_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../video_detail/video_detail?id=' + video_id,
    })
  },
  back: function () {
    //暂停播放
    var videoContextPrev = wx.createVideoContext('video')
    videoContextPrev.pause()
  },

  /**获取8个热播视频 */
  top8: function () {
    const that = this;
    wx.request({
      url: getApp().globalData.host + '/video/top8',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if (res.statusCode === 200 && res.data.status === 0) {
          var videoArr = res.data.data; //数组
          that.setData({
            videoArr: videoArr,
          })
          wx.lin.renderWaterFlow(that.data.videoArr, false ,()=>{
            console.log('渲染成功')
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
        show_guanggao: 0,
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

  top_tap: function (e) {
    this.setData({
      index: e.currentTarget.dataset.id
    })
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