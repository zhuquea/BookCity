// components/searchList/searchList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchListObj1:{
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
    jump_detail_Obj(e){
      wx.navigateTo({
        url: `../../pages/details/details?detailData=${JSON.stringify(e.currentTarget.dataset.item)}`,
      })
    }
  }
})
