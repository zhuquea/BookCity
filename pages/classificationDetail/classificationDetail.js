// pages/classificationDetail/classificationDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用来区分在书城页面点击的是‘男生’‘女生’还是‘出版’中的内容跳转到分类详情页面的
    fromBookShelf: 0,
    //給minsData赋值时要用到fromBookShelf2，也是请求大分类数据需要的major参数
    fromBookShelf2: "",
    //接收书城页面传过来的‘男生（schoolbody）’‘女生(girlStudent)’‘出版(publish)’的具体数据，也是请求小分类数据需要的minor参数
    fromBookShelf3: "",
    //接收小分类数据
    minorData:{},
    //接收具体‘男生’，‘女生’，‘出版’的数据
    specificData:[],
    typeList:[
      {
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    //实现tab切换用的数据
    tabNumObj: 0,
    tabNumObj2: '-1' ,
    tabNumObj3: -1,
    //接收specificData数据中的mins
    minsData: [],
    //获取分类书籍要传的type参数
    typeObj: "hot",

    start: 0,
    start1: -1,
    //接收大分类以及小分类数据
    bigData:[],
    //接收小分类请求需要用到的minor属性
    smallData: "",
    //控制‘暂无书籍’div的显示隐藏
    flagObj: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(options.NumObj)
    if (options.NumObj === "1"){
      wx.setNavigationBarTitle({
        title: JSON.parse(options.classificationDetailData1).name,
      })
      this.setData({
        fromBookShelf: 1,
        fromBookShelf2: JSON.parse(options.classificationDetailData1).name,
        fromBookShelf3: "male"
      })
      console.log(this.data.fromBookShelf3)
    } else if (options.NumObj === "2"){
      wx.setNavigationBarTitle({
        title: JSON.parse(options.classificationDetailData2).name,
      })
      this.setData({
        fromBookShelf: 2,
        fromBookShelf2: JSON.parse(options.classificationDetailData2).name,
        fromBookShelf3: "female"
      })
      console.log(this.data.fromBookShelf3)
    } else if (options.NumObj === "3"){
      wx.setNavigationBarTitle({
        title: JSON.parse(options.classificationDetailData3).name,
      })
      this.setData({
        fromBookShelf: 3,
        fromBookShelf2: JSON.parse(options.classificationDetailData3).name,
        fromBookShelf3: "press"
      })
      console.log(this.data.fromBookShelf3)
    }
    this.getMinor()
    this.getCatsBooksBig()
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
    this.setData({
        start1: this.data.start,
        start: this.data.bigData.length
      })
    if (this.data.start1 !== this.data.start){
      let arrObjArr = this.data.bigData
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.fromBookShelf3}&type=${this.data.typeObj}&major=${this.data.fromBookShelf2}&start=${this.data.start}&limit=20`).then(response => {
        console.log(response)
        response.data.books.forEach((item) => {
          arrObjArr.push(item)
        })
        this.setData({
          bigData: arrObjArr
        })
      }).catch(err => {
        console.log(err)
      })
    } else if (this.data.start1 === this.data.start){
      wx.showToast({
        title: '已经到底啦',
        icon: 'none',
        duration: 2000
      })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取小分类
  getMinor(){
    app.globalData.fly.get('/cats/lv2').then(response => {
      console.log(response)
      this.setData({
        minorData: response.data
      })
      console.log(this.data.minorData)
      //获取具体‘男生’，‘女生’，‘出版’分类数据
      if (this.data.fromBookShelf === 2){
        this.setData({
          specificData: this.data.minorData.female
        })
        //給minsData赋值
        this.data.specificData.forEach((item) => {
          if (item.major === this.data.fromBookShelf2) {
            this.setData({
              minsData: item.mins
            })
          }
        })
      } else if (this.data.fromBookShelf === 1){
        this.setData({
          specificData: this.data.minorData.male
        })
        this.data.specificData.forEach((item) => {
          if(item.major === this.data.fromBookShelf2){
            this.setData({
              minsData: item.mins
            })
          }
        })
        console.log(this.data.minsData)
      } else if (this.data.fromBookShelf === 3){
        this.setData({
          specificData: this.data.minorData.press
        })
        this.data.specificData.forEach((item) => {
          if (item.major === this.data.fromBookShelf2) {
            this.setData({
              minsData: item.mins
            })
          }
        })
      }
      console.log(this.data.specificData)
    }).catch(err => {
      console.log(err)
    })
  },
  //tab切换
  tapObj(e){
    console.log(e)
    this.setData({
      tabNumObj: e.target.dataset.tapid,
      typeObj: e.currentTarget.dataset.item.id
    })
    this.getCatsBooksBig()
  },
  tabObj2(e){
    this.setData({
      tabNumObj2: e.target.dataset.tapid,
      tabNumObj3: e.target.dataset.tapid
    })
    this.getCatsBooksBig()
  },
  tabObj3(e) {
    console.log(e.currentTarget.dataset.item)
    this.setData({
      tabNumObj2: e.target.dataset.tapid,
      tabNumObj3: e.target.dataset.tapid,
      smallData: e.currentTarget.dataset.item
    })
    this.getCatsBooks()
  },
  //获取小分类书籍
  getCatsBooks(){
    app.globalData.fly.get(`/book/by-categories?gender=${this.data.fromBookShelf3}&type=${this.data.typeObj}&major=${this.data.fromBookShelf2}&minor=${this.data.smallData}&start=${this.data.start}&limit=20`).then(response => {
      console.log(response)
      this.setData({
        bigData: response.data.books
      })
      if (this.data.bigData.length > 0) {
        this.setData({
          flagObj: false
        })
      } else if (this.data.bigData.length === 0) {
        this.setData({
          flagObj: true
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //获取大分类数据
  getCatsBooksBig(){
    app.globalData.fly.get(`/book/by-categories?gender=${this.data.fromBookShelf3}&type=${this.data.typeObj}&major=${this.data.fromBookShelf2}&start=${this.data.start}&limit=20`).then(response => {
      console.log(response)
      this.setData({
        bigData: response.data.books
      })
      if (this.data.bigData.length > 0) {
        this.setData({
          flagObj: false
        })
      } else if (this.data.bigData.length === 0) {
        this.setData({
          flagObj: true
        })
      }
      //关闭加载
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
  },
  //进入详情页面
  jump_detail_obj(e){
    wx.navigateTo({
      url: `../details/details?detailData=${JSON.stringify(e.currentTarget.dataset.item)}`,
    })
  }
})