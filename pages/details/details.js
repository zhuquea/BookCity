const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //rankList传过来的数据
    detailDATA:{},
    //评价中星星的数量
    value: 0,
    //接收请求到的最新章节
    latestChapter:"",
    //vant组件中tab切换用到的
    active: 0,
    //接收详情数据中的简介
    shortIntro: "",
    //接收详情数据中的总章节数
    generalCatalogue: 0,
    //接收获取到的推荐书籍
    recommendBook:[],
    //用来接收3本相关推荐书籍
    arr:[],
    //接收‘短评’数据
    shortReviews:[],
    //接收‘短评’数量
    shortReviewsNum: 0,
    //接收‘长评’数据，目前没用到
    longReviews:[],
    //用来存储，完成‘加入书架’功能
    arr_Obj: [],
    //接收请求到的详情数据
    detail_Data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
    this.setData({
      detailDATA: JSON.parse(options.detailData),
    })
    if (wx.getStorageSync('bookshelf')){
       this.setData({
        arr_Obj: wx.getStorageSync('bookshelf')
       })
    }
    console.log(this.data.detailDATA)
    app.globalData.fly.get(`/book/${this.data.detailDATA._id}`).then((response) => {
      console.log(response)
      this.setData({
        value: response.data.rating.score/2,
        latestChapter: response.data.lastChapter,
        shortIntro: response.data.longIntro,
        generalCatalogue: response.data.chaptersCount,
        detail_Data: response.data
      })
    }).catch(err => {
      console.log(err)
    })
    this.relatedRecommendedBooks()
    this.getdiscussionsData()
    this.getshortReviewsData()
    // this.getBookReviewsData()
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
  //获取相关推荐书籍
  relatedRecommendedBooks(){
    app.globalData.fly.get(`/book/${this.data.detailDATA._id}/recommend`).then((response) => {
      this.setData({
        recommendBook: response.data.books
      })
      console.log(this.data.recommendBook)
      // let arr3 = []
      // for (let i = 0 ; i<3 ; i++ ) {
      //   let num1 = Math.floor(Math.random() * this.data.recommendBook.length)
      //   arr3.push(this.data.recommendBook[num1])
      // }
      // this.setData({
      //   arr: arr3
      // })
      //百度出来的打乱数组的方法，可以防止出现重复书籍
      this.data.recommendBook.forEach((item,index) => {
        let len = this.data.recommendBook.length
        let currentRandom = parseInt(Math.random() * (len - 1));
        let current = this.data.recommendBook[index];
        this.data.recommendBook[index] = this.data.recommendBook[currentRandom];
        this.data.recommendBook[currentRandom] = current;
      })
      this.setData({
        arr: this.data.recommendBook.slice(0, 3)
      })
      console.log(this.data.arr)
    }).catch(err => {
      console.log(err)
    })
  },
  //点击'换一换'发生的事件
  changeObj(){
    //百度出来的打乱数组的方法，可以防止出现重复书籍
    this.data.recommendBook.forEach((item, index) => {
      let len = this.data.recommendBook.length
      let currentRandom = parseInt(Math.random() * (len - 1));
      let current = this.data.recommendBook[index];
      this.data.recommendBook[index] = this.data.recommendBook[currentRandom];
      this.data.recommendBook[currentRandom] = current;
    })
    this.setData({
      arr: this.data.recommendBook.slice(0,3)
    })
    // let arr2 = []
    // for (let i = 0; i < 3; i++) {
    //   let num2 = Math.floor(Math.random() * this.data.recommendBook.length)
    //   arr2.push(this.data.recommendBook[num2])
    // }
    // this.setData({
    //   arr: arr2
    // })
    console.log(this.data.arr)
  },
  //获取‘讨论’的数据
  getdiscussionsData(){
    app.globalData.fly.get(`/post/by-book?book=${this.data.detailDATA._id}`).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  },
  //获取'短评'数据
  getshortReviewsData(){
    app.globalData.fly.get(`/post/short-review?book=${this.data.detailDATA._id}&total=true&sortType=newest`).then(response => {
      console.log(response)
      this.setData({
        shortReviews: response.data.docs,
        shortReviewsNum: response.data.docs.length
      })
      console.log(this.data.shortReviews)
    }).catch(err => {
      console.log(err)
    })
  },
  //获取‘长平’数据
  // getBookReviewsData(){
  //   app.globalData.fly.get(`/post/review/by-book?book=${this.data.detailDATA._id}`).then(response => {
  //     console.log(response)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
  //'加入书架'功能
  addBookShelf(){
    if (JSON.stringify(this.data.arr_Obj).indexOf(this.data.detail_Data._id) === -1){
      this.data.arr_Obj.push(this.data.detail_Data)
      wx.setStorageSync('bookshelf', this.data.arr_Obj)
      wx.showToast({
        title: '加入书架成功',
        icon: 'success',
        duration: 2000
      })
    } else if (JSON.stringify(this.data.arr_Obj).indexOf(this.data.detail_Data._id) !== -1){
      wx.showToast({
        title: '该书已经加入过书架',
        icon: 'none',
        duration: 2000
      })
    }
    console.log(this.data.arr_Obj)
    console.log(wx.getStorageSync('bookshelf'))
    console.log(JSON.stringify(this.data.arr_Obj).indexOf(this.data.detail_Data._id))
  },
  //'开始阅读'功能
  readingNowObj(){
    wx.navigateTo({
      url: `../readingNow/readingNow?readingNowData=${JSON.stringify(this.data.detail_Data)}`,
    })
  }
})