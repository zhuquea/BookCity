// components/ranking/ranking.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //男生部分数据
    schoolBodyRank:{
      type:Array
    },
    //女生部分数据
    girlStudentRank:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemObj:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //进入相应排行榜
    jump_rankList(e){
      console.log(e.currentTarget.dataset.item)
      this.setData({
        itemObj: e.currentTarget.dataset.item
      })
      console.log(this.data.itemObj)
      wx.navigateTo({
        url: `../../pages/rankList/rankList?rankList=${JSON.stringify(this.data.itemObj)}`,
      })
    }
  }
})
