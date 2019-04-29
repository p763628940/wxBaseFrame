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
    cha: parameters.imgPrefixUrl + 'icon/close_gray.png',
    password: '',
    showPasswdBox: false,
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    //监听交易密码
    inputChange(e) {
      this.setData({
        password: e.detail.value
      })
    },
    //忘记密码
    forgetPassword() {
      wx.navigateTo({
        url: '../basicPassword/basicPassword',
      })
    },
    //关闭交易密码弹窗
    showPasswdClick() {
      this.triggerEvent('showpasswdbox', this.data.showPasswdBox)
      this.setData({
        showPasswdBox: true
      })
    },
    //交易密码确认提交
    onConfirm() {
      if (this.data.password == '') {
        wx.showToast({
          title: '密码不能为空',
        })
        return false;
      }
      if (this.data.password.length < 6 || this.data.password.length > 12) {
        wx.showToast({
          title: '请输入6-12位密码',
        })
        return false;
      }
      if (!/^[a-zA-Z0-9]{6,12}$/.test(this.data.password)) {
        wx.showToast({
          title: '密码不能含有特殊符号',
        })
        return false;
      }
      this.withDrawCash();
    },
    /**
 * 代理人提现
 */
    withDrawCash() {
      let data = {
        systemId: this.data.systemId,
        channelId: this.data.channelId,
        userId: this.data.userId,
        inputCash: this.data.balanceVal,
        passwd: this.data.password
      }
      let _this = this;
      personal.withDrawCash(data, function (res) {
        _this.setData({
          showPasswdBox: false
        })
        wx.redirectTo({
          url: '../drawSchedule/drawSchedule?withdrawId=' + res.body.withdrawId,
        })
      }, function (res) {
        _this.setData({
          showPasswdBox: false
        })
        wx.showToast({
          title: res.head.errorMessage,
          icon: 'loading',
          duration: 1000
        });
      })
    },
  }
})