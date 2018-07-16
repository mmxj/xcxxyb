// pages/my/subpage/myorder/myorder.js
const app = getApp();
const util = require("../../../../utils/util.js");
const Ajax = util.Ajax;
const alert = util.alert;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData:[
      // {
      //   no:'1111',
      //   id:'12121',
      //   companyName:'测试商户',
      //   sfsCreate:'2018:02:04 99:99:99',
      //   payStatus:2,
      //   amount:"100",
      //   payStatusName:'支付成功',
      //   boxHeight:null,
              
      // }
    ],
    pageNum:1,
    load: true  
  },
  onPageScroll:function(e){
  
    if (e.scrollTop == this.data.boxHeight){ //触发碰到底部函数
      if(this.data.load==true){
        let pageNum = this.data.pageNum ;
        pageNum++
        this.setData({
          pageNum: pageNum,
          load:false
        },()=>{
          this.getorder()
        })
        
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getorder();
    wx.getSystemInfo({//获取窗口高度
      success: (res) => {
        this.setData({ windowHeight: res.windowHeight })
      }
    })
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
  /**
   * 获取订单详情
   */
  getorder:function(){
    // console.log(this.data.pageNum)
    Ajax({
      router: '/order/prescription/get',
      session: true,
      data: {
        userLoginMobile: app.globalData.user.userName,
        pageInfo: {
          pageNum: this.data.pageNum,
          pageSize: 10
        },
      },
      callback: (data) => {
        if (data.rows.length > 0) {
          for(var i in data.rows){
            for(var k in data.rows[i]){
              data.rows[i].payStatusName = this.payStatus(data.rows[i].payStatus);
              data.rows[i].sfsCreates=data.rows[i].sfsCreate.substring(0, data.rows[i].sfsCreate.length - 2)
            }
          }
          this.setData({
            orderData: this.data.orderData.concat(data.rows),
            load: true
          })
          let that = this;
          wx.createSelectorQuery().select('#myOrderListWrap').boundingClientRect(function (rect) {//获取标签高度
            that.setData({
              boxHeight: rect.height - that.data.windowHeight
            })
          }).exec()
        } else {
          // this.setState({
          //   dataMore: false,
          //   loading: false
          // })
        }
      }
    })
  },
  payStatus:function(status){//返回支付状态
    switch (status) {
      case 1:
        return "等待支付"
      case 2:
        return "支付成功"
      case 3:
        return "支付撤销"
      case 4:
        return "支付冲正"
      case 5:
        return "支付退货"
      case 6:
        return "支付失败"
      default:
        return "未知状态"
    }
  },
  goPage:function(e){//跳转页面
    app.goPage(e)
  }
})