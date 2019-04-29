import {
  UserManage
} from '../../../utils/UserManage'
import {
  personal
} from "../../../api/api";
import {
  dialingClick
} from '../../../utils/workPhone.js'
import parameters from '../../../config/constant'
import { share, getPage } from "../../../utils/util";
const regeneratorRuntime = require('./../../../lib/regenerator-runtime/runtime-module');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: parameters.imgPrefixUrl + 'icon/head.png',
    signStatus: parameters.imgPrefixUrl + 'personal/ps_sign.png',
    arrowW: parameters.imgPrefixUrl + 'icon/left_white.png',
    arrowH: parameters.imgPrefixUrl + 'icon/left_hui.png',
    icon1: parameters.imgPrefixUrl + 'personal/ps_icon1.png',
    icon2: parameters.imgPrefixUrl + 'personal/ps_icon2.png',
    icon3: parameters.imgPrefixUrl + 'personal/ps_icon3.png',
    icon4: parameters.imgPrefixUrl + 'personal/ps_icon4.png',
    icon5: parameters.imgPrefixUrl + 'personal/ps_icon5.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    nickName: '',
    avatarUrl: '',
    mobile: '',
    certStatus: 0,
    certStatusName: '未认证',
    registerShow: false,
    accountInfo: {
      inWithdrawCash: "0.00",
      settleCash: "0.00",
      totalCash: "0.00"
    },
    totalRow: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  //去认证按钮
  sertOnclick() {
    wx.navigateTo({
      url: '../basic/basicCert/certFrom/certFrom?pageId=1',
    })
  },
  //登录注册
  handleRegister() {
    wx.navigateTo({
      url: '../basic/basicLogin/basicLogin',
    })
  },
  //个人基本信息
  inforClick() {
    if (this.data.registerShow == true) {
      wx.navigateTo({
        url: '../basic/basicLogin/basicLogin',
      })
    } else {
      wx.navigateTo({
        url: '../basic/basicInfo/basicInfo',
      })
    }
  },
  //可提现
  linkToDrawForward() {
    if (this.data.registerShow == true) {
      wx.navigateTo({
        url: '../basic/basicLogin/basicLogin',
      })
    } else {
      wx.navigateTo({
        url: '../draw/drawForward/drawForward',
      })
    }
  },
  //结算中，累计收入
  linkToDrawReward(e) {
    let revenueOn = e.currentTarget.dataset.id
    if (this.data.registerShow == true) {
      wx.navigateTo({
        url: '../basic/basicLogin/basicLogin',
      })
    } else {
      wx.navigateTo({
        url: '../revenue/revenue?revenueOn=' + revenueOn,
      })
    }
  },
  //客户管理
  customerJump(e) {
    if (this.data.registerShow == true) {
      wx.navigateTo({
        url: '../basic/basicLogin/basicLogin',
      })
    } else {
      UserManage.point('E0201', '', 'E02')
      wx.navigateTo({
        url: '../../shop/customerManage/customerManage',
      })
    }
  },
  //邀请有礼
  invitationJump() {
    if (this.data.registerShow == true) {
      wx.navigateTo({
        url: '../basic/basicLogin/basicLogin',
      })
    } else {
      UserManage.point('E0202', '', 'E02')
      wx.navigateTo({
        url: '../../shop/invite/invite',
      })
    }
  },
  //联系客服
  contactJump() {
    dialingClick();
  },
  //意见反馈
  feedbackJump() {
    if (this.data.registerShow == true) {
      wx.navigateTo({
        url: '../basic/basicLogin/basicLogin',
      })
    } else {
      wx.navigateTo({
        url: '../feedback/feedback',
      })
    }
  },
  //关于我们
  aboutJump() {
    wx.navigateTo({
      url: '../about/about',
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
        _this.setData({
          registerShow: true
        })
        wx.setStorageSync("login", true);
      } else {
        //已登陆
        _this.setData({
          registerShow: false,
          nickName: res.body.nickName,
          avatarUrl: res.body.avatarUrl,
          mobile: res.body.mobile,
          certStatus: res.body.certStatus,
          certStatusName: res.body.certStatusName
        })
        wx.setStorageSync("login", false);
        _this.getCashAccountInfo();
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
   * 获得账户信息接口
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
    })
  },
  /**
   * 代理人客户列表
   */
  getCustomerList() {
    let data = {
      systemId: parameters.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      pageSize: 1,
      pageNo: 1
    }
    let _this = this;
    personal.getCustomerList(data, function(res) {
      _this.setData({
        totalRow: res.body.totalRow
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
    this.getUserInfo();
    this.getCustomerList();
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