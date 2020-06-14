// pages/tools/tools.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_height: 0,
    arr: [],//动态数据
    noun_arr: [],//名词数据
    explanation: '',//具体解释


  },
  search:function() {
    wx.showToast({
      title: '暂不支持搜索',
      duration: 1200,
      icon: 'success',
      mask: true,
    })
  },
  detail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/zhiyuan_dynamic_detail/zhiyuan_dynamic_detail?id='+id,
      complete: (res) => {},
      fail: (res) => {},
      success: (result) => {},
    })
  },
  /**点击查看名词解释 */
  show_detail: function (e) {
    this.calculate_detail_height()
    this.setData({
      show_larger: 1,
    })
    //遍历noun_arr，获取解释
    var noun_arr = this.data.noun_arr
    for (var i = 0; i < noun_arr.length; i++) {
      if (noun_arr[i].id === e.currentTarget.dataset.id) {
        this.setData({
          explanation: noun_arr[i].explanation
        })
        break;
      }
    }
  },
  /**关闭窗口 */
  closer: function () {
    this.setData({
      show_larger: 0
    })
  },
  /**计算高度 */
  calculate_detail_height: function () {
    let screenHeight = wx.getSystemInfoSync().windowHeight
    this.setData({
      detail_height: screenHeight
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_zhiyuan_dynamic()
    this.get_zhiyuan_noun()
  },

  /**获取数据 */
  get_zhiyuan_dynamic: function () {
    let that = this
    wx.request({
      url: getApp().globalData.host + '/zhiyuan/dynamic/list/1/7',
      data: '',
      header: {
        // "content-type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            arr: res.data.data.list
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  /**获取数据 */
  get_zhiyuan_noun: function () {
    let that = this
    wx.request({
      url: getApp().globalData.host + '/zhiyuan/noun/list',
      data: '',
      header: {
        // "content-type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            noun_arr: res.data.data
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },

  /**跳转到视频课 */
  video_class: function () {
    wx.navigateTo({
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

  }
})