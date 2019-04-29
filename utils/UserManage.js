import {config} from "../config/config"; //获取参数配置
import {User} from "../api/api"
var Base64 = require('../lib/js-base64/base64.modified');


// 设置全局参数 存储用户信息
function storeUserInfo(userInfo) {
    let app = getApp();
    console.log(app);
    let infoObj = {}; // 只取有值的选项
    let channelId =getUserInfoBykey("channelId");
    let latitude =getUserInfoBykey("latitude");
    let longitude =getUserInfoBykey("longitude");
    let city =getUserInfoBykey("city");
    if(channelId){
        infoObj.channelId=channelId
    }
    if(latitude){
        infoObj.latitude=latitude
    }
    if(longitude){
        infoObj.longitude=longitude
    }
    if(city){
        infoObj.city=city
    }
    for (let i in userInfo) {
        if (userInfo[i]) {
            let userInfoVal = userInfo[i];
            infoObj[i] = userInfoVal
            app.globalData.userInfo[i] = userInfoVal
        }
    }
    try {
        wx.setStorageSync(config.USER_INFO_KEY, infoObj);
        return true
    } catch (e) {
        return false
    }

}
//更新全局参数
function updateCurrentUserInfo(key, value) {
  let app = getApp();
  if (value != '' || value != undefined) {
    let userInfo = wx.getStorageSync(config.USER_INFO_KEY);
    if (!userInfo) {
      userInfo = {}
    }
    userInfo[key] = value;
    app.globalData.userInfo[key] = value;
    wx.setStorageSync(config.USER_INFO_KEY, userInfo);
    return true
  } else {
    return false
  }


}
// 获取用户信息 穿key 返回响应的属性 否则返回全部
function getUserInfoBykey(key) {
    let app = getApp();
     let userInfo
    try {
        userInfo = wx.getStorageSync(config.USER_INFO_KEY);
    }catch (e) {
        console.log(e)
    }
    if(userInfo[key]){
        return userInfo[key]||app.globalData.userInfo[key]||'';
    }
}

// 获取全部的用户信息
function getUserInfoAll(){
    let app = getApp();
    let userInfo = wx.getStorageSync(config.USER_INFO_KEY)||app.globalData.userInfo;

    return  userInfo

}
//获取用户状态  有手机号 已经注册 ，有userId  已经注册到用户中心 ， 有无用户昵称 标识用户信息是否完整
//返回 obj  isRegister 是否注册   isUser 是否建立账户  isFull  头像和昵称是否存在
function getUserState(){
      let mobile = getUserInfoBykey("mobile");
      let userId = getUserInfoBykey("userId");
      let nickName = getUserInfoBykey("nickName");
      let stateObj={};
        console.log(userId);
      if(mobile){
          stateObj.isRegister=true;
      }else {
          stateObj.isRegister=false;
      }
      if(userId){
          stateObj.isUser=true;
      }else {
          stateObj.isUser=false;
      }
      if(nickName){
          stateObj.isFull=true;
      }else {
          stateObj.isFull=false;
      }
      return stateObj

}
// 获取 分享信息
function getSherMessage (path='/home',fun) {
    let usedata = {
        systemId: config.parameters.systemId,
        channelId:getUserInfoBykey('channelId') ,
        userId:getUserInfoBykey('userId'),
        type: 1,
        functionName: 'commissionReturnMini',
        pagePath: path
    };
    User.getSherMessage(usedata).then(function (res) {
        fun(res)
    })
}


// 分享成功回调
function shareSuccess (shareId,medicalId,fun,type) {

    let usedata = {
        systemId: config.parameters.systemId,
        channelId:getUserInfoBykey('channelId') ,
        userId:getUserInfoBykey('userId'),
        type: type||3,
        shareId:shareId,
        medicalId:medicalId||''

    };
    User.shareSuccess(usedata).then(function (res) {
        console.log(res)
        if(fun){
            fun(res)
        }

    })
}


//渠道id
function setChannelId(option){
    let  channelId =option.channelId;
    if(channelId){
        updateCurrentUserInfo("channelId",channelId)
    }else {
        updateCurrentUserInfo("channelId",config.parameters.channelId)
    }
}
//埋点
function point(eventName,eventObject,eventData,currentPagePath){
    let app = getApp();
    let data = {
        systemId: config.parameters.systemId,
        channelId:getUserInfoBykey("channelId"),
        userId:getUserInfoBykey("userId"),
        eventName: eventName||'',
        eventObject: eventObject || 'NONE',
        eventData: eventData || "",
        currentPagePath: currentPagePath||'',
        ip: "",
        systemInfo: app.globalData.getSystemInfoSync || {}
    };
    User.makePoint(data)
}

//获取全部
function getallSherMessage(app){
    let shareStrarr=config.parameters.shareConfig;
    console.log(shareStrarr)
    for(let ele of shareStrarr){

        getSherMessage(ele, function (res) {
            if(!res.body.shareInfo.PENGYOU){
                console.error(ele+'分享信息获取失败')
                return
            }

            console.log("dsfasdfsdf")
            console.log(res)
            app.globalData.shareInfo[ele] = res.body.shareInfo.PENGYOU;

            console.log(app.globalData.shareInfo)
        });
    }
}

function cleanUserInfoExceptChannelId() {
    try {
        const data = wx.getStorageSync(config.USER_INFO_KEY);
        let userInfo = {};
        userInfo.channelId = data.channelId;
        wx.setStorageSync(config.USER_INFO_KEY, userInfo)
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    UserManage:{
        storeUserInfo,
        updateCurrentUserInfo,
        getUserState,
        getUserInfoBykey,
        setChannelId,
        getUserInfoAll,
        point,
        getSherMessage,
        shareSuccess,
        getallSherMessage,
        cleanUserInfoExceptChannelId
    }
}
