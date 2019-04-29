import {
  UserManage
} from '../../../../utils/UserManage'
import {
  personal
} from "../../../../api/api";
import {
  verification
} from '../../../../utils/verification'
import parameters from '../../../../config/constant'
import { share } from "../../../../utils/util";
const regeneratorRuntime = require('./../../../../lib/regenerator-runtime/runtime-module');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: parameters.imgPrefixUrl + 'icon/login_head.png',
    agree: parameters.imgPrefixUrl + 'icon/agree_on.png',
    agreeH: parameters.imgPrefixUrl + 'icon/agree.svg',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    mobile: '',
    code: '',
    userCodeTxt: '获取验证码',
    currentTime: 60,
    disabledSend: false,
    isSendAuthCode: false,
    disabledLogin: false,
    agreeStatus: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //手机号监听
  mobileWatch(e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  //协议
  changeState() {
    if (this.data.agreeStatus == true) {
      this.setData({
        agreeStatus: false
      })
    } else {
      this.setData({
        agreeStatus: true
      })
    }
  },
  //用户协议
  playformJump() {
    wx.navigateTo({
      url: '../basicPlatform/basicPlatform',
    })
  },
  //隐私政策
  privacyJump() {
    wx.navigateTo({
      url: '../basicPrivacy/basicPrivacy',
    })
  },
  //发送验证码
  sendCode() {
    if (this.data.mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.phoneVerification(this.data.mobile).veCode) {
      wx.showToast({
        title: '手机号码有误，请重新输入',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    // if (!this.data.disabledSend) {
    //   return false;
    // }
    //验证码倒计时
    this.getCode();
    //接口调用
    this.getMobileVerifyCode();
  },
  //验证码倒计时
  getCode() {
    let _this = this;
    let interval = null;
    let currentTime = _this.data.currentTime;

    if (currentTime == 60) {
      _this.setData({
        disabledSend: true,
        userCodeTxt: currentTime + 's',
      })
    }

    interval = setInterval(function() {
      currentTime--;
      _this.setData({
        userCodeTxt: currentTime + 's',
        currentTime: currentTime
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        _this.setData({
          userCodeTxt: '重新获取',
          currentTime: 60,
          disabledSend: false,
        })
      }
    }, 1000)
  },
  //表单提交
  formSubmit: function(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let mobile = e.detail.value.mobile;
    let code = e.detail.value.code;
    this.setData({
      mobile: mobile,
      code: code
    })
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.phoneVerification(mobile).veCode) {
      wx.showToast({
        title: '手机号码有误，请重新输入',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (code.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.codeVerification(code).veCode || this.data.isSendAuthCode != true) {
      wx.showToast({
        title: '验证码有误，请重新输入',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!this.data.agreeStatus) {
      wx.showToast({
        title: '请勾选协议',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    this.loginOrBindByMobile();
  },
  /**
   * 获取验证码接口
   */
  getMobileVerifyCode() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      templateCode: 'SMS_140105106',
      codeLength: '4',
      mobile: this.data.mobile,
    }
    let _this = this;
    personal.getMobileVerifyCode(data, function(res) {
      _this.setData({
        isSendAuthCode: true
      })
    }, function(res) {
      wx.showToast({
        title: res.head.errorMessage,
        icon: 'loading',
        duration: 1000
      });
    })
  },
  /**
   * 登录注册接口
   */
  loginOrBindByMobile() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      mobile: (this.data.mobile).replace(/(^\s*)|(\s*$)/g, ""),
      verificationCode: (this.data.code).replace(/(^\s*)|(\s*$)/g, ""),
      opType:'login'
    }
    let _this = this;
    personal.loginOrBindByMobile(data, function(res) {
      _this.authorize();
      let phone = _this.data.mobile;
      let tmphone =phone.substring(0,3) +"****"+ phone.substring(phone.length-4);
      console.log(tmphone);
      UserManage.updateCurrentUserInfo("mobile",tmphone);
      wx.navigateBack({
        delta: 1,
      })
    }, function(res) {
      wx.showToast({
        title: res.head.errorMessage,
        icon: 'loading',
        duration: 1000
      });
    })
  },
  /**
   * 隐私授权
   */
  authorize() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
    }
    personal.authorize(data)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return share(UserManage)
  },
})
