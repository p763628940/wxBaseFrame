//details.js
//获取应用实例
import {getPage, share} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {shop} from "../../../api/api";

const app = getApp();
Page({
    data: {
        details1: config.parameters.imgPrefixUrl + 'shop/detail1.png',
        details2: config.parameters.imgPrefixUrl + 'shop/detail2.png',
        details3: config.parameters.imgPrefixUrl + 'shop/detail3.png',
        details4: config.parameters.imgPrefixUrl + 'shop/detail4.png',
        details5: config.parameters.imgPrefixUrl + 'shop/detail5.png',
        details_d: config.parameters.imgPrefixUrl + 'shop/details/details_d.png',
        details_m: config.parameters.imgPrefixUrl + 'shop/details/details_m.png',
        details_y: config.parameters.imgPrefixUrl + 'shop/details/details_y.png',
        share: config.parameters.imgPrefixUrl + 'shop/share.png',
        arrow: config.parameters.imgPrefixUrl + 'shop/arrow.png',
        arryeloow:config.parameters.imgPrefixUrl+'shop/arryeloow.png',
        windowsHeight: app.globalData.getSystemInfoSync.windowHeight,
        details: {},
        partneritemid: '',
        PayShareId: '',
        logShow:false,
        certStatus:''
    },
    onLoad: function (option) {
        console.log(option)
        var that = this;
        app.globalData.PayShareId = option.PayShareId || '';
        that.setData({
            PayShareId: option.PayShareId || '',
            partneritemid: option.partneritemid || ''
        });

        if (that.data.PayShareId) {
            that.getShareInfoByShareId()
        } else {
            that.getDeatails();
        }
    },
    onShow() {
        let certStatus =UserManage.getUserInfoBykey("certStatus")||'';
        this.setData({
            certStatus: certStatus
        })
        wx.hideShareMenu()
    },
    moveToCardPay(e) {
        wx.navigateTo({
            url: '/pages/shop/cardPay/cardPay?partneritemid=' + this.data.partneritemid
        });
    },
    moveToMyServes() {
        wx.navigateTo({
            url: '/pages/indexNested/indexNested?router='
        })
    },
    onShareAppMessage: function () {
        return share(UserManage)
    },
    getDeatails() {
        let that = this;
        let data = {
            systemId: config.parameters.systemId,
            channelId: UserManage.getUserInfoBykey("channelId"),
            userId: UserManage.getUserInfoBykey("userId") || '',
            partnerItemId: that.data.partneritemid
        };
        shop.getProductInfo(data, function (res) {
            console.log(res)
            that.setData({
                details: res.body.dataList[0]
            })
        })
    },
    getShareInfoByShareId() {
        let that = this;
        let data = {
            systemId: config.parameters.systemId,
            channelId: UserManage.getUserInfoBykey("channelId"),
            userId: UserManage.getUserInfoBykey("userId") || '',
            shareId: that.data.PayShareId,
        };
        shop.getShareInfoByShareId(data, function (res) {
            that.setData({
                details: res.body.productInfo
            })
        })

    },
    setlogShow(){
        let useState = UserManage.getUserState();
        if(!useState.isRegister){
          let url ='/pages/personal/basic/basicLogin/basicLogin';
            wx.navigateTo({
                url:url
            })
            return
        }
        console.log(this.data.setlogShow)
        this.setData({
            logShow:!this.data.logShow
        })
    },
    moveToRenzheng(){
        this.setData({
            logShow:!this.data.logShow
        })
        let useState = UserManage.getUserState();
        let url;
        let certStatus =UserManage.getUserInfoBykey("certStatus")||0;
        let partneritemid =this.data.partneritemid;

        if(!useState.isRegister){
            url ='/pages/personal/basic/basicLogin/basicLogin'
            wx.navigateTo({
                url:url
            })
        }else if(certStatus==-20){
            app.globalData.certFromBefore ='status';
            url='/pages/personal/basic/basicCert/certStatus/certStatus?certStatus=-20'
            wx.redirectTo({
                url:url
            })
        }else if(certStatus==0){
            app.globalData.certFromBefore ='from';
            url='/pages/personal/basic/basicCert/certFrom/certFrom?pageId=4'
            wx.redirectTo({
                url:url
            })
        }else if(certStatus==20||certStatus==10){
            wx.navigateToMiniProgram({
                appId: 'wxfdb569c2d4323535',
                path: 'pages/details/details?partneritemid='+partneritemid+'&channelId='+UserManage.getUserInfoBykey("channelId"),
                extraData: {
                    foo: 'bar'
                },
                envVersion: config.targetMini,
                // envVersion: config.targetMini,
                success(res) {
                    // 打开成功
                }
            })
        }

    },
    moveToRenzheng2(){
        let useState = UserManage.getUserState();
        let url;
        let certStatus =UserManage.getUserInfoBykey("certStatus")||0;
        if(!useState.isRegister){
            url ='/pages/personal/basic/basicLogin/basicLogin'
            wx.navigateTo({
                url:url
            })
        }else if(certStatus==-20){
            app.globalData.certFromBefore ='status';
            url='/pages/personal/basic/basicCert/certStatus/certStatus?certStatus=-20'
            wx.navigateTo({
                url:url
            })
        }else if(certStatus==0){
            app.globalData.certFromBefore ='from';
            url='/pages/personal/basic/basicCert/certFrom/certFrom?pageId=4'
            wx.redirectTo({
                url:url
            })
        }

    }

})
