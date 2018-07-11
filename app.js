//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null,
    isIphoneX: false,
    chooseBar:1
  },
  onShow:function(){
    let that = this;
    wx.getSystemInfo({
      success: res => {
        // console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }

      }
    })

  }
})