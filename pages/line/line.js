// pages/line/line.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 控制tab显示
     */
    show_yxtj: 1,//控制院校推荐展示
    show_zytj: 0,//控制专业推荐显示
    // show_zsjh: 0,
    /**
    * picker--省份
    */
    prov_index: 0,
    provinces: [],
    /**
     * picker--城市
     */
    city_index: 0,
    cities: [],

    //专业推荐方式
    reco_method: 2,//1-偏科，2-专业关键词
    //院校推荐相关数据
    genera: '0',
    curr_prov_id: '',
    curr_city_id: '',


    total_score: 0,//总分
    flow_score: 0.0,//浮动分数


  },
  inputscore: function (e) {
    let that = this
    console.log(e.detail.value)
    if (e.detail.value > 750) {
      wx.showModal({
        title: '提示',
        content: '总分不能超过750！',
        showCancel: false,
        success(res) {
          that.setData({
            total_score: 0
          })
        }
      })
    }else{
      this.setData({
        total_score: e.detail.value
      })
    }
  },
  inputflowscore: function (e) {
    console.log(e.detail.value)
    if (e.detail.value < -15 || e.detail.value > 15) {
      wx.showModal({
        title: '提示',
        content: '浮动范围上下不超过15分！',
        showCancel: false,
        success(res) {
          that.setData({
            flow_score: 0
          })
        }
      })
    }else{
      this.setData({
        flow_score: e.detail.value
      })
    }
  },


  /**
   * 高校推荐文理科radio
   */
  bindGeneraChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**推荐方式 */
  reco_method: function (e) {
    if (parseInt(e.detail.value) === 1) {
      this.setData({
        reco_method: 1
      })
    } else {
      this.setData({
        reco_method: 2
      })
    }
  },
  //获取省份
  get_provinces: function () {
    const that = this
    wx.request({
      url: getApp().globalData.host + '/province/list',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.status === 0) {
            //赋值
            var list = res.data.data

            var arr = []
            var prov = {}
            for (var i = 0; i < list.length; i++) {
              prov = {
                order_number: list[i].order_number,
                name: list[i].province_name,
                id: list[i].id
              }
              arr.push(prov)
            }
            that.setData({
              provinces: arr,
              curr_prov_id: list[0].id
            })
            //获取当前省份下的城市
            that.get_cities();
          } else {
            wx.showToast({
              title: '系统异常',
            })
          }
        } else {
          wx.showToast({
            title: '网络异常',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取城市
  get_cities: function () {
    const that = this
    wx.request({
      url: getApp().globalData.host + '/city/list/' + that.data.curr_prov_id,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.status === 0) {
            //赋值
            var list = res.data.data

            var arr = []
            var city = {}
            for (var i = 0; i < list.length; i++) {
              city = {
                id: list[i].id,
                name: list[i].city_name
              }
              arr.push(city)
            }
            that.setData({
              cities: arr,
              curr_city_id: list[0].id
            })
          } else {
            wx.showToast({
              title: '系统异常',
            })
          }
        } else {
          wx.showToast({
            title: '网络异常',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**省份修改 */
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      prov_index: e.detail.value
    })
    //计算省份在数据库中的order_number
    var order_number = parseInt(e.detail.value) + 1
    //根据order_number遍历得到当前省份的id
    var currProvinceId = ''
    var provinces = this.data.provinces
    for (var i = 0; i < provinces.length; i++) {
      if (provinces[i].order_number === order_number) {
        currProvinceId = provinces[i].id
      }
    }
    this.setData({
      curr_prov_id: currProvinceId
    })
    this.get_cities();
    //重置城市、学校
    this.setData({
      city_index: 0,
      cities: [],
      //传给后台的数据重置
      curr_city_id: '',
    })
  },
  /**城市修改 */
  bindPickerChange2: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      city_index: e.detail.value
    })
    //根据city_name遍历得到当前城市的id
    var currCityId = ''
    var cities = this.data.cities
    for (var i = 0; i < cities.length; i++) {
      if (cities[i].name === cities[parseInt(this.data.city_index)].name) {
        currCityId = cities[this.data.city_index].id
      }
    }
    //设置当前城市的id
    this.setData({
      curr_city_id: currCityId
    })
    // console.log(this.data.curr_city_id)
  },

  /**
   * 按分数推荐
   */
  submit_reco_score: function () {
    let that = this
    console.log(this.data)
    var base_param = {
      'prov_id': that.data.curr_prov_id,
      'city_id': that.data.curr_city_id,
      'total_score': that.data.total_score,
      'flow_score': that.data.flow_score,
      'reco_type': 'fenshu',//按分数推荐
    }
    wx.showModal({
      title: '提示',
      content: '为防止一号多用，总分输入后，后续修改需象征性付费，建议确保输入无误！是否无误？',
      showCancel: true,
      cancelText: '修改',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/reco/reco/school_reco/school_reco?base_param='+JSON.stringify(base_param),
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowHeight = wx.getSystemInfoSync().windowHeight
    this.setData({
      window_height: windowHeight
    })
    //获取省份
    this.get_provinces();

  },
  // 勾选省份
  choose_prov:function(){
    wx.showModal({
      title: '筛选省份选择',
      content: '省份列表，未购买不可选！',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
  //展示高校推荐top tab
  show_yxtj: function () {
    this.setData({
      show_yxtj: 1,
      show_zytj: 0,
      // show_zsjh: 0
    })
  },
  //展示专业推荐top tab
  show_zytj: function () {
    this.setData({
      show_yxtj: 0,
      show_zytj: 1,
      // show_zsjh: 0
    })
  },

})