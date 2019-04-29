//details.js
//获取应用实例
import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import { shop } from "../../../api/api";

const app = getApp();

Page({
    data: {
        myicon:config.parameters.imgPrefixUrl+'shop/myicon.png',
        arrow_hui:config.parameters.imgPrefixUrl+'shop/arrow_hui.png',
        nofriend:config.parameters.imgPrefixUrl+'shop/nofriend.png',
        windowsHeight:'',
        pageNo:0,
        hasMore:true,
        shopList:[],
        isback:false

    },
    onLoad: function (option) {
        var that = this;
        that.getHeight();
        that.getCustomerList();

    },
    onShow() {
        let that =this;
        if(that.data.isback){
            that.setData({
                hasMore:true,
                shopList:[],
                pageNo:0
            })
            that.getCustomerList();
        }
    },
    moveToDetails() {

        wx.navigateTo({
            url: '/pages/shop/details/details'
        });

    },
    onShareAppMessage: function () {
        return share(UserManage)
    },
    getCustomerList(){
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
        shop.getCustomerList(data,function (res) {
            let nowPagenow =res.body.pageNo;
            let totalPage =res.body.totalPage;
            if(nowPagenow>=totalPage){
                that.setData({
                    hasMore:false
                })
            }
            if(res.body.dataList){
                that.setData({
                    shopList: that.data.shopList.concat(res.body.dataList)
                })
            }

        })
    },
    getHeight(){
        let that =this;
        wx.createSelectorQuery().selectAll('.bg').boundingClientRect(function (rect) {
            that.setData({
                windowsHeight:app.globalData.getSystemInfoSync.windowHeight-rect[0].height-1
            })
        }).exec()

    },
    movetoInfo(e){
        console.log(e.currentTarget.dataset.customerid);
         this.setData({
             isback:true
         });
        wx.navigateTo({
            url: '/pages/shop/customerInfo/customerInfo?customerid='+e.currentTarget.dataset.customerid
        });
    }

})
