//details.js
//获取应用实例
import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {shop} from "../../../api/api";

const app = getApp();

Page({
    data: {
        myicon:config.parameters.imgPrefixUrl+'shop/myicon.png',
        customerIfo:{},
        region:[],
        code:[]

    },
    onLoad: function (option) {
        var that = this;
        that.setData({
            customerid: option.customerid
        })
        that.getCustomerInfo();
    },
    onShow() {
    },
    moveToDetails() {
        wx.navigateTo({
            url: '/pages/shop/details/details'
        });

    },
    onShareAppMessage: function () {
        return share(UserManage)
    },
    getCustomerInfo(){
        let that =this;
        let data = {
            systemId: config.parameters.systemId,
            channelId: UserManage.getUserInfoBykey("channelId"),
            userId: UserManage.getUserInfoBykey("userId"),
            customerId: that.data.customerid

        }
        shop.getCustomerInfo(data,function (res) {
            let region =[];
            let code =[];
            code.push(res.body.province);
            code.push(res.body.city);
            code.push(res.body.county);
            region.push(res.body.provinceName);
            region.push(res.body.cityName);
            region.push(res.body.countyName);
            that.setData({
                customerIfo:res.body,
                region:region,
                code:code
            })
        })
    },
    updateCustomerInfo(){
        let that =this;
        let data = that.data.customerIfo;
        data.provinceName=that.data.region[0];
        data.cityName=that.data.region[1];
        data.countyName=that.data.region[2];
        data.province=that.data.code[0];
        data.city=that.data.code[1];
        data.county=that.data.code[2];
        data.systemId=config.parameters.systemId;
         data.channelId= UserManage.getUserInfoBykey("channelId");
            data.userId= UserManage.getUserInfoBykey("userId");

        shop.updateCustomerInfo(data,function (res) {
            wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 2000
            })
            getPage(2).setData({
                isBack:true
            });
            wx.navigateBack({
                delta: 1,
            })
        })
    },
    setInputData(e){
        console.log(e)
        let str ='customerIfo.'+e.target.dataset.type;
        console.log(str)
        this.setData({
            [str]: e.detail.value
        })
        console.log(this.data.customerIfo)
    },
    bindRegionChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail)
        this.setData({
            region: e.detail.value,
            code:e.detail.code
        })

    },
    setClickData(e){
        let str ='customerIfo.'+e.target.dataset.type;
        console.log(str)
        this.setData({
            [str]: e.target.dataset.val
        })
    }


})
