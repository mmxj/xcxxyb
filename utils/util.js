
const Ajax = require('./server.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const IsUserLogin=(app)=>{
  console.log(app.globalData.user.status);
  if (!app.globalData.user.status){
    wx.navigateTo({
      url: '/pages/login/login',
    })

  }
}

module.exports = {
  formatTime: formatTime,
  Ajax: Ajax,
  IsUserLogin,
}

