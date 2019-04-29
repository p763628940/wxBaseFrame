//details.js
//获取应用实例
import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {shop, wxBase} from "../../../api/api";

const app = getApp();
Page({
    data: {
        Fill: config.parameters.imgPrefixUrl + 'shop/Fill.png',
        m_icon: config.parameters.imgPrefixUrl + 'shop/m_icon.png',
        showLoaction: true,
        showWarp: true,
        myAmapFun: {},
        firstGetLocation: true,
        windowsHeight: 0,
        pageNo: 0,
        hasMore: true,
        shopList: [],
        certStatus: '',
        timeList: [],
        totalRevenue: '', //累计收入
        index: 0
    },
    onLoad: function (option) {
        var that = this;
        that.getTimeList();
        that.setMessageTy();
        that.getHeight();
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
    getListData() {
        let that = this;
        if (!that.data.hasMore) {
            return
        }
        that.setData({
            pageNo: that.data.pageNo + 1,
        })
        let pageNo = that.data.pageNo;

        let obj = {
            name: "timeFilter",
            value: that.data.timeList[that.data.index].code
        }
        let filter = [obj];
        let data = {
            systemId: config.parameters.systemId,
            channelId: UserManage.getUserInfoBykey("channelId"),
            userId: UserManage.getUserInfoBykey("userId"),
            filter: filter || '',
            pageSize: 5,
            pageNo: pageNo
        }
        shop.getMsgList(data, function (res) {
            console.log(res)
            let nowPagenow = res.body.pageNo;
            let totalPage = res.body.totalPage;
            if (nowPagenow >= totalPage) {
                that.setData({
                    hasMore: false
                })
            }
            that.setData({
                shopList:that.data.shopList.concat(res.body.dataList),
                totalRevenue: res.body.totalRevenue
            })
        })

    },
    setMessageTy() {
        let that = this;
        let data = {
            systemId: config.parameters.systemId,
            channelId: UserManage.getUserInfoBykey("channelId"),
            userId: UserManage.getUserInfoBykey("userId"),
        }
        shop.updateMsgStatus(data, function (res) {

        })
    },
    getTimeList() {
        let that = this;
        let data = {
            codeType: 'timeFilter'
        }
        shop.timeList(data, function (res) {
            let list = res.body.codeList;
            let index = list.findIndex(function (val, index, arr) {
                return val.isDefault == 1
            })

            that.setData({
                timeList: list,
                index: index
            })
            that.getListData();
        })
    },
    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            index: e.detail.value,
            hasMore: true,
            pageNo: 0,
            shopList: []
        })
        this.getListData()
    },
    getHeight() {
        let that = this;
        wx.createSelectorQuery().selectAll('.use_box').boundingClientRect(function (rect) {
            that.setData({
                windowsHeight: app.globalData.getSystemInfoSync.windowHeight - rect[0].height - 1
            })
        }).exec()

    }

})
