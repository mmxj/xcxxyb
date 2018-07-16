// pages/my/subpage/myaccount/address/address.js
const unit = require("../../../../../utils/util.js");
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
  addressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },
  //保持编辑内容
  submit() {
    Ajax({//接口出问题 修改任意一个值其他值都回自动变成了空 后台不在 发现这个bug的时候让新后台改一下
      router: '/user/update',
      session: true,
      data: {
        id: this.data.userId,
        address: this.data.address
      },
      callback: (data) => {
        if (data.ret.errorCode === 0) {
          alert('设置成功', () => {
            wx.navigateBack({
              delta: 1
            })
          });

        }
      }
    })
  }
})