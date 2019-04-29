import {UserManage} from '../../utils/UserManage'
import {aiDoctor} from "../../api/api";
import {config} from '../../config/config'
let imgUrl='https://aimall.zhongyuanib.com/static/ai/';
const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
const regeneratorRuntime = require('../../lib/regenerator-runtime/runtime-module')
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    areaCode: {
      type: String,
      value: '86',
    },
    pageSource: {
      type: String,
      value: 'home',
    },
    btnText: {
      type: String,
      value: '登录/注册',
    }
  },
  data: {
    down: imgUrl + 'active/videoMini/icon/down.png',
    agree: imgUrl + 'active/videoMini/icon/active_agree.png',
    agreeHui: imgUrl + 'active/videoMini/icon/default_agrre.png',
    systemId: 'S10000089',
    channelId: 'CH10000432',
    userId: '',
    areaCode: '86',
    mobile: '',
    mobileFocus: false,
    userCodeTxt: '获取验证码',
    currentTime: 60,
    authCode: '',
    disabled: true,
    agreeIcon: false,
    isSendAuthCode: false,
    pageSource: '',
    canGetcode: true
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
    //手机号监听事件
    watchMobile: function(e) {
      this.setData({
        mobile: e.detail.value,
      })
    },
    watchAuthCode: function(e) {
      this.setData({
        authCode: e.detail.value,
      })
    },
    //失去焦点
    inputBlur(e) {
      console.log('-------')
    },
    //获取验证码按钮
    clickAuthCode() {
      console.log("点击")

      if (this.data.mobile.length == 0) {
        wx.showToast({
          title: '手机号有误，请重新输入',
          icon: 'none',
          duration: 1000
        });
        if (this.data.areaCode == '86') {
          if (this.data.mobile.length != 11 || !phoneRexp.test(this.data.mobile)) {
            wx.showToast({
              title: '手机号有误，请重新输入',
              icon: 'none',
              duration: 1000
            });
            return;
          }
        }
        return;
      }

      if (!this.data.canGetcode) {
        return
      }
      //验证码倒计时
      this.getCode();
      this.setData({
        disabled: false
      })
      //接口调用
      let data = {
        channelId: UserManage.getUserInfoBykey('channelId'),
        systemId: config.parameters.systemId,
        userId: UserManage.getUserInfoBykey('userId')|| '',
        mobileAreaCode: this.data.areaCode,
        mobile: this.data.mobile,
      };

      let _this = this;
        aiDoctor.getVerifyCode( data, function(resp) {
        _this.setData({
          isSendAuthCode: true,
        })
      })
    },
    //form表单提交
    formSubmit: function(e) {
      console.log('form发生了submit事件，携带数据为：')
      // let detailValue = e.detail.value;
      // let mobile = detailValue.mobile;
      // let authCode = detailValue.authCode;
      let mobile = this.data.mobile;
      let authCode = this.data.authCode;


      if (mobile.length == 0) {
        wx.showToast({
          title: '手机号有误，请重新输入',
          icon: 'none',
          duration: 1000
        });
        if (this.data.areaCode == '86') {
          if (mobile.length != 11 || !phoneRexp.test(mobile)) {
            wx.showToast({
              title: '手机号有误，请重新输入',
              icon: 'none',
              duration: 1000
            });
            return;
          }
        }
        return;
      }

      if (!this.data.isSendAuthCode || !/^[0-9]*$/.test(authCode) || authCode.length != 4) {
        wx.showToast({
          title: '验证码有误，请重新输入',
          icon: 'none',
          duration: 1000
        });
        return;
      }
      let value = {
        mobile: mobile,
        authCode: authCode
      }
      // 传递给父组件
      this.triggerEvent('mylogin', value) //myevent自定义名称事件，父组件中使用
    },
    //国家区号跳转
    countryJump() {
      wx.navigateTo({
        url: '/pages/shop/country/country',
      })
    },
    //同意协议按钮
    agreeBtn(e) {
      if (this.data.agreeIcon == false) {
        this.setData({
          agreeIcon: true,
          disabled: true
        })
      } else {
        this.setData({
          agreeIcon: false,
          disabled: false
        })
      }
    },
    //平台协议
    platformJump() {
      wx.navigateTo({
        url: '../platform/platform',
      })
    },
    //隐私政策
    privacyJump() {
      wx.navigateTo({
        url: '../privacy/privacy',
      })
    },
    //验证码倒计时
    getCode(options) {
      let that = this;
      let interval = null;
      let currentTime = that.data.currentTime;

      if (currentTime == 60) {
        that.setData({
          userCodeTxt: currentTime + 's',
          canGetcode: false
        })
      }

      interval = setInterval(function() {
        currentTime--;
        that.setData({
          userCodeTxt: currentTime + 's',
          currentTime: currentTime
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            userCodeTxt: '重新获取',
            currentTime: 60,
            disabled: false,
            canGetcode: true
          })
        }
      }, 1000)
    },
  },
})
