import {
  UserManage
} from '../../../../utils/UserManage'
import {
  personal
} from "../../../../api/api";
import parameters from '../../../../config/constant'
import {
  share
} from "../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ar: parameters.imgPrefixUrl + 'icon/left_hui.png',
    cha: parameters.imgPrefixUrl + 'icon/close_gray.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    bankInfo: {},
    cardNum: '',
    accountInfo: {
      inWithdrawCash: "0.00",
      settleCash: "0.00",
      totalCash: "0.00",
      freeWithdrawTime: "0",
    },
    poundage: 2,
    balanceVal: '',
    disabled: false,
    showStatue: false,
    password: '',
    showPasswdBox: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //更换银行卡
  changBankClick(e) {
    let bankCardId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../basic/basicBank/basicBank?bankCardId=' + bankCardId,
    })
  },
  //监听input
  moneyWatch(e) {
    // 通过正则过滤小数点后两位
    e.detail.value = (e.detail.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
    this.setData({
      balanceVal: e.detail.value
    })
  },
  //监听交易密码
  inputChange(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //提现规则
  drawRuleJump() {
    wx.navigateTo({
      url: '../drawRule/drawRule',
    })
  },
  //全部提现
  allCheck() {
    let inWithdrawCash = this.data.accountInfo.inWithdrawCash;
    let freeWithdrawTime = this.data.accountInfo.freeWithdrawTime;
    if (freeWithdrawTime <= 0) {
      this.setData({
        balanceVal: (parseFloat(inWithdrawCash) - parseFloat(this.data.poundage)).toFixed(2)
      })
    } else {
      this.setData({
        balanceVal: inWithdrawCash
      })
    }
  },
  //立即提现
  putForward() {
    if (this.data.balanceVal == 0 || this.data.balanceVal == '' || this.data.balanceVal == '0.00' || this.data.balanceVal < 0) {
      // wx.showToast({
      //   title: '当前可提现金额不满足提现条件',
      //   icon: 'none',
      //   duration: 1000
      // })
      wx.showModal({
        title: '',
        content: '当前可提现金额不满足提现条件',
        showCancel: false,
        confirmText: '知道了',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
      return false
    }
    if (this.data.balanceVal > this.data.accountInfo.inWithdrawCash || this.data.balanceVal == this.data.accountInfo.inWithdrawCash) {
      wx.showToast({
        title: '超过可提现金额',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    this.setData({
      showPasswdBox: true
    })
  },
  //忘记密码
  forgetPassword() {
    this.setData({
      password: '',
      showPasswdBox: false
    })
    wx.navigateTo({
      url: '../../basic/basicPassword/basicPassword',
    })
  },
  //关闭交易密码弹窗
  showPasswdClick() {
    if (this.data.showPasswdBox == false) {
      this.setData({
        showPasswdBox: true
      })
    } else {
      this.setData({
        password: '',
        showPasswdBox: false
      })
    }
  },
  //交易密码确认提交
  onConfirm() {
    if (this.data.password == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.password.length < 6 || this.data.password.length > 12) {
      wx.showToast({
        title: '请输入6-12位密码',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!/^[a-zA-Z0-9]{6,12}$/.test(this.data.password)) {
      wx.showToast({
        title: '密码不能含有特殊符号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    this.withDrawCash();
  },
  /**
   * 获得账户信息接口
   */
  getBankCardAndPasswdStatus() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
    }
    let _this = this;
    personal.getBankCardAndPasswdStatus(data, function(res) {
      if (res.body[0].cardNum) {
        let cardNum = res.body[0].cardNum;
        cardNum = cardNum.substring(cardNum.length - 4);
        _this.setData({
          bankInfo: res.body[0],
          cardNum: cardNum
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
   * 获得提现信息
   */
  getCashAccountInfo() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
    }
    let _this = this;
    personal.getCashAccountInfo(data, function(res) {
      _this.setData({
        accountInfo: res.body
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
   * 代理人提现
   */
  withDrawCash() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      inputCash: this.data.balanceVal,
      passwd: this.data.password
    }
    let _this = this;
    personal.withDrawCash(data, function(res) {
      _this.setData({
        password: '',
        showPasswdBox: false
      })
      wx.redirectTo({
        url: '../drawSchedule/drawSchedule?withdrawId=' + res.body.withdrawId,
      })
    }, function(res) {
      _this.setData({
        password: '',
        showPasswdBox: false
      })
      wx.showModal({
        title: '操作失败',
        content: '交易密码错误，请重试',
        cancelText: '忘记密码',
        confirmText: '重试',
        success(res) {
          if (res.confirm) {
            _this.setData({
              showPasswdBox: true
            })
          } else if (res.cancel) {
            _this.setData({
              password: '',
              showPasswdBox: false
            })
            wx.navigateTo({
              url: '../../basic/basicPassword/basicPassword',
            })
          }
        }
      })
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
    this.getCashAccountInfo();
    this.getBankCardAndPasswdStatus();
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