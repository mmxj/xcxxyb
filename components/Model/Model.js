// components/Model/Model.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propShow:{
      type:Boolean,
      value:false
    },
    propTitle:{
      type:String,
      value:'请选择操作方式'
    },
    height:{
      type:String,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached:function(){
    // setInterval(() => {
    //   this.setData({
    //     show: !this.data.show
    //   })
    // }, 5000)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closeModel:function(){
      this.setData({
        propShow:false
      },()=>{
        let myEventDetail = this.data.propShow;
        this.triggerEvent('onMyevent', myEventDetail, { bubbles: false })
      })
    }
  }
})
