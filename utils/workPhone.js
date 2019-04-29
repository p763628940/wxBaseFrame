//判断今天是否工作日
const isWorkday = date => {
  var date = !date ? new Date() : new Date(date);
  var getday = date.getDay();
  if (getday == 0 && getday == 6) {
    // console.log("休息日")
    return '1';

  } else {
    // console.log("工作日")
    return '0';
  }
}

//拨打电话
const dialingClick = value => {
  // var nowtimes = new Date();
  // const year = nowtimes.getFullYear()
  // const month = nowtimes.getMonth() + 1
  // const day = nowtimes.getDate()
  // var starttimes = year + "-" + month + "-" + day + " " + "10:00";
  // var endtimes = year + "-" + month + "-" + day + " " + "17:00";
  // var timestrings = year + "-" + month + "-" + day + " " + nowtimes.getHours() + ":" + nowtimes.getMinutes();

  // var starttimes = Date.parse(new Date(starttimes.replace(/-/g, '/')))
  // var endtimes = Date.parse(new Date(endtimes.replace(/-/g, '/')))
  // var timestrings = Date.parse(new Date(timestrings.replace(/-/g, '/')))

  wx.makePhoneCall({
    phoneNumber: '010-87152976'
  })
  // if (starttimes < timestrings && timestrings < endtimes && isWorkday() == 0) {
  //   wx.makePhoneCall({
  //     phoneNumber: '010-87152976'
  //   })
  // } else {
  //   wx.showModal({
  //     title: '温馨提示',
  //     content: '客服时间为周一至周五10:00-17:00，请在该时间段联系客服',
  //     showCancel: false,
  //     confirmText: '知道了',
  //     confirmColor: '#FF7B00',
  //     success: function(res) {
  //       if (res.confirm) {
  //         // console.log('用户点击确定')
  //       } else if (res.cancel) {
  //         // console.log('用户点击取消')
  //       }
  //     }
  //   })
  // }
}

module.exports = {
  dialingClick: dialingClick
}