import {
  UserManage
} from '../../../../utils/UserManage'
import {
  personal
} from "../../../../api/api";
import parameters from '../../../../config/constant'
import {
  verification
} from '../../../../utils/verification'
import {
  share,
  getPage
} from "../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree: parameters.imgPrefixUrl + 'icon/agree_on.png',
    agreeH: parameters.imgPrefixUrl + 'icon/agree.svg',
    tan: parameters.imgPrefixUrl + 'icon/sign_tan.png',
    ar: parameters.imgPrefixUrl + 'icon/left_hui.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    openId: '',
    agreeStatus: true,
    disabled: true,
    idName: '',
    idNo: '',
    isSetPassWord: 0,
    bankListData: [],
    bankList: [],
    bankType: '',
    bankNum: '',
    kaiHuHang: '',
    bankCardId:0,
    goPath: '',
    showScrollBox: true,
    activeRules: [{
      id: 1,
      text: '一个实名认证账户仅能绑定一张银行卡'
    }, {
      id: 2,
      text: '账户内的银行卡也只能绑定持卡人本人的银行卡。'
    }, {
      id: 3,
      text: '获取更多帮助，请致小爱保客服: 010-87152976'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.goPath) {
      this.setData({
        goPath: options.goPath
      })
    }
    if (options.bankCardId){
      this.setData({
        bankCardId: options.bankCardId
      })
    }
    this.getBankList();
  },
  //持卡人说明
  showScrollClick() {
    if (this.data.showScrollBox == true) {
      this.setData({
        showScrollBox: false
      })
    } else {
      this.setData({
        showScrollBox: true
      })
    }
  },
  //选择银行
  bindPickerChange: function(e) {
    this.setData({
      bankType: e.detail.value
    })
  },
  //银行账号监听
  bankWatch(e) {
    let value = e.detail.value;
    this.setData({
      bankNum: value
    })
    if (value != '' && this.data.bankType != '' && this.data.kaiHuHang != '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  //开户行
  bankDetailWatch(e) {
    let value = e.detail.value;
    this.setData({
      kaiHuHang: value
    })
    if (value != '' && this.data.bankType != '' && this.data.bankNum != '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  //用户协议
  platformJump() {
    wx.navigateTo({
      url: '../basicPlatform/basicPlatform',
    })
  },
  //确认添加
  btnclick() {
    let bankId = this.data.bankListData[this.data.bankType].bankId;
    if (this.data.bankType) {
      if (!bankId) {
        wx.showToast({
          title: '请选择银行',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else if (bankId == "-100") {
        wx.showToast({
          title: '请选择银行',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
    } else {
      wx.showToast({
        title: '请选择银行',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.bankNum == "") {
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!verification.bandNoVerification(this.data.bankNum).veCode) {
      wx.showToast({
        title: '银行卡号格式有误',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.kaiHuHang == "") {
      wx.showToast({
        title: '请填写详细开户行',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    this.getBankListBind();
  },
  /**
   * 获取银行列表
   */
  getBankList() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      openId: UserManage.getUserInfoBykey("openId") || this.data.openId
    }
    let _this = this;
    personal.getBankList(data, function(res) {
      let dataList = res.body;
      let bankList = [];
      if (dataList) {
        dataList.forEach(item => {
          bankList.push(item.bankName);
        });
        _this.setData({
          bankListData: res.body,
          bankList: bankList
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
   * 用户绑定银行卡
   */
  getBankListBind() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      bankCardId: parseInt(this.data.bankCardId),
      cardNum: (this.data.bankNum).replace(/(^\s*)|(\s*$)/g, ""),
      kaiHuHang: this.data.kaiHuHang,
      bankId: this.data.bankListData[this.data.bankType].bankId
    }
    let _this = this;
    personal.getBankListBind(data, function(res) {
      wx.showToast({
        title: '绑卡成功',
        icon: 'none',
        duration: 1000
      })
      // 手动更改标记
      UserManage.updateCurrentUserInfo('isSetBankCard', 1);
      UserManage.updateCurrentUserInfo('cardNum', _this.data.bankNum);
      UserManage.updateCurrentUserInfo('bankName', _this.data.bankListData[_this.data.bankType].bankName);
      let getPath = getPage(2).route;
      let getIndex = getPath.lastIndexOf("\/");
      getPath = getPath.substring(getIndex + 1, getPath.length);

      if (_this.data.isSetPassWord == 1) { // 设置了交易密码 
        if (getPath == 'drawForward'){
          wx.redirectTo({
            url: '../draw/drawBank/drawBank',
          })
        }else{
          wx.navigateBack({
            delta: 1,
          })
        }
      } else {
        wx.redirectTo({
          url: '../basicPassword/basicPassword',
        })
      }
    }, function(res) {
      wx.showToast({
        title: res.head.errorMessage,
        icon: 'none',
        duration: 1000
      });
    })
  },
  /**
   * 显示认证信息
   */
  showStatus() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
    }
    let _this = this;
    personal.showStatus(data, function(res) {
      _this.setData({
        idName: res.body.idName || UserManage.getUserInfoBykey("idName"),
        idNo: res.body.idNo || UserManage.getUserInfoBykey("idNo")
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
    if (UserManage.getUserInfoBykey("isSetPassWord")) {
      this.setData({
        isSetPassWord: UserManage.getUserInfoBykey("isSetPassWord"),
      })
    }
    this.showStatus();
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