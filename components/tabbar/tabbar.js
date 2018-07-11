// component/tabbar/tabbar.js;
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    gopage:(e)=>{
      let url = e.currentTarget.dataset.url;

      wx.redirectTo({url:url})
    }
  },
  ready:function(){
    this.setData({
      chooseBar: app.globalData.chooseBar
    })
  }
})
