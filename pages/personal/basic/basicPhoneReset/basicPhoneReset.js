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
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    mobile: '',
    verifyCode: '',
    userCodeTxt: '获取验证码',
    currentTime: 60,
    disabledSend: false,
    isSendAuthCode: false,
    disabled: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //监听手机号
  mobileWatch(e) {
    let value = e.detail.value;
    let cursor = e.detail.cursor;
    let _this = this;
    if (value != '') {
      _this.setData({
        mobile: value
      })
    } else {
      _this.setData({
        mobile: ''
      })
    }

    if (value != '' && _this.data.verifyCode != '') {
      _this.setData({
        disabled: false
      })
    } else {
      _this.setData({
        disabled: true
      })
    }
  },
  //监听验证码
  verifyWatch(e) {
    let value = e.detail.value;
    let cursor = e.detail.cursor;
    let _this = this;
    if (value != '') {
      _this.setData({
        verifyCode: value
      })
    } else {
      _this.setData({
        verifyCode: ''
      })
    }

    if (value != '' && _this.data.mobile != '') {
      _this.setData({
        disabled: false
      })
    } else {
      _this.setData({
        disabled: true
      })
    }
  },
  //发送验证码
  sendCode() {
    if (this.data.mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.phoneVerification(this.data.mobile).veCode) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    //验证码倒计时
    this.getCode();
    //接口调用
    this.getMobileVerifyCode();
  },
  //下一步
  handleMobile() {
    if (this.data.mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.phoneVerification(this.data.mobile).veCode) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (this.data.verifyCode.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.codeVerification(this.data.verifyCode).veCode && this.data.isSendAuthCode != true) {
      wx.showToast({
        title: '验证码格式有误',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    this.loginOrBindByMobile();
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
      mobile: (this.data.mobile).replace(/(^\s*)|(\s*$)/g, ""),
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
      verificationCode: (this.data.verifyCode).replace(/(^\s*)|(\s*$)/g, ""),
      opType: 'bind'
    }
    let _this = this;
    personal.loginOrBindByMobile(data, function(res) {
      _this.authorize();
      wx.showToast({
        title: '绑定成功',
        icon: 'none',
        duration: 100
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 3,
        })
      }, 200)
    }, function(res) {
      wx.showToast({
        title: res.head.errorMessage,
        icon: 'none',
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