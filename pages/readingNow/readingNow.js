// pages/readingNow/readingNow.js
const app = getApp()
Page({
  onMark: function (event) {
    var myEventOption = { bubbles: true, composed: true } // 触发事件的选项
    this.triggerEvent('onMark', event, myEventOption);
  },
  /**
   * 页面的初始数据
   */
  data: {
    //接收详情页传过来的相应详情书籍
    readingNowData:{},
    //接收书籍章节数据
    bookChapters:{},
    //接收章节内容
    chapterContent:{},
    //接收具体章节标题
    specificData: "",
    //完成‘上一章’和‘下一章’功能用到的
    numObjData: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.readingNowData))
    this.setData({
      readingNowData: JSON.parse(options.readingNowData)
    })
    wx.setNavigationBarTitle({
      title: JSON.parse(options.readingNowData).title,
    })
    this.getbookChaptersBookId()
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
  //获取书籍章节
  getbookChaptersBookId(){
    app.globalData.fly.get(`/mix-atoc/${this.data.readingNowData._id}?view=chapters`).then(response => {
      console.log(response)
      if(wx.getStorageSync("readed")){
         this.setData({
           numObjData: wx.getStorageSync("readed")
         })
      }
      this.setData({
        bookChapters: response.data.mixToc.chapters,
        specificData: response.data.mixToc.chapters[this.data.numObjData].title
      })
      console.log(this.data.bookChapters)
      // console.log(this.data.bookChapters[0].link)
      //获取章节内容
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(this.data.bookChapters[0].link)}`).then(response => {
        console.log(response)
        this.setData({
          chapterContent: response.data.chapter
        })
        console.log(this.data.chapterContent)
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //点击上一章发生的事件
  thePreviousChapter(){
    if (this.data.numObjData > 0){
      this.data.numObjData--
      this.setData({
        specificData: this.data.bookChapters[this.data.numObjData].title,
        numObjData: this.data.numObjData
      })
      wx.setStorageSync("readed", this.data.numObjData)
    } else if (this.data.numObjData===0) {
      wx.showToast({
        title: '已经是第一章了',
        icon: 'none'
      })
    }
  },
  //点击下一章发生的事件
  nextChapter(){
     this.data.numObjData++
     this.setData({
       specificData: this.data.bookChapters[this.data.numObjData].title,
       numObjData: this.data.numObjData
     })
    wx.setStorageSync("readed", this.data.numObjData)
  }
})