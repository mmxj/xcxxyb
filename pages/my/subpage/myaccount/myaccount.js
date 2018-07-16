// pages/my/subpage/myaccount/myaccount.js
const app = getApp();
const unit = require('../../../../utils/util.js');
const Ajax = unit.Ajax;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '无账号',
    email: '未设置',
    address: '未设置',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getUser();
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
   * 获取用户账号信息
   * **/

  getUser: function(){
    let userId = app.globalData.user.userId;
    console.log(app.globalData.user)
    Ajax({
      router: '/user/get',
      session: true,
      data: {
        id: userId
      },
      callback: (data) => {
        this.setData({
          mobile: this.phone(app.globalData.user.userName),
          email: data.email,
          address: data.address,
          phone: app.globalData.user.userName,
          data: data,
          userId:userId
        })
      }
    })
  },
  /**
   * 处理手机号 替换为***
   */
  phone:function(num) {
    if (num.length === 11) {
      var m = num.substring(3, num.length - 4).replace(/./g, "*");
      return num.substr(0, 3) + m + num.substr(num.length - 4);
    } else {
      return num
    }
  },
  goPage:function(e){
    app.goPage(e);
  }
})
