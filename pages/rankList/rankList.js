// pages/rankList/rankList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //实现周榜，月榜，总榜的TAB切换
    numObj: '1',
    //接收周榜榜单的_id
    numId: "",
  //接收月榜榜单ID
  numMonthId: "",
  //接收总榜榜单Id
  numTotalId: "",
  //接收周榜数据
  zhouBang: [],
  //接收月榜数据
  monthBang: [],
  //接收总榜数据
  totalBang: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: `${JSON.parse(options.rankList).title}`,
    })
    console.log(JSON.parse(options.rankList))
    this.setData({
      numId: JSON.parse(options.rankList)._id,
      numMonthId: JSON.parse(options.rankList).monthRank,
      numTotalId: JSON.parse(options.rankList).totalRank
    })
    this.getBangData()
    this.getMonthBangData()
    this.getTotalBangData()
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
  tap(e){
   this.setData({
     numObj: e.target.dataset.tapid
   })
  },
  //获取周榜榜单数据
  getBangData(){
    app.globalData.fly.get(`/ranking/${this.data.numId}`).then((response) => {
      this.setData({
        zhouBang: response.data.ranking.books
      })
      console.log(this.data.zhouBang)
    }).catch(err => {
      console.log(err)
    })
  },
  //获取月榜榜单数据
  getMonthBangData() {
    app.globalData.fly.get(`/ranking/${this.data.numMonthId}`).then((response) => {
      this.setData({
        monthBang: response.data.ranking.books
      })
      console.log(this.data.monthBang)
    }).catch(err => {
      console.log(err)
    })
  },
  //获取总榜榜单数据
  getTotalBangData(){
    app.globalData.fly.get(`/ranking/${this.data.numTotalId}`).then((response) => {
      this.setData({
        totalBang: response.data.ranking.books
      })
      console.log(this.data.totalBang)
    }).catch(err => {
      console.log(err)
    })
  }
})