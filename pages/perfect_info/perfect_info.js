// pages/perfect_info/perfect_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pass_by_regist: 0,//1--注册redirect进入  0---其他页面navigate
    pay_success: 0,//修改需付费  0--未支付  1--已支付修改费用

    total_score: 0,
    yw: 0,
    sx: 0,
    yy: 0,
    //wen
    ls: 0,
    dl: 0,
    zz: 0,
    //genera default 0--wen
    genera: 0,
    //li
    sw: 0,
    wl: 0,
    hx: 0,

    //gender、mobile
    gender: 1,
    mobile:''
  },

  submit_form: function () {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
        var param = {};
        if (that.data.genera == 0) {
          param = {
            total_score: that.data.total_score,
            user_id: that.data.user_id,
            yw: that.data.yw,
            sx: that.data.sx,
            yy: that.data.yy,
            //wen
            ls: that.data.ls,
            dl: that.data.dl,
            zz: that.data.zz,
            genera: that.data.genera,
            //mobile、gender
            gender: that.data.gender,
            // mobile: '',
          }
        }
        if (that.data.genera == 1) {
          param = {
            total_score: that.data.total_score,
            user_id: that.data.user_id,
            yw: that.data.yw,
            sx: that.data.sx,
            yy: that.data.yy,
            genera: that.data.genera,
            sw: that.data.sw,
            wl: that.data.wl,
            hx: that.data.hx,
            //mobile、gender
            gender: that.data.gender,
            // mobile: '',
          }
        }
        console.log('请求参数：' + param)
        //Verify required items
        if (that.data.genera == 0) {
          if (param.total_score === 0 || param.yw === 0 || param.sx === 0 ||
            param.yy === 0 || param.ls === 0 || param.dl === 0 || param.zz === 0) {
            wx.showModal({
              title: 'Tips',
              content: '成绩为必填项，请检查填写！',
              showCancel: false,
              confirmText: '确定',
            })
            return;
          }
        }
        if (that.data.genera == 1) {
          if (param.total_score === 0 || param.yw === 0 || param.sx === 0 ||
            param.yy === 0 || param.sw === 0 || param.wl === 0 || param.hx === 0) {
            wx.showModal({
              title: 'Tips',
              content: '成绩为必填项，请检查填写！',
              showCancel: false,
              confirmText: '确定',
            })
            return;
          }
        }
        wx.showModal({
          title: '提示',
          content: '为防恶意盗刷，请确保成绩输入无误。确定提交吗？',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '',
          confirmText: '提交',
          confirmColor: '',
          success: function(res) {
            if(res.confirm){
              wx.showLoading({
                title: '提交中...',
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
              wx.request({
                url: 'http://' + getApp().globalData.host + '/user/perfect',
                data: param,
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: function (res) {
                  console.log(res)
                  if (res.statusCode == 200 && res.data.status == 0) {
                    wx.switchTab({
                      url: '../home/home',
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  }
                },
                fail: function (res) { },
                complete: function (res) {
                  wx.hideLoading();
                },
              })
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    

  },

  /**all Below is input events  */
  input_total: function(e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      total_score: v2
    })
  },
  input_yw: function(e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      yw: v2
    })
  },
  input_sx: function(e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      sx: v2
    })
  },
  input_yy: function(e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      yy: v2
    })
  },
  input_ls: function(e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      ls: v2
    })
  },
  input_dl: function(e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      dl: v2
    })
  },
  input_zz: function (e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      zz: v2
    })
  },
  input_sw: function (e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      sw: v2
    })
  },
  input_wl: function (e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      wl: v2
    })
  },
  input_hx: function (e) {
    var v1 = e.detail.value;
    var v2 = parseFloat(v1).toFixed(2)
    console.log(v2)
    this.setData({
      hx: v2
    })
  },

  /***genera change event：0-wen 1-li */
  genera_change: function(e) {
    console.log(e.detail.value)
    this.setData({
      genera: e.detail.value
    })
  },
  /***genera change event：0-wen 1-li */
  gender_change: function(e) {
    console.log(e.detail.value)
    this.setData({
      gender: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pass_by_regist: options.pass_by_regist
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
        wx.request({
          url: 'http://' + getApp().globalData.host + '/user/userinfo/' + that.data.user_id,
          data: '',
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(res)
            if(res.statusCode==200 && res.data.status==0){
              var user = res.data.data;

              if (user != undefined && user.genera==1){//文科
                that.setData({
                  total_score: user.total_score,
                  yw: user.yuwen,
                  sx: user.shuxue,
                  yy: user.yingyu,
                  //genera default 0--wen
                  genera: 1,
                  sw: user.shengwu,
                  wl: user.wuli,
                  hx: user.huaxue,
                  gender: user.gender
                })
              }
              if (user !=undefined && user.genera==0){//文科
                that.setData({
                  total_score: user.total_score,
                  yw: user.yuwen,
                  sx: user.shuxue,
                  yy: user.yingyu,
                  //genera default 0--wen
                  genera: 0,
                  ls: user.lishi,
                  dl: user.dili,
                  zz: user.zhengzhi,
                  gender: user.gender
                })
              }
            }else{
              wx.showToast({
                title: '获取失败，请稍后再试!',
                icon: '',
                image: '',
                duration: 2000,
                mask: true,
              })
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {
        console.log(111)
      },
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})