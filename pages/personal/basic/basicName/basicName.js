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
    nickName: '',
    closeBtn: false,
    disabled: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.nickName) {
      this.setData({
        nickName: options.nickName,
        closeBtn: true,
        disabled: false,
      })
    }else{
      if (UserManage.getUserInfoBykey("nickName")){
        this.setData({
          nickName: UserManage.getUserInfoBykey("nickName"),
          closeBtn: true,
          disabled: false,
        })
      }
    }
  },
  //昵称监听
  nameWatch(e) {
    let value = e.detail.value;
    let cursor = e.detail.cursor;
    let _this = this;
    if (value != '') {
      _this.setData({
        nickName: value,
        closeBtn: true,
        disabled: false,
      })
    } else {
      _this.setData({
        nickName: '',
        closeBtn: false,
        disabled: true,
      })
    }
  },
  //清除按钮
  closeBtnClick() {
    this.setData({
      nickName: '',
      closeBtn: false,
      disabled: true,
    })
  },
  //确认按钮
  handleNickName() {
    if (this.data.nickName.length == 0) {
      wx.showToast({
        title: '请设置昵称',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.nameVerification(this.data.nickName).veCode) {
      wx.showToast({
        title: '昵称有误，请重新输入',
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
        nickName: (this.data.nickName).replace(/(^\s*)|(\s*$)/g, "") || UserManage.getUserInfoBykey("nickName")
      }
    }
    let _this = this;
    personal.completeUserInfo(data, function(res) {
      wx.showToast({
        title: '设置昵称成功',
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