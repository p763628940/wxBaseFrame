import {
  UserManage
} from '../../../../utils/UserManage'
import {
  personal
} from "../../../../api/api";
import parameters from '../../../../config/constant'
import { share } from "../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: parameters.imgPrefixUrl + 'icon/head.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    userInfo: {},
    bankShow: false,
    cardNum: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (UserManage.getUserInfoBykey("userInfo")) {
      this.setData({
        userInfo: UserManage.getUserInfoBykey("userInfo")
      })
    }
  },
  //头像
  handleHead() {
    let avatarUrl = this.data.userInfo.avatarUrl;
    wx.navigateTo({
      url: '../basicHead/basicHead?avatarUrl=' + avatarUrl,
    })
  },
  //昵称
  handleNickname() {
    let nickName = this.data.userInfo.nickName;
    wx.navigateTo({
      url: '../basicName/basicName?nickName=' + nickName,
    })
  },
  //注册手机号
  handleMobile() {
    let mobile = this.data.userInfo.mobile;
    wx.navigateTo({
      url: '../basicPhone/basicPhone?mobile=' + mobile,
    })
  },
  //邮箱
  handleEmail() {
    let email = this.data.userInfo.email;
    wx.navigateTo({
      url: '../basicMail/basicMail?email=' + email,
    })
  },
  //实名认证
  handleSert() {
    let certStatus = this.data.userInfo.certStatus;
    if (this.data.userInfo.certStatus == 0) {
      wx.navigateTo({
        url: '../basicCert/certFrom/certFrom?pageId=2',
      })
    } else if (this.data.userInfo.certStatus == 10) {
      //审核中
      wx.navigateTo({
        url: '../basicCert/certStatus/certStatus?certStatus=' + certStatus,
      })
    } else if (this.data.userInfo.certStatus == 20) {
      //成功
      wx.navigateTo({
        url: '../basicCert/certStatus/certStatus?certStatus=' + certStatus,
      })
    } else if (this.data.userInfo.certStatus == -20) {
      //失败
      wx.navigateTo({
        url: '../basicCert/certStatus/certStatus?certStatus=' + certStatus,
      })
    }
  },
  //银行卡
  handleBank() {
    if (this.data.userInfo.isSetBankCard == 1) {
      wx.navigateTo({
        url: '../basicBankList/basicBankList',
      })
    } else {
      wx.navigateTo({
        url: '../basicBank/basicBank',
      })
    }
  },
  //交易密码
  handlePassword() {
    wx.navigateTo({
      url: '../basicPassword/basicPassword',
    })
  },
  /**
   * 获得用户信息接口
   */
  getUserInfo() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      openId: UserManage.getUserInfoBykey("openId")
    }
    let _this = this;
    personal.getUserInfo(data, function(res) {
      for (let key in res.body) {
        if (res.body[key] != '' || res.body[key] != undefined) {
          UserManage.updateCurrentUserInfo(key, res.body[key])
        }
      }
      if (res.body.mobile == '') {
        //未登陆
        wx.setStorageSync("login", true);
      } else {
        //已登陆
        _this.setData({
          userInfo: res.body
        })
        wx.setStorageSync("login", false);

        if (res.body.isSetBankCard == 1) {
          let cardNum = UserManage.getUserInfoBykey("cardNum");
          cardNum = cardNum.substr(cardNum.length - 4);
          _this.setData({
            cardNum: cardNum
          })
        }
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
    this.getUserInfo();
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