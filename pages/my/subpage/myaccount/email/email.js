// pages/my/subpage/myaccount/email/email.js;
const unit= require("../../../../../utils/util.js");
const Ajax = unit.Ajax;
const alert = unit.alert;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ...options
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
  eamilInput(e){
    this.setData({
      eamil: e.detail.value
    })
  },
  //保持编辑内容
  submit(){
    Ajax({
      router: '/user/update',
      session: true,
      data: {
        id: this.data.userId,
        email: this.data.eamil
      },
      callback: (data) => {
        if (data.ret.errorCode === 0) {
          alert('设置成功',()=>{
            wx.navigateBack({
              delta: 1
            })
          });
          
        }
      }
    })
  }
})