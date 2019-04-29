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
import {
  share, getPage
} from "../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: parameters.imgPrefixUrl + 'icon/error.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    password: '',
    aginPassword: '',
    mobile: '',
    verifyCode: '',
    userCodeTxt: '获取验证码',
    currentTime: 60,
    disabledSend: false,
    isSendAuthCode: false,
    disabled: true,
    closeBtn: false,
    goPath: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    if (options.goPath) {
      this.setData({
        goPath: options.goPath
      })
    }
  },
  //监听密码
  passwordWatch(e) {
    let value = e.detail.value;
    let _this = this;
    if (value != '') {
      _this.setData({
        password: value,
        closeBtn: true,
      })
    } else {
      _this.setData({
        password: '',
        closeBtn: false,
      })
    }

    if (_this.data.password != '' && _this.data.aginPassword != '' && _this.data.mobile != '' && _this.data.verifyCode != '') {
      _this.setData({
        disabled: false
      })
    } else {
      _this.setData({
        disabled: true
      })
    }
  },
  //监听再次输入密码
  aginPasswordWatch(e) {
    let value = e.detail.value;
    let _this = this;
    if (value != '') {
      _this.setData({
        aginPassword: value
      })
    } else {
      _this.setData({
        aginPassword: ''
      })
    }

    if (_this.data.password != '' && _this.data.aginPassword != '' && _this.data.mobile != '' && _this.data.verifyCode != '') {
      _this.setData({
        disabled: false
      })
    } else {
      _this.setData({
        disabled: true
      })
    }
  },
  //监听手机号
  mobileWatch(e) {
    let value = e.detail.value;
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

    if (_this.data.password != '' && _this.data.aginPassword != '' && _this.data.mobile != '' && _this.data.verifyCode != '') {
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

    if (_this.data.password != '' && _this.data.aginPassword != '' && _this.data.mobile != '' && _this.data.verifyCode != '') {
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
    //验证码倒计时
    this.getCode();
    //接口调用
    this.sendMessage();
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
  //确认
  btnclick() {
    if (this.data.password.length == 0 || this.data.aginPassword.length == 0) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (this.data.password.length < 6 || this.data.password.length > 12) {
      wx.showToast({
        title: '请输入6-12位密码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!/^[a-zA-Z0-9]{6,12}$/.test(this.data.password)) {
      wx.showToast({
        title: "密码不能含有特殊符号",
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (this.data.password != this.data.aginPassword) {
      wx.showToast({
        title: '俩次密码输入不一致，请重新输入',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
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
    if (this.data.verifyCode.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.codeVerification(this.data.verifyCode).veCode || this.data.isSendAuthCode != true) {
      wx.showToast({
        title: '验证码有误，请重新输入',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    this.setPasswd();
  },
  /**
   * 获取验证码接口
   */
  sendMessage() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      templateCode: 'SMS_140105106',
      codeLength: '4',
      mobile: (this.data.mobile).replace(/(^\s*)|(\s*$)/g, ""),
    }
    let _this = this;
    personal.sendMessage(data, function(res) {
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
   * 用户设置交易密码
   */
  setPasswd() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      passwd: (this.data.aginPassword).replace(/(^\s*)|(\s*$)/g, ""),
      mobile: (this.data.mobile).replace(/(^\s*)|(\s*$)/g, ""),
      verifycode: (this.data.verifyCode).replace(/(^\s*)|(\s*$)/g, "")
    }
    let _this = this;
    personal.setPasswd(data, function(res) {
      wx.showToast({
        title: '密码设置成功',
        icon: 'none',
        duration: 1000
      })

      // 手动更改标记
      UserManage.updateCurrentUserInfo('isSetPassWord', 1);

      let getPath = getPage(2).route;
      let getIndex = getPath.lastIndexOf("\/");
      getPath = getPath.substring(getIndex + 1, getPath.length);

      if (getPath == 'basicBank' || getPath == 'basicBankList') {
        wx.navigateBack({
          delta: 2,
        })
      } else if (getPath == 'drawForward'){
        wx.redirectTo({
          url: '../../draw/drawBank/drawBank',
        })
      } else {
        wx.navigateBack({
          delta: 1,
        })
      }
    }, function(res) {
      wx.showToast({
        title: res.head.errorMessage,
        icon: 'loading',
        duration: 1000
      });
    })
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
  onShareAppMessage: function() {
    return share(UserManage)
  },
})