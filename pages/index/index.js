const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //接收wx.setStorageSync存储的‘bookshelf’中的书籍
    bookShelfData: [],
    //控制删除（‘×’）的显示和隐藏
    showDelete: false,
    //接收‘读到第几章’的数据
    readedData: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('bookshelf')){
      this.setData({
        bookShelfData: wx.getStorageSync('bookshelf')
      })
    }
    if (wx.getStorageSync("readed")){
      this.setData({
        readedData: wx.getStorageSync("readed")+1
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
    if (wx.getStorageSync('bookshelf')) {
      this.setData({
        bookShelfData: wx.getStorageSync('bookshelf'),
        showDelete: false
      })
    }
    this.data.bookShelfData.forEach((item) => {
      item.readedData = 1
    })
    if (wx.getStorageSync("readed")) {
      this.setData({
        readedData: wx.getStorageSync("readed")+1
      })
    }
    console.log(this.data.bookShelfData)
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
    // if (wx.getStorageSync('bookshelf')) {
    //   this.setData({
    //     bookShelfData: wx.getStorageSync('bookshelf')
    //   })
    // }
    // console.log(this.data.bookShelfData)
    // console.log(wx.getStorageSync('bookshelf'))
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
  // 跳转到帮助路由
  jumpHelping(){
     wx.navigateTo({
       url: '../helping/helping',
     })
  },
  //进入到相应书籍开始阅读
  jump_readingNow_Obj(e){
    wx.navigateTo({
      url: `../readingNow/readingNow?readingNowData=${JSON.stringify(e.currentTarget.dataset.item)}`,
    })
  },
  //点击修改图标发生的事件
  modify(){
   this.setData({
     showDelete: !this.data.showDelete
   })
  },
  //点击删除（×）发生的事件
  deleteObj(e){
    console.log(e.target.dataset.index)
    this.data.bookShelfData.splice(e.target.dataset.index,1)
    this.setData({
      bookShelfData: this.data.bookShelfData
    })
    wx.setStorageSync('bookshelf', this.data.bookShelfData)
  }
})
