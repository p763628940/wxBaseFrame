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
    cha: parameters.imgPrefixUrl + 'icon/close_gray.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    isSetPassWord: 0,
    bankBg: {
      abc: 2,
      bcm: 3,
      beijing: 1,
      boc: 1,
      bohai: 3,
      ccb: 3,
      cib: 3,
      cmbc: 2,
      guangda: 1,
      guangfa: 1,
      hengfeng: 3,
      huaxia: 1,
      icbc: 1,
      pingan: 1,
      psbc: 2,
      shanghai: 3,
      spd: 3,
      zhaoshang: 1,
      zheshang: 1,
      zhongxin: 1
    },
    bankListData: [],
    password: '',
    showPasswdBox: false,
    bankCardId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (UserManage.getUserInfoBykey("isSetPassWord")) {
      this.setData({
        isSetPassWord: UserManage.getUserInfoBykey("isSetPassWord"),
      })
    }
    this.getBankCardAndPasswdStatus();
  },
  //更换银行卡
  changeBank(e) {
    let bankCardId = e.currentTarget.dataset.id;
    this.setData({
      bankCardId: bankCardId
    })
    if (this.data.isSetPassWord == 1) {
      this.setData({
        showPasswdBox: true,
      })
    } else {
      wx.navigateTo({
        url: '../basicPassword/basicPassword',
      })
    }
  },
  //监听交易密码
  inputChange(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //忘记密码
  forgetPassword() {
    this.setData({
      password: '',
      showPasswdBox: false
    })
    wx.navigateTo({
      url: '../basicPassword/basicPassword',
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
    this.verityPasswd();
  },
  /**
   * 获取银行列表
   */
  getBankCardAndPasswdStatus() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      openId: this.data.openId
    }
    let _this = this;
    personal.getBankCardAndPasswdStatus(data, function(res) {
      let bankListData = [];
      for (let i = 0; i < res.body.length; i++) {
        res.body[i].cardNum = res.body[i].cardNum.substr(res.body[i].cardNum.length - 4);
        bankListData.push(res.body[i])
      }
      _this.setData({
        bankListData: bankListData
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
   * 验证用户交易密码
   */
  verityPasswd() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      passwd: this.data.password
    }
    let _this = this;
    personal.verityPasswd(data, function(res) {
      _this.setData({
        password: '',
        showPasswdBox: false
      })
      wx.redirectTo({
        url: '../basicBank/basicBank?bankCardId=' + _this.data.bankCardId,
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
              url: '../basicPassword/basicPassword',
            })
          }
        }
      })
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