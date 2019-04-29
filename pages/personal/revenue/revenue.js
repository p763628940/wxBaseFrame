import {
  UserManage
} from '../../../utils/UserManage'
import {
  personal
} from "../../../api/api";
import parameters from '../../../config/constant'
var dateTimePicker = require('../../../utils/dateTimePicker.js');
import {
  share
} from "../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    dowm: parameters.imgPrefixUrl + 'icon/down_gray.png',
    empty: parameters.imgPrefixUrl + 'icon/empty2.png',
    awardTime: '全部月份',
    dateTimeArray: [],
    dateTime: [],
    startYear: 2000,
    endYear: 2050,
    approveStatusList: ['全部状态', '结算中', '已结算', '扣回'],
    approveStatusValue: '0',
    awardTypeList: ['全部奖励', '推广奖励', '邀新奖励'],
    awardTypeValue: '0',
    loadingDom: true,
    noMoreShow: true,
    pageNo: 1,
    pageSize: 10,
    awardType: 0,
    // approveStatus: 0,
    tableList: '',
    dataList: [],
    scrollHeight: 0,
    loadingDom: false,
    noMoreShow: false,
    revenueOn: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.revenueOn)
    if (options.revenueOn) {
      this.setData({
        revenueOn: options.revenueOn
      })
      if (options.revenueOn == 2) {
        this.setData({
          approveStatusValue: '1'
        })
      } else {
        this.setData({
          approveStatusValue: '0'
        })
      }
    }
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
      awardTime: this.data.dateTimeArray[0][e.detail.value[0]] + '-' + this.data.dateTimeArray[1][e.detail.value[1]],
      revenueOn: 1
    });
    this.getInviteFriedAwardList();
  },
  //全部状态
  bindApproveChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.resetParam();
    this.setData({
      approveStatusValue: e.detail.value,
      revenueOn: 2,
      awardType: 0,
    })
    this.getInviteFriedAwardList();
  },
  //全部奖励
  bindAwardChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.resetParam();
    this.setData({
      awardTypeValue: e.detail.value,
      revenueOn: 3,
      awardType: 0,
    })
    if (e.detail.value == '0') {
      this.setData({
        awardType: 0
      })
    }
    if (e.detail.value == '1') {
      this.setData({
        awardType: 11
      })
    }
    if (e.detail.value == '2') {
      this.setData({
        awardType: 12
      })
    }
    this.getInviteFriedAwardList();
  },
  //初始化数据
  resetParam() {
    this.setData({
      tableList: '',
      dataList: [],
      pageNo: 1,
      loadingDom: false,
      noMoreShow: false
    })
  },
  /**
   * 奖励明细列表
   */
  getInviteFriedAwardList(pageNo) {
    let awardTime = '';
    if (this.data.awardTime == '全部月份') {
      awardTime = ''
    } else {
      awardTime = 'EQ' + this.data.awardTime
    }
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      pageNo: pageNo || 1,
      pageSize: this.data.pageSize || 10,
      awardTime: awardTime,
      awardType: parseInt(this.data.awardType), //奖励子类:11推广奖励，12邀新奖励；21：育成奖励22津贴奖励23成就奖励
      approveStatus: parseInt(this.data.approveStatusValue), //审批状态1：结算中，2已结算3扣回
      friendUserId: "",
      source: "All" //空串表示全部奖励，Friends表示出单奖励
    }
    let _this = this;
    personal.getInviteFriedAwardList(data, function(res) {
      _this.setData({
        tableList: res.body
      })
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
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight,
        })
      }
    })
    that.getInviteFriedAwardList();
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
    if (this.data.tableList != '' && this.data.tableList.totalRow > 0) {
      var totalpage = Math.ceil(this.data.tableList.totalRow / this.data.tableList.pageSize)
      if (this.data.tableList.pageNo < totalpage) {
        this.data.pageNo = this.data.pageNo + 1
        this.setData({
          loadingDom: true,
          noMoreShow: false,
        })
        this.getInviteFriedAwardList(this.data.pageNo);
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
  onShareAppMessage: function() {
    return share(UserManage)
  },
})