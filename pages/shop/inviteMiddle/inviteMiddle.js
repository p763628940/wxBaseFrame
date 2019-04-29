//details.js
//获取应用实例
import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {shop} from "../../../api/api";

const app = getApp();

Page({
    data: {
        md1:config.parameters.imgPrefixUrl+'shop/md1.png',
        md2:config.parameters.imgPrefixUrl+'shop/md2.png',
        close_w:config.parameters.imgPrefixUrl+'shop/close_w.png',
        joinfial:config.parameters.imgPrefixUrl+'shop/joinfial.png',
        joins:config.parameters.imgPrefixUrl+'shop/joins.png',
        windowsHeight:app.globalData.getSystemInfoSync.windowHeight,
        friendInfo:{},
        joinType:false, //失败
        boxShow:false ,
        friendShareId:'',//
        showWarp:true,
        text:''
    },
    onLoad: function (option) {
        var that = this;
        UserManage.cleanUserInfoExceptChannelId();
        that.setData({
            friendShareId:option.friendShareId
        });


        let useState = UserManage.getUserState();
        if (!useState.isUser) {
            app.getUserMessage().then(function () {
                app.setChannelId(option);
                that.getShareInfoByShareId();
                let useState = UserManage.getUserState();
                if (useState.isFull) {
                    that.setData({
                        showWarp: false
                    })
                }
            })
        } else {
            that.getShareInfoByShareId();
            app.setChannelId(option);
            that.getUnReadMsgStatus();
            if (useState.isFull) {
                that.setData({
                    showWarp: false
                })
            }
        }
    },
    onShow() {
    },
    moveToDetails() {
        wx.navigateTo({
            url: '/pages/shop/details/details'
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
    },
    close(){
        this.setData({
            boxShow:false
        })
    },
    getShareInfoByShareId() {
        let that = this;
        let data = {
            systemId: config.parameters.systemId,
            channelId: UserManage.getUserInfoBykey("channelId"),
            userId: UserManage.getUserInfoBykey("userId") || '',
            shareId: that.data.friendShareId,
        };
        shop.getShareInfoByShareId(data, function (res) {
            that.setData({
                friendInfo: res.body
            })
        })
    },
    inviteUser(){
        let that = this;
        if(UserManage.getUserInfoBykey("userId")==that.data.friendInfo.userId){
            that.setData({
                joinType:false,
                boxShow:true,
                text:"不能接受自己的邀请"
            })
            return
        }
        let data = {
            systemId: config.parameters.systemId,
            channelId: UserManage.getUserInfoBykey("channelId"),
            userId: UserManage.getUserInfoBykey("userId") || '',
            shareUserId: that.data.friendInfo.userId,
            nickName:UserManage.getUserInfoBykey("nickName")
        };
        shop.inviteUser(data, function (res) {
            let state =res.body.inviteResult;
            if(state=='0000'){
                UserManage.point('E0501', '1', 'E05');
            }else {
                UserManage.point('E0501', '2', 'E05');
            }
            if(state=='510'){
                that.setData({
                    text:"您已成功接受过该好友的邀请"
                })
            }else {
                that.setData({
                    text:""
                })
            }
            that.setData({
                joinType:state=='0000'?true:false,
                boxShow:true
            })
        })

    },
    movetoAd(){
        wx.reLaunch({
            url: '/pages/shop/home/home'
        });
    }

})
