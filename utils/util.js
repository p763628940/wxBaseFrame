//通用函数类
import {
  config
} from "../config/config"; //获取参数配置
import {
  User
} from "../api/api"; //获取参数配置



var Base64 = require('../lib/js-base64/base64.modified');


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

/**
 * 封装wx.request
 */
function madeajax(api, interfaceNo, method) {

  const ajax = ({
    data = {},
    fnSuc,
    fnFail

  }) => {
    let url = madeInterfaceNoParms(api, interfaceNo);
    let requestData = madeData(data,interfaceNo);
    wx.request({
      url: url,
      data: requestData,
      method: method,
      dataType: 'json',
      header: {
        'content-type': method === 'POST' ? 'application/json' : 'application/x-www-form-urlencoded'
        // 'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // 网络请求没问题
        if (+res.statusCode === 200) {
          // 后台没问题
          if (res.data.head.errorCode === "0000") {
            fnSuc && fnSuc(res.data);
            return
          }
          fnSuc && fnSuc(res.data);
          return
        }
        fnFail && fnFail()
      },
      fail: res => {
        wx.showModal({
          content: '网络错误，请重试',
          showCancel: false
        });
        fnFail && fnFail()
      }
    })
  };
  let ajaxPormise = function(data,fnsuc,fnfail) {
    return new Promise(function(resolve, reject) {
      ajax({
        data: data,
        fnSuc: (response) => {
          resolve(response)
        },
        fnFail: (error) => {
          reject(error)
        }
      })
    }).then(function (res) {
      if(res.head.errorCode=='0000'){
          fnsuc&&fnsuc(res)
      }else {
          fnfail&&fnfail(res)
      }
        return res
    })
  }
  return ajaxPormise
}

// 拼接访问rul
function madeInterfaceNoParms(url, interfaceNo) {
  let param = {
    system: config.parameters.systemId,
    interface: interfaceNo,
    mode: '',
    sessionId: ''
  }
  param = url + '?param=' + Base64.encode(JSON.stringify(param))
  return param;
}

// 拼接请求参数
function madeData(data,interfaceNo) {
  let requestData = {
    head: {
      timeStamp: "",
      systemId: "system",
      MD5: "",
      extTransactionNo: "",
      localTransactionNo: "",
      errorCode: "0000",
      errorMessage: "成功",
        interfaceNo:interfaceNo
    },
    body: data
  }
  return requestData;
}

//tost 用于配合异步函数过程中 接口返回 可自己定义 错误信息
function failedTost(data, text, fun) {
  console.log(data)
  let head = data.head;
  if (head.errorCode !== "0000") {
    if (fun) {
      fun(data);
      return
    }
    wx.showToast({
      title: text || head.errorMessage,
      icon: 'none',
      duration: 2000
    })
    return
  }

}

// 小程序 初始化 1查看版本更新 2 保存系统信息
function init(app) {
  // 更新版本
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(function(res) {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      updateManager.onUpdateReady(function() {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              // wx.clearStorage()
              updateManager.applyUpdate()
            }
          }
        })
      })
    }
  })
  updateManager.onUpdateFailed(function() {
    // 新的版本下载失败
    wx.showModal({
      title: '更新提示',
      content: '新版本下载失败',
      showCancel: false
    })
  })
  //获取系统信息


  try {
    const res = wx.getSystemInfoSync()
    app.globalData.getSystemInfoSync = res


  } catch (err) {
    // Do something when catch error
    console.log(err)
  }

}

//获取当前页面  1当前页面 2 前一个页面
function getPage(type) {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - type]; //获取当前页面的对象
  if (currentPage) {
    return currentPage;
  }

}


function makeUuid() {
  const max = 99999999999;
  const min = 10000000000;
  let range = max - min;
  let rand = Math.random();
  let randomNumber = (min + Math.round(rand * range));
  let timestamp = (new Date()).getTime();
  return randomNumber.toString() + timestamp.toString()
}
//分享函数
function share(UserManage,shareStr=config.parameters.defShareStr,sharetype=1,fun) {
  let app = getApp();
  let uuid =makeUuid();
  UserManage.shareSuccess(uuid, '', function(res) {},sharetype);

    let shareData =app.globalData.shareInfo[shareStr];
    if(shareData){
        shareData.uuid=uuid;
        shareData.imageUrl=shareData.imgUrl;
    }
    if(fun){
    return  fun(shareData)
    }else {
        shareData.path=shareData.link;
        shareData.imageUrl=shareData.imgUrl;

        console.log(shareData)
      return  shareData
    }
}

//组合h5 所需参数
function makeH5Data(router, userInfo, base64str, orderNo) {

  let aiBaoData = {
    env: 'wechat',
    channelId: userInfo.channelId,
    systemId: config.parameters.systemId,
    userId: userInfo.userId,
    latitude: userInfo.latitude || '',
    longitude: userInfo.longitude || '',
    city: userInfo.city || ''
  }
  let userId = userInfo.userId;
  let channelId = userInfo.channelId;
  console.log('解码');
  let url;
  if (base64str) {
    if (orderNo) {
      url = config.webViewHostname + router + '?aiBaoData=' + base64str + '&orderNo=' + orderNo + '&userId=' + userId + '&channelld=' + channelId;
    } else {
      url = config.webViewHostname + router + '?aiBaoData=' + base64str + '&userId=' + userId + '&channelld=' + channelId;
    }
  } else {
    url = config.webViewHostname + router + '?aiBaoData=' + encodeURIComponent(Base64.encode(JSON.stringify(aiBaoData))) + '&userId=' + userId + '&channelld=' + channelId;
  }
  return url;
}
//地理位置授权
function getLocaltion(myAmapFun, UserManage, page) {

  let that =this;
  wx.showModal({
    title: '小爱专家绿通 需要获取您的地理位置',
    content: '需要获取您的地理位置，请确认授权',
    confirmText: '允许',
    cancelText: '不允许',
    success: function(res) {
      if (res.cancel) {
        //取消授权
      } else if (res.confirm) {
        //确定授权，通过wx.openSetting发起授权请求

        wx.openSetting({
          success: function(res) {
            if (res.authSetting["scope.userLocation"] == true) {

              console.log("我授权成功了");
              console.log(page);

              if(page){
                page.setData({
                    showLoaction: false
                });
              }
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 1000
              });

              //再次授权，调用wx.getLocation的API
              myAmapFun.getRegeo({
                success: function(data) {
                  let cityMessage = data[0].regeocodeData.addressComponent;
                    page.setData({
                        showLoaction: false
                    });
                  UserManage.updateCurrentUserInfo("latitude", data[0].latitude);
                  UserManage.updateCurrentUserInfo("longitude", data[0].longitude);
                  if (typeof(cityMessage.city) == 'string') {
                    UserManage.updateCurrentUserInfo("city", cityMessage.city);
                  } else {
                    UserManage.updateCurrentUserInfo("city", cityMessage.province);
                  }


                  //成功回调
                },
                fail: function(info) {
                  //失败回调
                  console.log(info)
                }
              })
            } else {}
          }
        })
      }
    }
  })
}

//收集错误信息
module.exports = {
  formatTime,
  madeajax,
  madeData,
  failedTost,
  init,
  getPage,
  makeH5Data,
  makeUuid,
  share,
  getLocaltion
}
