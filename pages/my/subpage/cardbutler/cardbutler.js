// pages/my/subpage/cardbutler/cardbutler.js
const app = getApp();
const util = require("../../../../utils/util.js");
const Ajax = util.Ajax;
const alert = util.alert;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modelshow:false,//是否展示遮罩
    cardId: null,//储存选中卡的id
    cardData: [
      //   {
      //   id:1,
      //   bankName:'bjls',
      //   account:'11212',
      //   cardTypeName:1,
      //   cardType:1,
      //   banklogo:'bjls',
      //   bankbg:'bjls'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.getBind();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    
  },
  //获取绑卡
  getBind:function(){
    Ajax({
      router: '/user/card/bind/get',
      session: true,
      data: {
        userId: app.globalData.user.userId
      },
      callback: (data) => {
        var arr = data.rows;

        for (var i in arr) {
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
          arr[i].bankbg = rname;
          //设置银行logo名 背景 end

          //设置卡类型中文名
          if (arr[i].cardType === 1) {
            arr[i].cardTypeName = "社保卡"
          } else if (arr[i].cardType === 3) {
            arr[i].cardTypeName = "银联卡"
          } else {
            arr[i].cardTypeName = "其他卡"
          }


          //截取卡的后四位

          arr[i].accountLastFour = arr[i].account.substring(arr[i].account.length - 4, arr[i].account.length);
        }

        this.setData({
          cardData:arr
        })
      }
    })
  },
  //跳转页面
  goPage: function(e) {
    app.goPage(e)
  },
  chooseCard:function(e){//选中卡 触发功能
    this.setData({
      modelshow:true,
      cardId: e.currentTarget.dataset.id
    })
  },
  setDefault:function(){
    alert('尚未开放该功能')
  },
  deleteCard:function(){
      this.setData({
        modelshow: false,
      })
      wx.showModal({
        title: '提示',
        content: '是否撤销该卡',
        success:(res)=>{
          if(res.confirm){
            Ajax({
              router: '/user/card/bind/delete',
              session: true,
              data: {
                id: this.data.cardId
              },
              callback: (data) => {
                if (data.ret.errorCode === 0) {
                  this.getBind()
                  alert('撤销成功');
                }
              }

            })
          }else{
            console.log('quxiao')
          }
         
        }
      })
  }
})