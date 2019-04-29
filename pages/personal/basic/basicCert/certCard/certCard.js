import {
  UserManage
} from '../../../../../utils/UserManage'
import {
  personal
} from "../../../../../api/api";
import parameters from '../../../../../config/constant'
import { share } from "../../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree: parameters.imgPrefixUrl + 'icon/agree_on.png',
    agreeH: parameters.imgPrefixUrl + 'icon/agree.svg',
    card1: parameters.imgPrefixUrl + 'personal/pb_cert_card1.png',
    card2: parameters.imgPrefixUrl + 'personal/pb_cert_card2.png',
    default1: parameters.imgPrefixUrl + 'personal/pb_cert_decard1.png',
    default2: parameters.imgPrefixUrl + 'personal/pb_cert_decard2.png',
    close: parameters.imgPrefixUrl + 'icon/close_white.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
    idName: '',
    idNo: '',
    certStatus: '',
    agreeStatus: true,
    disabled: true,
    idPicPerson: '',
    idPicNation: '',
    isShow1: true,
    isShow2: true,
    cardScrollBox: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.aiBaoData) {
      let aiBaoData = JSON.parse(options.aiBaoData);
      this.setData({
        idName: aiBaoData.idName,
        idNo: aiBaoData.idNo,
      })
    } else {
      if (UserManage.getUserInfoBykey("idName") && UserManage.getUserInfoBykey("idNo")) {
        this.setData({
          idName: aiBaoData.idName,
          idNo: aiBaoData.idNo,
        })
      }
    }
  },
  //身份证正面照
  frontimage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        //图片上传服务器
        wx.uploadFile({
          url: 'https://utils.aibaoxian.com/upLoadFileService?systemId=S10000131',
          filePath: tempFilePaths[0],
          name: 'idCard',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success(res) {
            if (res.statusCode = 200) {
              let data = JSON.parse(res.data)
              let fileCode = data.body.fileCode;
              let saveFileName = data.body.fileInfo[0].saveFileName
              let idPicPerson = 'https://utils.aibaoxian.com/file/' + fileCode + '_' + saveFileName;
              that.setData({
                idPicPerson: idPicPerson,
                isShow1: false
              })

              if (that.data.idPicPerson != '' && that.data.idPicNation != '') {
                that.setData({
                  disabled: false
                })
              }
            }
          },
          fail(res) {
            wx.showToast({
              title: '上传身份证人像面失败',
              icon: 'none',
              duration: 1000
            })
          },
        })
      }
    })
  },
  //身份证反面照
  reciteimage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        let tempFilePaths = res.tempFilePaths;
        //图片上传服务器
        wx.uploadFile({
          url: 'https://utils.aibaoxian.com/upLoadFileService?systemId=S10000131',
          filePath: tempFilePaths[0],
          name: 'idCard',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success(res) {
            if (res.statusCode = 200) {
              let data = JSON.parse(res.data)
              let fileCode = data.body.fileCode;
              let saveFileName = data.body.fileInfo[0].saveFileName
              let idPicNation = 'https://utils.aibaoxian.com/file/' + fileCode + '_' + saveFileName;
              that.setData({
                idPicNation: idPicNation,
                isShow2: false
              })

              if (that.data.idPicPerson != '' && that.data.idPicNation != '') {
                that.setData({
                  disabled: false
                })
              }
            }
          },
          fail(res) {
            wx.showToast({
              title: '上传身份证人像面失败',
              icon: 'none',
              duration: 1000
            })
          },
        })
      }
    })
  },
  //协议
  changeState() {
    if (this.data.agreeStatus == true) {
      this.setData({
        agreeStatus: false
      })
    } else {
      this.setData({
        agreeStatus: true
      })
    }
  },
  //代理人资质查询授权书
  introduceJump() {
    wx.navigateTo({
      url: '../certAuthorize/certAuthorize',
    })
  },
  //提交审核
  btnclick() {
    if (!this.data.idPicPerson || !this.data.idPicNation) {
      wx.showToast({
        title: '请先上传身份证照片！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!this.data.agreeStatus) {
      wx.showToast({
        title: '请阅读代理人资质查询授权书！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    //接口
    this.showIdPic();
  },
  //活动规则隐藏显示
  cardDemoClick() {
    if (this.data.cardScrollBox == true) {
      this.setData({
        cardScrollBox: false
      })
    } else {
      this.setData({
        cardScrollBox: true
      })
    }
  },
  /**
   * 用户提交认证状态信息
   */
  showIdPic() {
    let data = {
      systemId: this.data.systemId,
      channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
      userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
      idName: this.data.idName,
      idNo: this.data.idNo,
      idPicPerson: this.data.idPicPerson,
      idPicNation: this.data.idPicNation
    }
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    personal.showIdPic(data, function (res) {
      wx.hideLoading();
      _this.setData({
        certStatus: res.body.certStatus
      })
      UserManage.updateCurrentUserInfo("certStatus", res.body.certStatus);
      wx.navigateTo({
        url: '../certStatus/certStatus?certStatus=' + res.body.certStatus,
      })
    }, function (res) {
      wx.showToast({
        title: res.head.errorMessage,
        icon: 'none',
        duration: 1000
      });
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return share(UserManage)
  },
})
