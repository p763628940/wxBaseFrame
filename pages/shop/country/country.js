import {
  countryList
} from '../../../utils/country'

const regeneratorRuntime = require('../../../lib/regenerator-runtime/runtime-module');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    letter: [],
    countryList: countryList,
    height: 640,
    toView: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height: app.globalData.getSystemInfoSync.screenHeight
    })
  },
  //区号选择
  countryNumber(e) {
    let code = e.currentTarget.dataset.code;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      prevPage.setData({
          areaCode: code
      })

      wx.navigateBack();   //返回上一个页面
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let arr = this.generateBig_1();
    this.setData({
      letter: arr
    })

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
    return onShareAppMessage()
  },
  generateBig_1() {
    var str = [];
    for (var i = 65; i < 91; i++) {
      str.push(String.fromCharCode(i));
    }
    return str;
  },
  setFlag(e) {
    let target = e.target.dataset;


    this.setData({
      toView: target.letter
    })
  }
})
