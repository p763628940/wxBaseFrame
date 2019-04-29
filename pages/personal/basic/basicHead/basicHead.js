import {
  UserManage
} from '../../../../utils/UserManage'
import {
  personal
} from "../../../../api/api";
import parameters from '../../../../config/constant'
import { share } from "../../../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headPoint: parameters.imgPrefixUrl + 'personal/pb_head.png',
    systemId: parameters.systemId,
    channelId: '',
    userId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.avatarUrl) {
      this.setData({
        headPoint: options.avatarUrl
      })
    }else{
      if (UserManage.getUserInfoBykey("avatarUrl")){
        this.setData({
          headPoint: UserManage.getUserInfoBykey("avatarUrl")
        })
      }
    }
  },
  // 切换头像
  changeAvatar: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var headPoint = res.tempFilePaths;
        //图片上传服务器
        wx.uploadFile({
          url: 'https://utils.aibaoxian.com/upLoadFileService?systemId=S10000131',
          filePath: headPoint[0],
          name: 'avatarUrl',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success(res) {
            if (res.statusCode = 200) {
              let data = JSON.parse(res.data)
              let fileCode = data.body.fileCode;
              let saveFileName = data.body.fileInfo[0].saveFileName
              let headPoint = 'https://utils.aibaoxian.com/file/' + fileCode + '_' + saveFileName;
              that.setData({
                headPoint: headPoint
              })
              that.completeUserInfo();
            }
          },
          fail(res) {
            wx.showToast({
              title: '上传头像失败',
              icon: 'none',
              duration: 1000
            })
          },
        })
      },
      fail: function() {
        wx.showToast({
          title: '获取头像失败',
          icon: 'none',
          duration: 1000
        })
      },
    })
  },
  /**
   * 更新用户信息接口
   */
  completeUserInfo() {
    let data = {
      userInfo: {
        systemId: this.data.systemId,
        channelId: UserManage.getUserInfoBykey("channelId") || this.data.channelId,
        userId: UserManage.getUserInfoBykey("userId") || this.data.userId,
        avatarUrl: this.data.headPoint
      }
    }
    let _this = this;
    personal.completeUserInfo(data, function(res) {
      wx.navigateBack({
        delta: 1,
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