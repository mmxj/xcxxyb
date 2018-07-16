//app.js
App({
  WxParse:require('/components/wxParse/wxParse.js'),
  onLaunch: function () {

  },
  globalData: {
    userInfo: null,
    isIphoneX: false,
    chooseBar:1,
    user:{//全局保存的用户信息
      session:"6ecb0ed4553f47ea8bbbdf2e55ba3fd9",//用户登录的session
      userId:"99025161147134707",
      userName:"13802436929"
    }
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

  },

  goPage : function(e){
    let data = e.currentTarget.dataset;
    console.log(data)
    if (data.login == 1) { //data.login==1 不检查登陆才能看
      wx.navigateTo({
        url: data.url,
      })
    } else {
      if (!this.globalData.user.session) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return 
      }
      wx.navigateTo({
        url: data.url,
      })
    }

  }
})