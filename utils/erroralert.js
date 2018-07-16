
export default function (text) {
  
  if (text.ret) {
    let message = text.ret.errorMessage;
    switch (message) {
      case "user login not exist":
        wx.showModal({
          title: '提示',
          content: '用户不存在',
          confirmColor: '#27b7fe',
          showCancel: false,
        })
        break;
      case "password error":
        wx.showModal({
          title: '提示',
          content: '密码错误',
          confirmColor: '#27b7fe',
          showCancel: false,
        })
        break;

      case "validatecode check error":
        wx.showModal({
          title: '提示',
          content: '验证码错误',
          confirmColor: '#27b7fe',
          showCancel: false,
        })
        break;
      case "ValidateCode error":
        wx.showModal({
          title: '提示',
          content: '验证码错误',
          confirmColor: '#27b7fe',
          showCancel: false,
        })

        break;
      case "already exists":
       
        wx.showModal({
          title: '提示',
          content: '该用户已经注册',
          confirmColor: '#27b7fe',
          showCancel: false,
        })
        break;
      default:

        wx.showModal({
          title: '提示',
          content: '请求错误',
          confirmColor: '#27b7fe',
          showCancel: false,
        })
    }

  }

}