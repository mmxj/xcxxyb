// pages/paycode/paycode.js
const utils = require('../../utils/util');
import wxbarcode from '../../components/wxbarcode/index.js';
const app = getApp(); 
const Ajax = utils.Ajax;
const alert = utils.Ajax;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    card:[],
    showCardlist:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.chooseBar = 2;
    this.setData({
      isIphoneX: app.globalData.isIphoneX
    });
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
    this.getBindCard();
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
   * 获取绑卡信息
   */
  getBindCard:function(){
      if (app.globalData.user.userId){
        this.setData({
          nouser: false
        })
        Ajax({
          router: '/user/card/bind/get',
          session: true,
          data: {
            userId: app.globalData.user.userId
          },
          callback:(data)=>{
            var arr = data.rows;
            if(data.rows.length>0){
              for(var i in arr){
                

                var name = arr[i].bankName;

                //设置银行logo名 背景 start
                var hasBanklogo = [{
                  "北京农商银行": "bjnsbank"
                }, {
                  "北京银行": "bjbank"
                },
                {
                  "渤海银行": "bhbank"
                }, {
                  "成都农商银行": "cdnsbank"
                },
                {
                  "成都银行": "cdbank"
                },
                {
                  "大连银行": "dlbank"
                }, {
                  "东莞银行": "dgbank"
                },
                {
                  "赣州银行": "gzhbank"
                }, {
                  "工商银行": "gsbank"
                },
                {
                  "广东南粤银行": "gdnybank"
                }, {
                  "广东农信": "gdnx"
                },
                {
                  "广发银行": "gfbank"
                }, {
                  "广州银行": "gzbank"
                },
                {
                  "汉口银行": "hkbank"
                }, {
                  "杭州银行": "hzbank"
                },
                {
                  "河北银行": "hbbank"
                }, {
                  "华润银行": "hrbank"
                },
                {
                  "华夏银行": "hxbank"
                }, {
                  "华兴银行": "hxibank"
                },
                {
                  "汇丰银行": "hfbank"
                }, {
                  "嘉兴银行": "jxbank"
                },
                {
                  "江苏民丰农村商业银行": "jsmfncsybank"
                }, {
                  "江苏银行": "jsbank"
                },
                {
                  "江阴农商银行": "jynsbank"
                }, {
                  "交通银行": "jtbank"
                },
                {
                  "晋商银行": "jinsbank"
                }, {
                  "九江银行": "jjbank"
                },
                {
                  "南昌银行": "ncbank"
                }, {
                  "南海农商银行": "nhnsbank"
                },
                {
                  "南京银行": "njbank"
                }, {
                  "内蒙古银行": "nmgbank"
                },
                {
                  "宁波银行": "nbbank"
                }, {
                  "宁夏银行": "nxbank"
                },
                {
                  "农村信用合作社": "ncxy"
                }, {
                  "齐鲁银行": "qlbank"
                },
                {
                  "其他": "other"
                }, {
                  "青海银行": "qhbank"
                },
                {
                  "上海农商银行": "shnsbank"
                }, {
                  "上海浦东发展银行": "shpdbank"
                },
                {
                  "兴业银行": "xybank"
                }, {
                  "上饶银行": "srbank"
                }, {
                  "上海银行": "shbank"
                },
                {
                  "绍兴银行": "sxbank"
                }, {
                  "深圳发展银行": "szfzbank"
                },
                {
                  "盛京银行": "sjbank"
                }, {
                  "顺德农商银行": "sdnsbank"
                },
                {
                  "苏州银行": "szbank"
                }, {
                  "台州银行": "tzbank"
                },
                {
                  "天津银行": "tjbank"
                }, {
                  "威海市商业银行": "whsbank"
                },
                {
                  "微商银行": "wsbank"
                }, {
                  "温州银行": "wzbank"
                },
                {
                  "乌鲁木齐市商业银行": "qlmqsybank"
                }, {
                  "邢台银行": "ytbank"
                },
                {
                  "营口银行": "ykbank"
                }, {
                  "招商银行": "zsbank"
                },
                {
                  "浙商银行": "zhesbank"
                }, {
                  "中国建设银行": "chinajsbank"
                },
                {
                  "中国民生银行": "msbank"
                }, {
                  "中国农业银行": "nybank"
                },
                {
                  "中国平安银行": "pabank"
                }, {
                  "中国银行": "zgbank"
                }, {
                  "中国邮政": "zgyz"
                }, {
                  "中信银行": "zxbank"
                },
                {
                  "重庆农村商业银行": "cqncsybank"
                }, {
                  "重庆银行": "qcbank"
                }
                ];
                var rname = 'other'; //默认赋值的银行logo名
                for (var k in hasBanklogo) {
                  for (var j in hasBanklogo[k]) {
                    if (name == j) {
                      rname = hasBanklogo[k][j];
                    }
                  }

                }
                arr[i].banklogo = rname;
          //设置银行logo名 背景 end
                arr[i].accountlastFour = arr[i].account.substring(arr[i].account.length-4, arr[i].account.length)
                
              }
              this.setData({
                cardData: arr[0],//当前选中卡的数据
                card:this.data.card.concat(arr)
              },()=>{
                this.getQrcode();
              })
            }else{
                wx.showModal({
                  title: '提示',
                  content: '您尚未绑定银行卡请先绑卡',
                  confirmColor: "#27b7fe",
                  success: (res)=>{
                    if(res.confirm){
                      wx.navigateTo({
                        url: '/pages/my/subpage/cardbutler/cardbutler',
                      })
                    }
                  }
                })
              }
            }
          })
      }else{
        this.setData({
          nouser:true
        })
      //  wx.showModal({
      //    title: '提示',
      //    content: '您尚未登录',
      //  })
      }
  },
  /**
   * 获取二维码编号
   */
  getQrcode:function(){
    Ajax({
      router: '/base/qrcode/get',
      session: true,
      data: {
        deviceType: 1,
        validateCodeType: 8,
        bindBankCardId: this.data.card[0].id,
        orderNo: { "type": "REFRESH_PAYMENT_QRCODE" }
      },
      callback: (data) => {
        this.setData({
          qrCode: data.qrCode
        })
        wxbarcode.barcode('barcode',data.qrCode, 586 , 116);
        wxbarcode.qrcode('qrCode',data.qrCode,460,460)
      }
    })
  },
  gopage:function(){//跳转登录页
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  chooseCard:function(){
    this.setData({
      showCardlist:true
    })
  },
  //子组件传递过来的事件
  onMyevent:function(e){
    this.setData({
      showCardlist: e.detail
    },()=>{
      this.getQrcode();
    });

  },
  changeCard:function(e){
    let card = e.currentTarget.dataset.card;
    let bankarr = this.data.card.concat();
    let startbank = this.data.card[0];
    let index = 0;
    for (var i in bankarr){

      if (bankarr[i].id==card.id){
     
        index=i
      }
    };
    bankarr[0] = bankarr[index];
    bankarr[index] = startbank;
    console.log(bankarr[0])
    this.setData({
      card: bankarr,
      cardData: bankarr[0],//当前选中卡的数据
      showCardlist: false
    },()=>{
      this.getQrcode();
    });
    
  }
})