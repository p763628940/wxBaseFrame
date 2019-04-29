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
    mobile:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.mobile) {
      this.setData({
        mobile: options.mobile
      })
    }else{
      if (UserManage.getUserInfoBykey("mobile")){
        this.setData({
          mobile: UserManage.getUserInfoBykey("mobile")
        })
      }
    }
  },
  //更换手机号
  handleMobile() {
    let mobile = this.data.mobile
    wx.navigateTo({
      url: '../basicPhoneBind/basicPhoneBind?mobile=' + mobile,
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