//details.js
//获取应用实例
import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {wxBase,shop} from "../../../api/api";

const app = getApp();

Page({
    data: {
        my:config.parameters.imgPrefixUrl+'shop/my.png',
        message_icon:config.parameters.imgPrefixUrl+'shop/message_icon.png',
        zdq:config.parameters.imgPrefixUrl+'shop/zdq.png',
        arrow:config.parameters.imgPrefixUrl+'shop/arrow.png',
        arryeloow:config.parameters.imgPrefixUrl+'shop/arryeloow.png',
        windowsHeight:app.globalData.getSystemInfoSync.windowHeight,
        pageNo:0,
        hasMore:true,
        imgUrls:[
            config.parameters.imgPrefixUrl+'shop/banner/banner2.png',
            config.parameters.imgPrefixUrl+'shop/banner/banner1.png'
        ],
        shopList:[],
        certStatus:'',
        unReadMsgStatus:false,
        showWarp:true,
        current:0
    },
    onLoad: function (option) {
        console.log(getPage(1));
        let that = this;
        that.getHeight();
        UserManage.point('E0101', '', 'E01');
        UserManage.cleanUserInfoExceptChannelId();
        let useState = UserManage.getUserState();
        if (!useState.isUser) {
            app.getUserMessage().then(function () {
                app.setChannelId(option);
                let usecertStatus =UserManage.getUserInfoBykey("certStatus");
                let certStatus =(usecertStatus==20||usecertStatus==10)?true:false
                that.setData({
                    certStatus: certStatus,
                })
                let useState = UserManage.getUserState();
                if (useState.isFull) {
                    that.setData({
                        showWarp: false
                    })
                }
                that.getListData();
            })

        } else {
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
        let useState = UserManage.getUserState();
        let usecertStatus =UserManage.getUserInfoBykey("certStatus");
        let certStatus =(usecertStatus==20||usecertStatus==10)?true:false
        this.setData({
            certStatus:certStatus
        })
        if(useState.isUser){
            this.getUnReadMsgStatus();
        }

    },
    moveToDetails(e) {
        let partneritemid =e.currentTarget.dataset.partneritemid;
        let usestate=UserManage.getUserInfoBykey("certStatus");
        if(usestate!=20&&usestate!=10){
            wx.navigateTo({
                url: '/pages/shop/details/details?partneritemid='+partneritemid
            });
        }else {
            wx.navigateToMiniProgram({
                appId: 'wxfdb569c2d4323535',
                path: 'pages/details/details?partneritemid='+partneritemid+'&channelId='+UserManage.getUserInfoBykey("channelId"),
                extraData: {
                    foo: 'bar'
                },
                envVersion: config.targetMini,
                // envVersion: 'develop',
                success(res) {
                    // 打开成功
                }
            })

        }

    },
    moveToCenter(e) {
        UserManage.point('E0102', '', 'E01');
        wx.navigateTo({
            url: '/pages/personal/setCenter/setCenter'
        });
    },
    moveToMessageList() {
        UserManage.point('E0103', '', 'E01');
        wx.navigateTo({
            url: '/pages/shop/messageList/messageList'
        })
    },
    movetozdq() {
        wx.navigateTo({
            url: '/pages/shop/makeMonye/makeMonye'
        })
    },
    movtorz(){
        let useState = UserManage.getUserState();
        let url;
        let certStatus =UserManage.getUserInfoBykey("certStatus")||0;
        if(!useState.isRegister){
             url ='/pages/personal/basic/basicLogin/basicLogin'
        }else if(certStatus==10){
            url='/pages/personal/basic/basicCert/certStatus/certStatus?certStatus=10'
        }else if(certStatus==-20){
            url='/pages/personal/basic/basicCert/certStatus/certStatus?certStatus=-20'
        }else if(certStatus==0){
            url='/pages/personal/basic/basicCert/certFrom/certFrom?pageId=3'
        }
        wx.navigateTo({
            url:url
        })
    },
    movetoTarget(){
        let current =this.data.current;
        if(current==1){
            wx.navigateToMiniProgram({
                appId: 'wxfdb569c2d4323535',
                path: 'pages/serviceAbout/home/home?channelId='+UserManage.getUserInfoBykey("channelId"),
                extraData: {
                    foo: 'bar'
                },
                envVersion: config.targetMini,
                // envVersion: 'develop',
                success(res) {
                    // 打开成功
                }
            })
        }else if(current==0) {
            wx.navigateTo({
                url: '/pages/shop/makeMonye/makeMonye'
            })
        }
    },
    getUserInfoShow(e) {
        let that =this;
        console.log();
        if (!e.detail.iv) {
            return
        }
        app.getUserMessageByclick(e.detail).then(function (res) {
            that.getUnReadMsgStatus();
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
    getListData(){
        let that =this;
        if(!that.data.hasMore){
            return
        }
        that.setData({
            pageNo: that.data.pageNo+1,

        })
        let  pageNo =that.data.pageNo;
        let data ={
            systemId:config.parameters.systemId,
            channelId:UserManage.getUserInfoBykey("channelId"),
            userId:UserManage.getUserInfoBykey("userId"),
            pageSize:20,
            pageNo:pageNo
        }
        shop.getProductInfo(data,function (res) {
            console.log(res)
            let nowPagenow =res.body.pageNo;
            let totalPage =res.body.totalPage;
            if(nowPagenow>=totalPage){
                    that.setData({
                        hasMore:false
                    })
            }
            that.setData({
                shopList:res.body.dataList
            })
        })

    },
    getUnReadMsgStatus(){
        let that =this;
        let data ={
            systemId:config.parameters.systemId,
            channelId:UserManage.getUserInfoBykey("channelId"),
            userId:UserManage.getUserInfoBykey("userId")
        }
        shop.getUnReadMsgStatus(data,function (res) {
            that.setData({
                unReadMsgStatus:res.body.unReadMsgStatus
            })
        })
    },
    getHeight(){
        let that =this;
        wx.createSelectorQuery().selectAll('.swpers').boundingClientRect(function (rect) {
            that.setData({
                windowsHeight:app.globalData.getSystemInfoSync.windowHeight-rect[0].height
            })
        }).exec()

    },
    setcuurrent(e){
        this.setData({
            current:e.detail.current
        })

    }


})
