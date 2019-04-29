//details.js
//获取应用实例
import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {shop} from "../../../api/api";

const app = getApp();

Page({
    data: {
        myicon: config.parameters.imgPrefixUrl + 'shop/myicon.png',
        arrow: config.parameters.imgPrefixUrl + 'shop/arrow.png',
        customerid: '',
        customerIfo:{},
        pageNo:0,
        hasMore:true,
        shopList:[],
        isBack:false
    },
    onLoad: function (option) {
        var that = this;
        that.setData({
            customerid: option.customerid
        })
        that.getCustomerDetail();
        that.getListData();
        that.getHeight();

    },
    onShow() {
        let that =this;
        if(that.data.isBack){
            that.setData({
                hasMore:true,
                pageNo:0,
                shopList:[]
            })
            that.getCustomerDetail();
            that.getListData();
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
    getCustomerDetail() {
        let that =this;
        let data = {
            systemId: config.parameters.systemId,
            channelId: UserManage.getUserInfoBykey("channelId"),
            userId: UserManage.getUserInfoBykey("userId"),
            customerId: that.data.customerid

        }
        shop.getCustomerDetail(data, function (res) {
            that.setData({
                customerIfo:res.body
            })

        })
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

        let obj  = {}
        obj.name="customerId";
        obj.value=that.data.customerid;
        let obj2  = {
            name:'msgType',
            value:'spread'
        }
        let filter=[obj,obj2];

        let data ={
            systemId:config.parameters.systemId,
            channelId:UserManage.getUserInfoBykey("channelId"),
            userId:UserManage.getUserInfoBykey("userId"),
            filter:filter,
            pageSize:20,
            pageNo:pageNo
        }
        shop.getMsgList(data,function (res) {
            console.log(res)
            let nowPagenow =res.body.pageNo;
            let totalPage =res.body.totalPage;
            if(nowPagenow>=totalPage){
                that.setData({
                    hasMore:false
                })
            }
            that.setData({
                shopList:res.body.dataList.concat(that.data.shopList),
            })
        })

    },
    getHeight(){
        let that =this;
        wx.createSelectorQuery().selectAll('.box').boundingClientRect(function (rect) {

            console.log(rect[0].height)
            console.log(app.globalData.getSystemInfoSync.windowHeight)
            that.setData({
                windowsHeight:app.globalData.getSystemInfoSync.windowHeight-rect[0].height-1
            })
        }).exec()

    },
    moveToUp(e){
        let that =this;
        wx.navigateTo({
            url: '/pages/shop/customerInfoUp/customerInfoUp?customerid='+that.data.customerIfo.customerId
        });
    }

    })
