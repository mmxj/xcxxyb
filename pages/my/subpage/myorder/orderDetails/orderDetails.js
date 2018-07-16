// pages/my/subpage/myorder/orderDetails/orderDetails.js
const app = getApp();
const util = require("../../../../../utils/util.js");
const Ajax = util.Ajax;
const alert = util.alert;
import wxbarcode from '../../../../../components/wxbarcode/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'273447330680668160',
    orderData:null,
    showBarCode:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        ...options
      });
      Ajax({//获取订单详情
        router: '/order/prescription/get',
        session: true,
        data: {
          id: this.data.id,
          pageInfo: {
            pageNum: 1,
            pageSize: 10
          }
        },
        callback:(data) => {
          for(var i in data.rows[0]){
            data.rows[0].payStatusName = this.payStatus(data.rows[0].payStatus);
            data.rows[0].businessTypeName = this.businessType(data.rows[0].businessType); 
            data.rows[0].sfsCreate = data.rows[0].sfsCreate.split('.')[0];
            wxbarcode.barcode('orderbarcode', data.rows[0].id , '566', '146');
          }
          data.rows[0].sfsCreate = data.rows[0].sfsCreate.split('.')[0];
          setTimeout(()=>{//获取订单详情 包括支付卡
            Ajax({
              router: '/payment/paymentdeal/get',
              session: true,
              data: {
                orderNo: data.rows[0].no,
              },
              callback: (res) => {
                // data.rows[0].cardType = res.rows[0].cardType;
                data.rows[0].cardType = 1;
                data.rows[0].showBarCode = false;
                if (data.rows[0].payStatus == 2 &&
                  this.dateformat(new Date().toLocaleDateString()) == data.rows[0].sfsCreate.split(' ')[0].replace(/-/g, '/') &&
                  data.rows[0].cardType === 1) {
                  data.rows[0].showBarCode = true;
                }
                this.setData({
                  orderData: data.rows[0],
                  showBarCode: data.rows[0].showBarCode
                })
              }
            })
          },0)
          
         
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
  payStatus: function (status) {//返回支付状态
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
  //订单类型
  businessType(type) {
    switch (type) {
      case 1:
        return "缴费"
      case 2:
        return "挂号"
      case 3:
        return "门诊"
      case 4:
        return "社保单"
      default:
        return "未知"
    }
  },
  dateformat: function (time) {//获取当日的日期
    var timeArr = time.split('/');
    for (var i in time) {
      if (timeArr[i] < 10) {
        timeArr[i] = '0' + timeArr[i]
      }
    }
    return timeArr.join('/')
  },
  goBack:function(){//返回
    wx.navigateBack({
      delta:1
    })
  }
})