//index.js
//获取应用实例
const utils=require('../../utils/util.js');
const Ajax=utils.Ajax;
const app = getApp()
Page({
  data: {
    imgUrls: [
    'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  },
  onLoad:function(){
    // console.log(app.globalData.isIphoneX)
    this.setData({
      isIphoneX: app.globalData.isIphoneX,
      
    })
    app.globalData.chooseBar = 1;
    Ajax({
      router: '/ips/slider/get',
      data: {
        enableFlag: 1
      },
      callback: (data) => {
        this.setData({ data: data.rows});
      },
    })
    Ajax({
      router: '/ips/article/get',
      data: {
        pageInfo: {
          pageSize: 10,
          pageNum: 1
        },
        enableFlag: 1
      },
      callback: (data) => {
        this.setData({ articleData: data.rows });

      }
    })

  }
})
