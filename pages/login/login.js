// pages/login/login.js
const utils = require('../../utils/util.js');
import md5 from '../../utils/md5.js';
const Ajax = utils.Ajax;
const app = getApp();
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

  // 跳转其他页面
  goPage:function(data){
    wx.navigateTo({
      url: data.target.dataset.url,
    })
  },

  //表单提交按钮触发

  loginUp:function(e){
    if (e.detail.value.password === '') {
      // alert('请输入密码')
      wx.showModal({
        title: '请输入密码',
        content: '',
        showCancel: false,
      })
      return
    }
    let account = e.detail.value.phone;
    let password = md5(e.detail.value.password).toUpperCase();
 
    Ajax(
      {
        router: '/user/app/login',
        data: {
          deviceType: 1,
          loginName: account,
          password: password,
        },
        callback: (data) => {
          app.globalData.user.session = data.session;
          app.globalData.user.userId = data.userId;
          app.globalData.user.userName = data.userName;
          setTimeout(()=>{//登陆效果只有十分钟有效
            app.globalData.user.session = null;
            app.globalData.user.userId = null;
            app.globalData.user.userName = null;
          },600000)
          wx.navigateBack({
            delta: 1
          })
        }
      }
    )
  }
})