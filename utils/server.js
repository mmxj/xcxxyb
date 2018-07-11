import md5 from './md5.js'
const Ajax = (opt) => {
  let setting = {//外部传进来的参数http://192.168.0.104
    // openUrl : "http://onlinepay.site:8091",//设置测试环境请求的域名
    openUrl: "http://www.yxunionpay.com:8091",//设置生产环境请求的域名
    router: "/base/validatecode/picture/get", //设置请求的地址路径
    appid: 3,
    async: true,
    callback: function () {
    },
    error: function () {

    }
  }

  if (opt.session) {
    if (!session) {
      window.location.href = window.location.origin + '/#/index/login';
      return
    }
  }
  // let tempSignature = "";//计算后返回的signature 算法在下面makeSignature中
  let version = "1.0.0"; //版本号 默认是1.0.0
  let key = "qazwsxedc";//参数密匙
  let nonce = Math.ceil(Math.random() * 1000);//随机数
  let timestamp = new Date().getTime();//时间戳
  let url = null;//定义地址
  // let res=null;
  let makeSignature = (session, biz_content) => {
    let md5Content = md5(biz_content).toUpperCase();
    let signature = null;

    if (!session) {
      signature = "appid=" + setting.appid + "&biz_content=" + md5Content + "&nonce=" + nonce + "&timestamp=" + timestamp + "&version=" + version + "&key=" + key;
    } else {
      signature = "appid=" + setting.appid + "&biz_content=" + md5Content + "&nonce=" + nonce + "&session=" + session + "&timestamp=" + timestamp + "&version=" + version +
        "&key=" + key;
    }
    let tempSignature = md5(signature).toUpperCase();
    return tempSignature;
  }
  for (var i in opt) {
    setting[i] = opt[i]
  }
  // extend(this.setting,opt);
  // 将this.setting.data转为字符串 post要求

  let data = JSON.stringify(setting.data);
  if (!setting.session) {
    url = setting.openUrl + setting.router + "?appid=" + setting.appid + "&version=" + version + "&nonce=" + nonce + "&timestamp=" + timestamp + "&signature=" + makeSignature("", data);
  } else {
    url = setting.openUrl + setting.router + "?appid=" + setting.appid + "&version=" + version + "&nonce=" + nonce + "&session=" + session + "&timestamp=" +
      timestamp + "&signature=" + makeSignature(session, data);
  }
  wx.showLoading({
    title:'加载中',
    mask:true
  })
  wx.request({
    url:url,
    method:'POST',
    data:data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success:function(data){
      if (data.data.ret.errorCode === 0) {
          if(opt.callback){
            opt.callback(data.data);
          }
      } else {
        wx.showModal({
          title: '提示',
          content: '请求错误' + data.data.ret.errorMessage,
          showCancel: false,
        })
      }
      wx.hideLoading()
    },
    fail:function(data){
      wx.showModal({
        title: '提示',
        content: '请求错误' + data.data.ret.errorMessage,
        showCancel: false,
      })
      console.log('失败',data.data.ret)
      wx.hideLoading()
    },
    complete:function(data){
      wx.hideLoading()
    }
  })

  /*
   *contentType设置请求头
   */
  // axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
  // axios.post(url, data).then((res) => {

  //   var data = JSON.parse(res.request.response);
  //   if (data.ret.errorCode === 0) {
  //     opt.callback(data);
  //   } else {
  //     errorAlert(data)
  //   }
  //   loading.toast.hide();
  //   loading.show = true
  // }).catch((res) => {
  //   loading.toast.hide();
  //   loading.show = true
  //   console.log(res, '请求错误');

  // })
}
module.exports =Ajax;