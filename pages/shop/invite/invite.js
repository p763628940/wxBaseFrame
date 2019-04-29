//details.js
//获取应用实例
import {getPage, share, getLocaltion,makeUuid} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {shop} from "../../../api/api";

const app = getApp();

Page({
    data: {
        yqbg:config.parameters.imgPrefixUrl+'shop/yq.jpg',
        arrow_hui:config.parameters.imgPrefixUrl+'shop/arrow_hui.png',
        yq_money:config.parameters.imgPrefixUrl+'shop/yq_money.png',
        w_uner:config.parameters.imgPrefixUrl+'shop/w_uner.png',
        titiIcon:config.parameters.imgPrefixUrl+'shop/titiIcon.png',
        people_icon:config.parameters.imgPrefixUrl+'shop/people_icon.png',
        m_icon:config.parameters.imgPrefixUrl+'shop/m_icon.png',
        inviteData:{},
        insurance:'',
        certStatus:0
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function (option) {
        if (option.type) {
            UserManage.point('E0302', '2', 'E03');
        } else {
            UserManage.point('E0302', '1', 'E03');
        }
    },
    onShow() {
        let that = this;
        that.getAwardStatic();
        that.getCodeCodeConfig();
        let certStatus =UserManage.getUserInfoBykey("certStatus")||0;
        this.setData({
            certStatus: certStatus
        })
    },
    moveTofriend(){

        let inviteData =this.data.inviteData.userCount;
        if(inviteData){
            wx.navigateTo({
                url: '/pages/shop/inviteAward/inviteAward?type=2'
            });
        }

    },
    moveToAward(){
        let inviteData =parseInt(this.data.inviteData.moneyCount) ;
        if(inviteData){
            wx.navigateTo({
                url: '/pages/shop/inviteAward/inviteAward?type=1'
            });
        }

    },
    movetogz(){
        wx.navigateTo({
            url: '/pages/shop/inviteRoule/inviteRoule'
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
        UserManage.point('E0301', '', 'E03');
        let page='/'+getPage(1).route;
       return  share(UserManage,page,'',function (data) {
            let targeturl = data.link+'?friendShareId='+data.uuid;
           console.log(targeturl);
            data.path=targeturl;
            if(!data.defTitle){
                data.defTitle =data.title
            }
           data.title=UserManage.getUserInfoBykey("nickName")+data.defTitle;
            return data

        })

    },
    // 获取字典 人数和金额
    getAwardStatic(){
        let  that =this;
        let data ={
            systemId:config.parameters.systemId,
            userId:UserManage.getUserInfoBykey("userId"),
        }

        console.log(data);
        shop.getAwardStatic(data,function (res) {
            that.setData({
                inviteData:res.body
            })
        })
    },
    //获取百分比
    getCodeCodeConfig(){
        let  that =this;
        let data ={
            codeType:"InvitationAward",
            codeName:'vdCard'
        }
        shop.getCodeCodeConfig(data,function (res) {
            that.setData({
                insurance: parseFloat(res.body.vdCard)*100
            })
        })
    },
    moveToRenzheng(){
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
            wx.redirectTo({
                url:url
            })
        }else if(certStatus==0){
            app.globalData.certFromBefore ='from';
            url='/pages/personal/basic/basicCert/certFrom/certFrom?pageId=4'
            wx.redirectTo({
                url:url
            })
        }

    },

})
