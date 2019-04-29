import {
  UserManage
} from '../../utils/UserManage'
import {
  personal
} from "../../api/api";
import parameters from '../../config/constant.js'
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {},
  data: {
    systemId: parameters.systemId,
    channelId: UserManage.getUserInfoBykey("channelId"),
    userId: UserManage.getUserInfoBykey("userId"),
    customer: parameters.imgPrefixUrl + 'icon/customer.png',
    pop: parameters.imgPrefixUrl + 'icon/close_gray.png',
    customerLogoShow: false,
    customerShow: true,
    customerData: {},
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.getCustomServiceInfo();
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    //悬浮在线客服按钮
    handleCustomer() {
      this.triggerEvent('customershow', this.data.customerShow)
      if (this.data.customerShow == false) {
        this.setData({
          customerShow: true
        })
      } else {
        this.setData({
          customerShow: false
        })
      }
    },
    //复制客服二维码
    copy() {
      let that = this;
      wx.setClipboardData({
        data: that.data.customerData.wxNo,
        success: function(res) {}
      })
    },
    //图片预览
    previewImage: function (e) {
      wx.previewImage({
        current: this.data.customerData.imageUrl, // 当前显示图片的http链接
        urls: this.data.customerData.imageUrl.split(',') // 需要预览的图片http链接列表
      })
    },
    /**
     * 客服接口调用
     */
    getCustomServiceInfo() {
      let data = {
        systemId: this.data.systemId,
        channelId: this.data.channelId,
        userId: this.data.userId,
      }
      let _this = this;
      personal.getCustomerServiceInfo(data, function (res) {
        _this.setData({
          customerData: res.body
        })
      }, function (res) {
        wx.showToast({
          title: '服务器开小差了',
          icon: 'loading',
          duration: 1000
        });
      })
    },
  }
})