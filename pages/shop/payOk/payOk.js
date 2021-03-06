import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {aiDoctor} from "../../../api/api";
var Base64 = require('../../../lib/js-base64/base64.modified');
const regeneratorRuntime = require('./../../../lib/regenerator-runtime/runtime-module')
const app = getApp()

let imgUrl='https://aimall.zhongyuanib.com/static/ai/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      payok: config.parameters.imgPrefixUrl + 'shop/payok.png',
    itemId: 0,
    itemCount: 1,
    amount: 0,
    unitPrice: 0,
    cardDetail: {},
    payDisabled: false,
  },
  /**
   * 减少数量限制
   */
  minusItemCount: function(e) {
    let itemCountNum = this.data.itemCount
    if (itemCountNum > 1) {
      itemCountNum = itemCountNum - 1
      let amountNUm = (this.data.unitPrice * itemCountNum).toFixed(2);
      this.setData({
        itemCount: itemCountNum,
        amount: amountNUm
      })
      this.bindItemCountInput(itemCountNum)
    }
  },
  /**
   * 增加数量
   */
  addItemCount: function(e) {
    if (this.data.itemCount < 999) {
      let itemCountNum = this.data.itemCount + 1
      let amountNUm = (this.data.unitPrice * itemCountNum).toFixed(2);
      this.setData({
        itemCount: itemCountNum,
        amount: amountNUm
      })
      this.bindItemCountInput(itemCountNum)
    }
  },
  /**
   * 绑定数量的输入
   */
  bindItemCountInput(e) {
    this.setData({
      itemCount: e
    })
    if (e.type == 'change') {
      this.setData({
        itemCount: e.detail.value
      })
    }
    //判断减号数量替换图片
    if (this.data.itemCount < 1 || this.data.itemCount == 1) {
      this.setData({
        itemCount: 1,
        minus: imgUrl + 'active/videoMini/icon/minus.png',
        pushsActive: imgUrl + 'active/videoMini/icon/push_active.png',
      })
    } else {
      this.setData({
        minus: imgUrl + 'active/videoMini/icon/minus_active.png',
      })
    }
    //判断加号数量替换图片
    if (this.data.itemCount > 999) {
      this.setData({
        itemCount: 999,
        minus: imgUrl + 'active/videoMini/icon/minus_active.png',
        pushsActive: imgUrl + 'active/videoMini/icon/push.png',
      })
      wx.showToast({
        title: '最多可以购买999张哦',
        icon: 'none',
        duration: 1000
      });
    }else{
      this.setData({
        pushsActive: imgUrl + 'active/videoMini/icon/push_active.png',
      })
    }
    //计算总价
    let itemCount = this.data.itemCount
    let amountNUm = (this.data.unitPrice * itemCount).toFixed(2);
    this.setData({
      itemCount: itemCount,
      amount: amountNUm
    })
  },
  /**
   * 跳转进入支付页面
   */
  entryPayMiniProgramPage(e) {
    let cardInfo = e.currentTarget.dataset;
    let productStandard = e.target.dataset.status
    if (productStandard == 'daily') {

    } else if (productStandard == 'quarter') {

    } else {

    }

    let _this = this;
    let reqData = {
      systemId: constants.systemId,
      channelId: UserManage.getUserInfoBykey("channelId"),
      userId: UserManage.getUserInfoBykey("userId"),
      openId: UserManage.getUserInfoBykey("openId"),
      payInfo: {
        partnerItemId: parseInt(cardInfo.itemId),
        itemPrice: parseFloat(cardInfo.itemPrice),
        itemCount: parseInt(cardInfo.itemCount),
        totalPrice: parseFloat(cardInfo.amount)
      },
      callBackUrl: '/pages/cardCore/cardList/cardList'
    }
      aiDoctor.getPayUrl(reqData, function(respBody) {
      // console.log(respBody)
      // wx.navigateTo({
      //   url: respBody.payUrl,
      // })

      let aiBaoData = Base64.encode(JSON.stringify(respBody))
          _this.pay(respBody);
      _this.setData({
        payDisabled: true
      })
    }, function(respBody) {
      // wx.showToast({
      //   title: '支付失败，请重试',
      //   icon: 'none',
      //   duration: 1000
      // });
      _this.setData({
        payDisabled: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function(options) {
  //   //console.log(options)
  //   this.setData({
  //     itemId: options.itemId
  //   })
  //   this.getProductInfo();
  // },
  //查询商品信息(列表/详情）
  getProductInfo() {
    let _this = this
    let dataBody = {
      systemId: config.parameters.systemId,
        channelId: UserManage.getUserInfoBykey("channelId"),
        userId: UserManage.getUserInfoBykey("userId"),
      productType: 'videoDoctor',
      partnerItemId: _this.data.itemId
    }
      aiDoctor.getProductInfo( dataBody, function(resp) {
      if (resp.dataList.length == 1) {
        _this.setData({
          cardDetail: resp.dataList[0],
          unitPrice: resp.dataList[0].productPrice,
          amount: resp.dataList[0].productPrice
        })
      } else {
        wx.showToast({
          title: '获取卡信息失败，请稍后重试',
          icon: 'loading',
          duration: constants.showToastDuration,
        });
      }
    }, '获取视频医生卡信息失败')
  },

    // 调用微信支付

    pay(paydata){
        wx.requestPayment({
            'timeStamp': paydata.timeStamp,
            'nonceStr': paydata.nonceStr,
            'package': paydata.package,
            'signType': paydata.signType,
            'paySign': paydata.paySign,
            'success': function(res) {
                console.log(res)
                if (res.errMsg == 'requestPayment:ok') {
                    var pages = getCurrentPages();
                    //当前页面 (wxpay page)
                    var currPage = pages[pages.length - 1];
                    //上一个页面 （index page）
                    var prevPage = pages[pages.length - 2];
                    // console.log(currPage)
                    // console.log(prevPage)
                    prevPage.setData({
                        url: '../cardCore/cardList/cardList',
                    })
                    wx.navigateBack()

                    // wx.redirectTo({
                    //   url: '../cardCore/cardList/cardList',
                    // })
                } else {
                    wx.showToast({
                        title: '支付失败，请重新下单',
                        icon: 'none',
                        duration: 500
                    })
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }, 200)
                }
            },
            'fail': function(res) {
                if (res.errMsg == 'requestPayment:fail cancel') {
                    wx.navigateBack({
                        delta: 1,
                    })
                }
            }
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
  onShareAppMessage: function() {
    return onShareAppMessage()
  }
})
