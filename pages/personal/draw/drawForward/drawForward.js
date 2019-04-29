import {
  UserManage
} from '../../../../utils/UserManage'
import {
  personal
} from "../../../../api/api";
import parameters from '../../../../config/constant'
import {
  share
} from "../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    modalPopShow: false,
    modalTitle: '暂无法提现',
    modalContent: '您的实名认证正在审核中，审核通过后，即可提现',
    modalCancel: '取消',
    modalConfirm: '知道了',
    cancelHide: true,
    confirmHide: true,
    modalContentShow: false,
    flag: 1,
    accountInfo: {
      inWithdrawCash: "0.00",
      settleCash: "0.00",
      totalCash: "0.00",
      freeWithdrawTime: "0",
    },
    certStatus: 0,
    isSetBankCard: '',
    isSetPassWord: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  //提现记录
  drawListJump() {
    wx.navigateTo({
      url: '../drawRecord/drawRecord',
    })
  },
  //提现按钮
  handleDraw() {
    if (this.data.certStatus == 0) { // 未认证
      wx.navigateTo({
        url: '../../basic/basicCert/certFrom/certFrom',
      })
      return false;
    } else if (this.data.certStatus == 10) { //认证中
      this.setData({
        modalPopShow: true,
        modalTitle: '暂无法提现',
        modalContent: '您的专业会员认证正在审核中，审核通过后，即可提现',
        modalConfirm: '知道了',
        cancelHide: false,
      })
      return false;
    } else if (this.data.certStatus == -20) { //认证失败
      this.setData({
        modalPopShow: true,
        modalTitle: '暂无法提现',
        modalContent: '您的专业会员认证失败，请重新申请后，再提现',
        modalConfirm: '重新申请',
        cancelHide: false,
        flag: 2
      })
      return false;
    } else if (this.data.isSetBankCard != 1) { // 未设置银行卡
      wx.navigateTo({
        url: '../../basic/basicBank/basicBank',
      })
      return false;
    } else if (this.data.isSetPassWord != 1) { // 未设置交易密码
      wx.navigateTo({
        url: '../../basic/basicPassword/basicPassword',
      })
      return false;
    } else if (this.data.accountInfo.freeWithdrawTime == 0 && this.data.certStatus == 20) { //超过3次收取手续费
      this.setData({
        modalPopShow: true,
        modalTitle: '',
        modalContent: '',
        modalContentShow: true,
        modalConfirm: '仍要提现',
        cancelHide: false,
        flag: 3
      })
      return false;
    } else {
      wx.navigateTo({
        url: '../drawBank/drawBank',
      })
      return false;
    }
  },
  //弹窗取消按钮
  publicCancel() {
    this.setData({
      modalPopShow: false,
    })
  },
  //弹窗确认按钮
  publicConfirm() {
    if (this.data.flag == 2) {
      wx.navigateTo({
        url: '../../basic/basicCert/certFrom/certFrom',
      })
      this.setData({
        modalPopShow: false,
      })
    } else if (this.data.flag == 3) {
      wx.navigateTo({
        url: '../drawBank/drawBank',
      })
      this.setData({
        modalPopShow: false,
      })
    } else {
      this.setData({
        modalPopShow: false,
      })
    }
  },
  /**
   * 获得账户信息接口
   */
  getCashAccountInfo() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
    }
    let _this = this;
    personal.getCashAccountInfo(data, function(res) {
      _this.setData({
        accountInfo: res.body
      })
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
    this.setData({
      certStatus: wx.getStorageSync("userInfo").certStatus,
      isSetBankCard: wx.getStorageSync("userInfo").isSetBankCard || '',
      isSetPassWord: wx.getStorageSync("userInfo").isSetPassWord || '',
    })
    this.getCashAccountInfo();
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