// scorelines/scoreline/scoreline.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school_lines: [],
    profession_lines: [],

    show_loading: 0,//加载标志
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    if (options.curr_profession_id.length === 0) {
      that.setData({
        show_loading: 1
      })
      wx.request({
        url: getApp().globalData.host + '/line/school/' + options.curr_school_id + "/" + options.genera,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res.data)
          if (res.statusCode === 200) {
            if (res.data.status === 0) {
              that.setData({
                school: res.data.data.school,
                school_lines: res.data.data.list,
              })
            } else {
              wx.showToast({
                title: '系统异常！',
              })
            }
          } else {
            wx.showToast({
              title: '请求异常！',
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { 
          that.setData({
            show_loading: 0
          })
        },
      })

    } else if (options.curr_profession_id.length === 32) {
      that.setData({
        show_loading: 1
      })
      wx.request({
        url: getApp().globalData.host + '/line/school/' + options.curr_school_id + "/" + options.genera + "/" + options.curr_profession_id,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res.data)
          console.log(res.data)
          if (res.statusCode === 200) {
            if (res.data.status === 0) {
              that.setData({
                school: res.data.data.school,
                profession: res.data.data.profession,
                school_lines: res.data.data.school_line_list,
                profession_lines: res.data.data.profession_line_list,
              })
            } else {
              wx.showToast({
                title: '系统异常！',
              })
            }
          } else {
            wx.showToast({
              title: '请求异常！',
            })
          }
        },
        fail: function (res) { },
        complete: function (res) {
          setTimeout(function(){
            that.setData({
              show_loading: 0
            })
          },2000)
         },
      })

    }
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
  /**跳转到视频课 */
  video_class: function () {
    wx.switchTab({
      url: '/pages/video_class/video_class',
      complete: (res) => { },
      fail: (res) => { },
      success: (result) => { },
    })
  },

})