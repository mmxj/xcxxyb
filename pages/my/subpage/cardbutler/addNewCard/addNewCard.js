// pages/my/subpage/cardbutler/addNewCard/addNewCard.js
const app=getApp();
const util = require('../../../../../utils/util.js');
const Ajax = util.Ajax;
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

  //点击提交表单
  addnewcard: function(e){
      console.log(e.detail.value);
      let data=e.detail.value;
      Ajax({
        router: '/user/bankcard/bind',
        session: true,
        data: {
          bankAccount: data.bankAccount,
          relationType: 9,
          idCardNo: data.idCardNo,
          mobile: data.mobile,
          userName: data.userName
        },
        callback:(data)=>{
          console.log(data);
          app.WxParse.wxParse('DetailInfo', 'html', data.html, this, 5);
        }
      })
  }
})
