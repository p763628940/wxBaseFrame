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
  share,
  getPage
} from "../../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status1: parameters.imgPrefixUrl + 'personal/pb_cert_status1.png',
    status2: parameters.imgPrefixUrl + 'personal/pb_cert_status2.png',
    status4: parameters.imgPrefixUrl + 'personal/pb_cert_status4.png',
    arBlue: parameters.imgPrefixUrl + 'icon/left_blue.png',
    head: parameters.imgPrefixUrl + 'icon/head.png',
    label: parameters.imgPrefixUrl + 'personal/ps_sign.png',
    statusImg1: parameters.imgPrefixUrl + 'personal/pb_cert_img1.png',
    statusImg2: parameters.imgPrefixUrl + 'personal/pb_cert_img2.png',
    close: parameters.imgPrefixUrl + 'icon/close_white.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    avatarUrl: '',
    idName: '',
    idNo: '',
    certStatus: 0,
    btnText: '完成',
    certRank: '',
    getPath: '',
    cardSubmitBox: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      avatarUrl: UserManage.getUserInfoBykey("avatarUrl") || parameters.imgPrefixUrl + 'icon/head.png',
      certStatus: UserManage.getUserInfoBykey("certStatus") || 0
    })
    if (options.certStatus) {
      this.setData({
        certStatus: options.certStatus
      })
      if (this.data.certStatus == 10 || this.data.certStatus == 20) {
        this.setData({
          btnText: '完成'
        })
      } else if (this.data.certStatus == -20) {
        this.setData({
          btnText: '重新申请'
        })
      }
    } else {
      if (wx.getStorageSync("userInfo").certStatus) {
        this.setData({
          certStatus: wx.getStorageSync("userInfo").certStatus
        })
        if (this.data.certStatus == 10 || this.data.certStatus == 20) {
          this.setData({
            btnText: '完成'
          })
        } else if (this.data.certStatus == -20) {
          this.setData({
            btnText: '重新申请'
          })
        }
      }
    }
  },
  //确认
  btnclick() {
    if (this.data.certStatus == -20) {
      // wx.redirectTo({
      //   url: '../certFrom/certFrom',
      // })
      if (this.data.getPath == 'certCard') {
        wx.navigateTo({
          url: '../certFrom/certFrom',
        })
      } else {
        wx.redirectTo({
          url: '../certFrom/certFrom',
        })
      }
    } else {
      // console.log(this.data.getPath)
      if (this.data.getPath == 'certCard') {
        // wx.navigateBack({
        //   delta: 3,
        // })
        wx.navigateTo({
          url: '../../../../shop/home/home',
        })
      } else {
        wx.navigateBack({
          delta: 1,
        })
      }

      //  if (this.data.getPath == 'basicInfo') {
      //   wx.navigateBack({
      //     delta: 2,
      //   })
      // } else {
      //   wx.navigateBack({
      //     delta: 1,
      //   })
      // }


      // if (app.globalData.certFromBefore == 'from') {
      //   wx.navigateBack({
      //     delta: 4,
      //   })
      // } else if (app.globalData.certFromBefore == 'status') {
      //   wx.navigateBack({
      //     delta: 2,
      //   })

      // } else if (app.globalData.certFromBefore == 'introduce') {
      //   wx.navigateBack({
      //     delta: 5,
      //   })
      // } else {
      //   if (this.data.getPath == 'certCard') {
      //     wx.navigateBack({
      //       delta: 3,
      //     })
      //   } else if (this.data.getPath == 'basicInfo') {
      //     wx.navigateBack({
      //       delta: 2,
      //     })
      //   } else {
      //     wx.navigateBack({
      //       delta: 1,
      //     })
      //   }
      // }
      app.globalData.certFromBefore = '';
    }
  },
  //推广弹窗隐藏显示
  cardSubmitClick() {
    if (this.data.cardSubmitBox == true) {
      this.setData({
        cardSubmitBox: false
      })
    } else {
      this.setData({
        cardSubmitBox: true
      })
    }
  },
  //马上推广
  drawNowClick() {
    wx.navigateTo({
      url: '../../../../shop/home/home',
    })
  },
  //专业资质会员
  introduceJump() {
    wx.navigateTo({
      url: '../certIntroduce/certIntroduce',
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
      if (res.body.certRank) {
        _this.setData({
          certRank: res.body.certRank
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
    let getPath = getPage(2).route;
    let getIndex = getPath.lastIndexOf("\/");
    getPath = getPath.substring(getIndex + 1, getPath.length);
    this.setData({
      getPath: getPath
    })
    if (this.data.certStatus == 20 && this.data.getPath == 'certCard') {
      this.setData({
        cardSubmitBox: true
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