// components/classification/classification.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //男生部分数据
    schoolBody:{
      type: Array
    },
    //女生部分数据
    girlStudent:{
      type: Array
    },
    //出版部分数据
    publish:{
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
    jumpClassificationDetail1(e){
      console.log(e.currentTarget.dataset.item)
     wx.navigateTo({
       url: `../../pages/classificationDetail/classificationDetail?classificationDetailData1=${JSON.stringify(e.currentTarget.dataset.item)}&NumObj=${1}&schoolBody=${JSON.stringify(this.properties.schoolBody)}`,
     })
    },
    jumpClassificationDetail2(e) {
      console.log(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: `../../pages/classificationDetail/classificationDetail?classificationDetailData2=${JSON.stringify(e.currentTarget.dataset.item)}&NumObj=${2}&girlStudent=${JSON.stringify(this.properties.girlStudent)}`,
      })
    },
    jumpClassificationDetail3(e) {
      console.log(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: `../../pages/classificationDetail/classificationDetail?classificationDetailData3=${JSON.stringify(e.currentTarget.dataset.item)}&NumObj=${3}&publish=${JSON.stringify(this.properties.publish)}`,
      })
    }
  },
})
