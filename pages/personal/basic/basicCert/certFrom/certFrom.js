import {
  UserManage
} from '../../../../../utils/UserManage'
import {
  personal
} from "../../../../../api/api";
import {
  verification
} from '../../../../../utils/verification'
import parameters from '../../../../../config/constant'
import {
  getPage,
  share
} from "../../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: parameters.imgPrefixUrl + 'personal/pb_cert_status5.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    idName: '',
    idNo: '',
    disabled: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.pageId) {
      UserManage.point('E0401', options.pageId, 'E04')
    }
  },
  //真实姓名监听
  nameWatch(e) {
    let value = e.detail.value;
    let cursor = e.detail.cursor;
    let _this = this;
    if (value != '') {
      _this.setData({
        idName: value
      })
    } else {
      _this.setData({
        idName: ''
      })
    }

    if (value != '' && _this.data.idNo != '') {
      _this.setData({
        disabled: false
      })
    } else {
      _this.setData({
        disabled: true
      })
    }
  },
  //身份证号监听
  cardWatch(e) {
    let value = e.detail.value;
    let cursor = e.detail.cursor;
    let _this = this;
    if (value != '') {
      _this.setData({
        idNo: value
      })
    } else {
      _this.setData({
        idNo: ''
      })
    }

    if (value != '' && _this.data.idName != '') {
      _this.setData({
        disabled: false
      })
    } else {
      _this.setData({
        disabled: true
      })
    }
  },
  //确认无误，下一步
  btnclick() {
    if (this.data.idName == '' || this.data.idName.length == 0) {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.nameVerification(this.data.idName).veCode) {
      wx.showToast({
        title: '真实姓名有误，请重新输入',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (this.data.idNo == '' || this.data.idNo.length == 0) {
      wx.showToast({
        title: '请输入身份证号码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if (!verification.idCardVerification(this.data.idNo).veCode) {
      wx.showToast({
        title: '身份证号码有误，请重新输入',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    // 跳转上传身份证
    let aiBaoData = {
      idName: this.data.idName,
      idNo: this.data.idNo
    }
    aiBaoData = JSON.stringify(aiBaoData);
    wx.navigateTo({
      url: '../certCard/certCard?aiBaoData=' + aiBaoData,
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