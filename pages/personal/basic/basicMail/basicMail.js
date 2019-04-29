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
    error: parameters.imgPrefixUrl + 'icon/error.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    email: '',
    closeBtn: false,
    disabled: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.email) {
      this.setData({
        email: options.email,
        closeBtn: true,
        disabled: false,
      })
    }else{
      if (UserManage.getUserInfoBykey("email")){
        this.setData({
          email: UserManage.getUserInfoBykey("email"),
          closeBtn: true,
          disabled: false,
        })
      }
    }
  },
  //昵称监听
  mailWatch(e) {
    let value = e.detail.value;
    let cursor = e.detail.cursor;
    let _this = this;
    if (value != '') {
      _this.setData({
        email: value,
        closeBtn: true,
        disabled: false,
      })
    } else {
      _this.setData({
        email: '',
        closeBtn: false,
        disabled: true,
      })
    }
  },
  //清除按钮
  closeBtnClick() {
    this.setData({
      email: '',
      closeBtn: false,
      disabled: true,
    })
  },
  //确认按钮
  handleEmail() {
    if (this.data.email.length == 0) {
      wx.showToast({
        title: '请输入常用邮箱',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.emailVerification(this.data.email).veCode) {
      wx.showToast({
        title: '邮箱有误，请重新输入',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    this.completeUserInfo();
  },
  /**
   * 更新用户信息接口
   */
  completeUserInfo() {
    let data = {
      userInfo: {
        systemId: this.data.systemId,
        channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
        userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
        email: (this.data.email).replace(/(^\s*)|(\s*$)/g, "")
      }
    }
    let _this = this;
    personal.completeUserInfo(data, function(res) {
      wx.showToast({
        title: '设置邮箱成功',
        icon: 'none',
        duration: 100
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1,
        })
      }, 200)
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
  onShareAppMessage: function () {
    return share(UserManage)
  },
})