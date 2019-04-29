import {
  UserManage
} from '../../../../utils/UserManage'
import {
  personal
} from "../../../../api/api";
import parameters from '../../../../config/constant'
var dateTimePicker = require('../../../../utils/dateTimePicker.js');
import { share } from "../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screen: parameters.imgPrefixUrl + 'icon/screen.png',
    empty: parameters.imgPrefixUrl + 'icon/empty2.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    conditionText: '筛选',
    dateTimeArray: [],
    dateTime: [],
    startYear: 2000,
    endYear: 2050,
    totalCash: '0.00',
    dataListBody: '',
    dataList: [],
    pageNo: 1,
    pageSize: 10,
    scrollHeight: 0,
    loadingDom: false,
    noMoreShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取完整的年月，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
  },
  //日期选择器
  changeDateTime(e) {
    this.resetParam();
    this.setData({
      dateTime: e.detail.value,
      conditionText: this.data.dateTimeArray[0][e.detail.value[0]] + '-' + this.data.dateTimeArray[1][e.detail.value[1]]
    });

    this.getCashWithdrawHistory(this.data.conditionText, this.data.pageNo)
  },
  //数据初始化
  resetParam() {
    this.setData({
      dataListBody: '',
      dataList: [],
      pageNo: 1,
      loadingDom: false,
      noMoreShow: false,
    })
  },
  /**
   * 提现记录接口
   */
  getCashWithdrawHistory(dataTime, pageNo) {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      date: dataTime || '',
      pageNo: pageNo || this.data.pageNo,
      pageSize: this.data.pageSize || 10,
    }
    let _this = this;
    personal.getCashWithdrawHistory(data, function(res) {
      _this.setData({
        dataListBody: res.body,
        totalCash: res.body.totalCash,
      });
      if (res.body.dataList.length <= _this.data.pageSize && res.body.dataList.length > 0) {
        for (let i = 0; i < res.body.dataList.length; i++) {
          _this.data.dataList.push(res.body.dataList[i])
        }
        _this.setData({
          dataList: _this.data.dataList,
        });
      } else {
        _this.setData({
          loadingDom: false,
          noMoreShow: false,
        })
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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight,
        })
      }
    })
    that.getCashWithdrawHistory('', that.data.pageNo)
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
   * 页面上拉触底事件的处理函数scrollLower  onReachBottom
   */
  scrollLower: function() {
    if (this.data.dataListBody != '' && this.data.dataListBody.totalRow > 0) {
      var totalpage = Math.ceil(this.data.dataListBody.totalRow / this.data.dataListBody.pageSize)
      if (this.data.dataListBody.pageNo < totalpage) {
        this.data.pageNo = this.data.pageNo + 1
        this.setData({
          loadingDom: true,
          noMoreShow: false,
        })
        this.getCashWithdrawHistory('', this.data.pageNo);
      } else {
        this.setData({
          loadingDom: false,
          noMoreShow: true,
        })
      }
    }
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