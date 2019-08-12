const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制分类和排行获得‘first_item_hide’类名
    num: '1',
    //接受分类获取到的‘男生’部分
    schoolBody: [],
    //接收分类获取到的‘女生’部分
    girlStudent:[],
    //接收分类获取到的'出版'部分
    publish: [],
    //接受排行获取到的‘男生’部分
    schoolBodyRank: [],
    //接受排行获取到的‘女生’部分
    girlStudentRank: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getCats()
    this.getRanking()
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
  //分类，排行实现tab切换
  tap(e) {
    this.setData({
      num: e.target.dataset.tapid
    })
  },
  //获取大分类
  getCats() {
    app.globalData.fly.get('/cats/lv2/statistics').then((response) => {
      console.log(response.data)
      this.setData({
        schoolBody: response.data.male,
        girlStudent: response.data.female,
        publish: response.data.press
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  //获取排行数据
  getRanking(){
    app.globalData.fly.get(`/ranking/gender`).then((response) => {
      this.setData({
        schoolBodyRank: response.data.male,
        girlStudentRank: response.data.female
      })
      wx.hideLoading()
    }).catch((err) => {
      console.log(err)
    })
  }
})