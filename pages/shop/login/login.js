import {aiDoctor} from "../../../api/api";
import {UserManage} from '../../../utils/UserManage'
import {config} from "../../../config/config";
const regeneratorRuntime = require('./../../../lib/regenerator-runtime/runtime-module');
const app = getApp()
let imgUrl='https://aimall.zhongyuanib.com/static/ai/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: imgUrl + 'active/videoMini/login_banner.png',
    systemId: 'S10000089',
    channelId: 'CH10000432',
    userId: '',
    areaCode: '86',
    pageSource: 'home',
    btnText: '登录/注册',
    canSubmit: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.pageSource) {
      this.setData({
        pageSource: options.pageSource,
      })
    }
    if (options.systemId) {
      this.setData({
        systemId: options.systemId,
      })
    }
    if (options.channelId) {
      this.setData({
        channelId: options.channelId,
      })
    }
    if (options.userId) {
      this.setData({
        userId: options.userId,
      })
    } else {
      this.setData({
        userId: UserManage.getUserInfoBykey("userId"),
      })
    }


    if (options.code) {
      this.setData({
        areaCode: options.code
      })
    }
  },
  //form表单提交
  myLoginValue: function (e) {
    console.log(e)
    let authCode = e.detail.authCode;
    let mobile = e.detail.mobile;
    let _this = this;
    let canSubmit = _this.data.canSubmit;
    if (!canSubmit) {
      return
    }
    _this.setData({
      canSubmit: false
    });
    //接口调用
    let data = {
        systemId:config.parameters.systemId,
        channelId: UserManage.getUserInfoBykey("channelId"),
        userId: UserManage.getUserInfoBykey("userId"),
        openId: UserManage.getUserInfoBykey("openId")||'',
      mobileAreaCode: _this.data.areaCode,
      mobile: mobile,
      verifyCode: authCode,
      nickName: UserManage.getUserInfoBykey("nickName"),
      avatarUrl: UserManage.getUserInfoBykey("avatarUrl"),
    };
      aiDoctor.registNewUser(data, function (resp) {

      _this.setData({
        canSubmit: true
      });
      UserManage.updateCurrentUserInfo('mobile', mobile);
      wx.navigateBack({
        delta: 1,
      })
    }, function (head) {
      _this.setData({
        canSubmit: true
      });
      if (head.errorCode === '508' || head.errorCode === '509') {
        wx.showToast({
          title: '验证码有误，请重新输入',
          icon: 'none',
          duration: 1500,
          mask: true
        });
      } else {
        wx.showToast({
          title: head.errorMessage,
          icon: 'none',
          duration: 1500,
          mask: true
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
