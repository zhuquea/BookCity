// components/generalLIst/generalList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalBang:{
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump_detail(e) {
      console.log(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: `../../pages/details/details?detailData=${JSON.stringify(e.currentTarget.dataset.item)}`,
      })
    }
  }
})
