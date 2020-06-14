// pages/fill_skills_deatail/fill_skills_deatail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fillSkills: {},
    sectionEntities: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    // console.log(options.fill_id)
    const that = this;
    wx.request({
      url: getApp().globalData.host +'/fillskill/detail/'+options.fill_id,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data.data)
        if(res.statusCode==200 && res.data.status==0){
          that.setData({
            fillSkills: res.data.data.fillSkills,
            sectionEntities: res.data.data.sectionEntities
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
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