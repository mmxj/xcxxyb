// pages/login/subpage/forgetPassword/forgetPassword.js
const util = require('../../../../utils/util.js');
const Ajax = util.Ajax;
const alert = util.alert;
const md5 = util.md5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    sendsms: true,
    buttonConnent: '获取验证码',
    sendclass: "",
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
  //监听手机输入的值
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  getCode: function () {
    let phone = this.data.phone;
    if (!this.data.phone) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        confirmColor: "#27b7fe",
        showCancel: false
      })
      return
    }
    if (this.data.phone.length !== 11) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        confirmColor: "#27b7fe",
        showCancel: false
      })
    } else {
      if (this.data.sendsms) {
        this.setData({
          sendsms: false,
          buttonConnent: '60秒之后再试',
          sendclass: "no-use",
        });
        var timer = 59;
        this.time = setInterval(() => {
          if (timer > 0) {
            this.setData({
              buttonConnent: timer + '秒之后再试',
              sendclass: "no-use",
            })
          } else {
            this.setData({
              buttonConnent: '获取验证码',
              sendclass: "",
            })
            this.setData({
              sendsms: true
            })
            clearInterval(this.time);
          }
          timer--
        }, 1000)
        Ajax({
          router: '/base/validatecode/sms/get',
          data: {
            deviceType: 1,
            validateCodeType: 3,
            mobile: phone
          },
          callback: (data) => {
            this.setData(
              {
                validateCodeId: data.validateCodeId
              }
            )
          }
        })
      }
    }
  },
  //修改密码
  signup: function (e) {
    console.log(e);
    let phone = e.detail.value.phone;
    let code = e.detail.value.code;
    let password = e.detail.value.password;
    let passwordagain = e.detail.value.passwordagain;
    if (phone === null || phone === '') {
      alert('请填写手机号')
      return
    }
    if (password === null || password === '') {
      alert('请填写密码')
      return
    }
    if (code === null || code === '') {
      alert('请填写验证码')
      return
    }
    if (password === passwordagain) {
      Ajax({
        router: '/user/app/password/reset',
        data: {
          deviceType: 1,
          password: md5(password).toUpperCase(),
          validateCodeId: this.data.validateCodeId,
          validateCode: code,
          loginName: phone
        },
        callback: (data) => {
          alert('密码修改成功', () => {
            wx.navigateBack({
              delta: 1
            })
          });
        }
      })
    } else {
      alert('两次输入的密码不一致')
      return
    }
  }
})