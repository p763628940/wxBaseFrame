import {
  UserManage
} from '../../../utils/UserManage'
import {
  dialingClick
} from '../../../utils/workPhone.js'
import parameters from '../../../config/constant'
import { share } from "../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: parameters.imgPrefixUrl + 'personal/pa_logo.png',
    tit: parameters.imgPrefixUrl + 'personal/pa_tit.png',
    c1: parameters.imgPrefixUrl + 'personal/pa_icon1.png',
    c2: parameters.imgPrefixUrl + 'personal/pa_icon2.png',
    c3: parameters.imgPrefixUrl + 'personal/pa_icon3.png',
    c4: parameters.imgPrefixUrl + 'personal/pa_icon4.png',
    wxCode: parameters.imgPrefixUrl + 'personal/pa_wxcode.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //图片预览
  previewImage: function(e) {
    wx.previewImage({
      current: this.data.wxCode, // 当前显示图片的http链接
      urls: this.data.wxCode.split(',') // 需要预览的图片http链接列表
    })
  },
  //客服电话
  dialingClick() {
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
  onShareAppMessage: function() {
    return share(UserManage)
  },
})