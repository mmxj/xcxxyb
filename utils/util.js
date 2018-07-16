
const Ajax = require('./server.js');
import md5 from './md5.js';
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
const alert = (text,success) => {
  wx.showModal({
    title: '提示',
    content: text,
    confirmColor: "#27b7fe",
    showCancel: false,
    success:success

  })
}
module.exports = {
  formatTime: formatTime,
  Ajax: Ajax,
  alert,
  md5
}

