// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制启动图片
    show_guide: 0,
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
    /**
     * picker--学校
     */
    school_index: 0,
    schools: [],
    /**
     * picker--专业
     */
    profession_index: 0,
    professions: [],



    //当前值
    genera: '0',
    curr_prov_id: '',
    curr_city_id: '',
    curr_school_id: '',
    curr_profession_id: '',
    // curr_batch_code:'103',




    //推荐方式
    reco_method: 2,


  },
  /**
   * 点击‘查询’按钮
   */
  query_line: function () {
    console.log(this.data)
    //前端校验
    if(this.data.curr_prov_id==="" || this.data.curr_city_id==="" || 
            this.data.curr_school_id===""){
       wx.showToast({
           title: '条件不能为空',
           icon: 'success',
           image: '',
           duration: 1200,
           mask: true,
           success: function(res) {},
           fail: function(res) {},
           complete: function(res) {},
       }) 
       return;
    }
    wx.navigateTo({
      url: '/scorelines/scoreline/scoreline?curr_school_id=' + this.data.curr_school_id + '&genera=' + this.data.genera + '&curr_profession_id=' + this.data.curr_profession_id,
    })
  },
  query_enroll: function () {
    wx.showToast({
      title: '敬请期待！',
    })
  },

  /**文理科改变 */
  generachange: function () {
    if (this.data.genera === '0') {
      this.setData({
        genera: '1'
      })
    } else if (this.data.genera === '1') {
      this.setData({
        genera: '0'
      })
    }
    //修改文理科后，将专业充值
    this.setData({
      curr_profession_id: '',
      professions: []
    })
    this.get_professiones();
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
      school_index: 0,
      schools: [],
      profession_index: 0,
      professions: [],

      //传给后台的数据重置
      curr_city_id: '',
      curr_school_id: '',
      curr_profession_id: ''
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
    this.get_schools();
    //重置学校、专业
    this.setData({
      school_index: 0,
      schools: [],
      profession_index: 0,
      professions: [],

      //传给后台的数据重置
      curr_school_id: '',
      curr_profession_id: ''
    })
    // console.log(this.data.curr_city_id)
  },
  /**学校修改 */
  bindPickerChange3: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      school_index: e.detail.value
    })
    //根据school_name遍历得到当前学校的id
    var currSchoolId = ''
    var schools = this.data.schools
    for (var i = 0; i < schools.length; i++) {
      if (schools[i].name === schools[parseInt(this.data.school_index)].name) {
        currSchoolId = schools[this.data.school_index].id
      }
    }
    //设置当前学校的id
    this.setData({
      curr_school_id: currSchoolId,
    })
    //重置专业
    this.setData({
      profession_index: 0,
      professions: [],

      //传给后台的数据重置
      curr_profession_id: ''
    })
    this.get_professiones();
    // console.log(this.data.curr_school_id)
  },
  /**专业修改 */
  bindPickerChange4: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      profession_index: e.detail.value
    })
    //根据school_name遍历得到当前学校的id
    var currProfessionId = ''
    var professions = this.data.professions
    for (var i = 0; i < professions.length; i++) {
      if (professions[i].name === professions[parseInt(this.data.profession_index)].name) {
        currProfessionId = professions[this.data.profession_index].id
      }
    }
    //设置当前学校的id
    this.setData({
      curr_profession_id: currProfessionId,
    })
    console.log(this.data.curr_profession_id)
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
            //获取当前城市下的所有学校
            that.get_schools();
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
  //获取学校
  get_schools: function () {
    const that = this
    wx.request({
      url: getApp().globalData.host + '/school/list/' + that.data.curr_city_id,
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
            var school = {}
            for (var i = 0; i < list.length; i++) {
              school = {
                id: list[i].id,
                name: list[i].school_name
              }
              arr.push(school)
            }
            that.setData({
              schools: arr,
              curr_school_id: list[0].id
            })
            that.get_professiones();
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
  //获取专业
  get_professiones: function () {
    console.log(this.data)
    const that = this
    wx.request({
      url: getApp().globalData.host + '/profession/list/' + that.data.curr_school_id + '/' + that.data.genera,
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
            var profession = {}
            for (var i = 0; i < list.length; i++) {
              profession = {
                id: list[i].id,
                name: list[i].profession_name
              }
              arr.push(profession)
            }
            if (arr.length > 0) {
              that.setData({
                professions: arr,
                curr_profession_id: list[0].id,

                //专业下标重置
                profession_index: 0
              })
            }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowHeight = wx.getSystemInfoSync().windowHeight
    this.setData({
      window_height: windowHeight
    })
    this.get_provinces();
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
    const that = this;
    setTimeout(function () {
      that.setData({
        show_guide: 0
      })
    }, 2500)
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