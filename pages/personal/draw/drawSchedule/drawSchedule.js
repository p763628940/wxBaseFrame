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
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    withdrawId: '',
    withdrawData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.withdrawId) {
      this.setData({
        withdrawId: options.withdrawId
      })
      this.showWithDrawRecord(options.withdrawId);
    }
  },
  //完成
  linkToIndex() {
    // wx.redirectTo({
    //   url: '../drawForward/drawForward',
    // })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 提现结果页面
   */
  showWithDrawRecord(withdrawId) {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      withdrawId: withdrawId || ''
    }
    let _this = this;
    personal.showWithDrawRecord(data, function (res) {
      _this.setData({
        withdrawData: res.body
      })
    }, function (res) {
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
    return share(UserManage)
  },
})