import {
  UserManage
} from '../../../utils/UserManage'
import {
  personal
} from "../../../api/api";
import parameters from '../../../config/constant'
import {
  dialingClick
} from '../../../utils/workPhone.js'
import { share } from "../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    pageId: 1,
    textareaValue: '',
    fontNum: 0,
    inputValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * textarea监听事件
   */
  textareaMonitor: function(e) {
    this.setData({
      textareaValue: e.detail.value,
      fontNum: e.detail.cursor,
      userId: this.data.userId
    })
  },
  /**
   * input监听事件
   */
  inputMonitor: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 提交反馈
   */
  formSubmit: function(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (this.data.fontNum < 10) {
      wx.showToast({
        title: '请输入不少于10个字的描述',
        icon: 'none',
        duration: 1000
      });
    } else {
      let data = {
        systemId: this.data.systemId,
        channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
        userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
        pageId: this.data.pageId,
        userName: this.data.nickName,
        feedwords: this.data.textareaValue,
        phonemail: this.data.inputValue
      }
      let _this = this;
      personal.feedback(data, function(res) {
        wx.showToast({
          title: '提交成功，感谢您的反馈',
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
    }
  },
  //拨打电话
  dialingClick: function(e) {
    dialingClick();
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