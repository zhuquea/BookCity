// pages/search/search.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //搜索框中的值
     value: "",
     //接收搜索热词
     hotSearch: [],
     //接收‘搜索热词’数组中的前6项
     hotSearchSix:[],
     //6个搜索热词的背景色
     backgroundColor: [
       {
         color: '#e03b06'
       },
       {
         color: '#e0620d'
       },
       {
         color: '#db639b'
       },
       {
         color: '#68db63'
       },
       {
         color: '#19fa28'
       },
       {
         color: '#88147f'
       }
     ],
     //控制搜索子组件的显示隐藏
     searchListObj: false,
     //接收‘书籍搜索’中的数据
     searchListObj1: [],
     //接收‘搜索历史’的数据
     searchHistoryObj: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotWord()
    if (wx.getStorageSync('searchHistory')){
      this.setData({
        searchHistoryObj: wx.getStorageSync('searchHistory')
      })
    }
    console.log(this.data.searchHistoryObj)
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
  //获取搜索热词
  gethotWord(){
    app.globalData.fly.get("/book/hot-word").then(response => {
      this.setData({
        hotSearch: response.data.hotWords
      })
      this.data.hotSearch.forEach((item, index) => {
        let len = this.data.hotSearch.length
        let currentRandom = parseInt(Math.random() * (len - 1));
        let current = this.data.hotSearch[index];
        this.data.hotSearch[index] = this.data.hotSearch[currentRandom];
        this.data.hotSearch[currentRandom] = current;
      })
      this.setData({
        hotSearchSix: this.data.hotSearch.slice(0, 6)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //点击‘换一换’功能
  changeObj(){
    this.data.hotSearch.forEach((item, index) => {
      let len = this.data.hotSearch.length
      let currentRandom = parseInt(Math.random() * (len - 1));
      let current = this.data.hotSearch[index];
      this.data.hotSearch[index] = this.data.hotSearch[currentRandom];
      this.data.hotSearch[currentRandom] = current;
    })
    this.data.backgroundColor.forEach((item, index) => {
      let len = this.data.backgroundColor.length
      let currentRandom = parseInt(Math.random() * (len - 1));
      let current = this.data.backgroundColor[index];
      this.data.backgroundColor[index] = this.data.backgroundColor[currentRandom];
      this.data.backgroundColor[currentRandom] = current;
    })
    this.setData({
      hotSearchSix: this.data.hotSearch.slice(0, 6),
      backgroundColor: this.data.backgroundColor
    })
  },
  //输入框获取焦点事件
  focusObj(){
     this.setData({
       searchListObj: true
     })
  },
  //输入框失去焦点事件
  blurObj(){
    this.data.searchHistoryObj.push(this.data.value)
    wx.setStorageSync('searchHistory', this.data.searchHistoryObj)
    this.setData({
      searchHistoryObj: wx.getStorageSync('searchHistory')
    })
    console.log(this.data.searchHistoryObj)
  },
  //输入框内容变化事件
  searchChangeObj(e){
    // console.log(e.detail)
    this.setData({
      value: e.detail
    })
    console.log(this.data.value)
    this.getBookSearch()
  },
  //点击输入框右侧取消按钮发生的事件
  onCancel(){
    this.setData({
      searchListObj: false
    })
    this.blurObj()
  },
  //清空搜索历史
  clearHistory(){
    wx.removeStorageSync('searchHistory')
    let arrA = []
    this.setData({
      searchHistoryObj: arrA
    })
  },
  //书籍搜索功能
  getBookSearch(){
    app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.value}`).then(response => {
      this.setData({
        searchListObj1: response.data.books
      })
      console.log(this.data.searchListObj1)
    }).catch(err => {
      console.log(err)
    })
  },
  //点击‘大家都在搜’下面的选项时发生的事件
  everySearch(e){
    this.setData({
      value: this.data.hotSearchSix[e.target.dataset.index],
      searchListObj: true
    })
    console.log(e.target.dataset.index)
    this.getBookSearch()
  },
  //点击‘搜索历史’中的内容发生的事件
  searchHistory_Obj(e){
    this.setData({
      value: this.data.searchHistoryObj[e.target.dataset.index],
      searchListObj: true
    })
    console.log(e.target.dataset.index)
    this.getBookSearch()
  }
})