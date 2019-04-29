//details.js
//获取应用实例
import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {wxBase} from "../../../api/api";

const app = getApp();

Page({
    data: {
        zdqbg1:config.parameters.imgPrefixUrl+'shop/zdqbg1c.png',
        zdqbg2:config.parameters.imgPrefixUrl+'shop/zdqbg2.png',
        shopList:[1,2,3,4,5],

    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function (option) {
        var that = this;
        let useState = UserManage.getUserState();
        if (!useState.isUser) {
            app.getUserMessage().then(function () {
                app.setChannelId(option)
            })
        } else {
            app.setChannelId(option)
        }
        if (useState.isFull) {
            this.setData({
                showWarp: false
            })
        }
    },
    onShow() {
        let certStatus =UserManage.getUserInfoBykey("certStatus")||0;
        this.setData({
            certStatus: certStatus
        })
    },
    movetorz(){
        let url ;
        let useState = UserManage.getUserState();
        let certStatus =UserManage.getUserInfoBykey("certStatus")||0;
        if(useState.isRegister){
            if(certStatus==-20){
                url='/pages/personal/basic/basicCert/certStatus/certStatus?certStatus=-20'
            }else if(certStatus==0){
                url='/pages/personal/basic/basicCert/certFrom/certFrom?pageId=5'
            }else if(certStatus==20||certStatus==10){
             wx.navigateBack({
             })
             return
         }
        }else {
            url="/pages/personal/basic/basicLogin/basicLogin"
        }
        wx.navigateTo({
            url:url
        });
    },
    movetoyq(){
        let useState = UserManage.getUserState();
        let url ;
        if(useState.isRegister){
            url="/pages/shop/invite/invite?type=10";
            wx.redirectTo({
                url:url
            })
            return
        }else {
            url="/pages/personal/basic/basicLogin/basicLogin"
        }
        wx.navigateTo({
            url:url
        });
    },
    getUserInfoShow(e) {
        console.log();
        if (!e.detail.iv) {
            return
        }
        app.getUserMessageByclick(e.detail).then(function (res) {
            if (res.isFull) {
                getPage(1).setData({
                    showWarp: false
                });
            }
        })
    },

    onShareAppMessage: function () {
        return share(UserManage)
    }

})
