//details.js
//获取应用实例
import {getPage, share, getLocaltion} from "../../../utils/util";
import {config} from '../../../config/config'
import {UserManage} from '../../../utils/UserManage'
import {shop} from "../../../api/api";

const app = getApp();

Page({
    data: {
        no_darta_my:config.parameters.imgPrefixUrl+'shop/no_darta_my.png',
        people_icon:config.parameters.imgPrefixUrl+'shop/people_icon.png',
        calender:config.parameters.imgPrefixUrl+'shop/calender.png',
        Fill:config.parameters.imgPrefixUrl+'shop/Fill.png',
        m_icon:config.parameters.imgPrefixUrl+'shop/m_icon.png',
        close:config.parameters.imgPrefixUrl+'shop/close.png',
        windowsHeight:app.globalData.getSystemInfoSync.windowHeight,
        crrrentTab:2, // 1 奖励明细 2 邀请好友
        canFlitter:true,
        awardPageNo:0,   //奖励列表的页码
        friendPageNo:0,  //邀请列表的页码
        awardList:[],    //奖励列表
        friendList:[1],  //邀请列表
        awardHasMore:true,
        friendHasMore:true,
        totalFee:0,
        totalRow:0,
        timeList:[],
        timeSelect:0,
        friendUserId:'',
        friendInfo:{},
        date:''


    },
    onLoad: function (option) {
        var that = this;
        this.getHeight();
        let endDate = that.getNowFormatDate('d');
        let nowDate = that.getNowFormatDate('m');
        that.setData({
            endDate:endDate,
            friendUserId:option.friendId
        });
       that.getInviteFriedList();
        that.getInviteAwardList();
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
    //邀请好友列表
    getInviteFriedList(){
        let that =this;
        if(!that.data.friendHasMore){
            return
        }
        that.setData({
            friendPageNo: that.data.friendPageNo+1,
        })
        let  pageNo =that.data.friendPageNo;


        let data ={
            systemId:config.parameters.systemId,
            channelId:UserManage.getUserInfoBykey("channelId"),
            userId:UserManage.getUserInfoBykey("userId"),
            friendType:'',
            friendTime:'',
            pageSize:20,
            pageNo:pageNo,
            friendUserId:that.data.friendUserId
        }
        shop.getInviteFriedList(data,function (res) {
            let nowPagenow =res.body.pageNo;
            let totalPage =res.body.totalPage;
            if(nowPagenow>=totalPage){
                that.setData({
                    friendHasMore:false
                })
            }
            that.setData({
                friendInfo:res.body.dataList[0]
            })
        })
    },
    getInviteAwardList(){
        let that =this;
        if(!that.data.awardHasMore){
            return
        }
        that.setData({
            awardPageNo: that.data.awardPageNo+1,
        });
        let  pageNo =that.data.awardPageNo;

        let data ={
            systemId:config.parameters.systemId,
            channelId:UserManage.getUserInfoBykey("channelId"),
            userId:UserManage.getUserInfoBykey("userId"),
            awardType:11,
            awardTime:'EQ'+that.data.date,
            source:'',
            pageSize:20,
            pageNo:pageNo,
            friendUserId:that.data.friendUserId
        }

        shop.getInviteAwardList(data,function (res) {
            let nowPagenow =res.body.pageNo;
            let totalPage =res.body.totalPage;
            if(nowPagenow>=totalPage){
                that.setData({
                    awardHasMore:false
                })
            }
            that.setData({
                awardList:that.data.awardList.concat(res.body.dataList),
                totalFee:res.body.totalFee
            })
        })
    },
    //设置tab
    setCrrrentTab(e){
        console.log(e)
        this.setData({
            crrrentTab: e.target.dataset.tabid
        })
    },
    //设置是否显示筛选
    setFlitter(){
        this.setData({
            canFlitter:true
        })
    },
    //获取高度
    getHeight(){
        let that =this;
        wx.createSelectorQuery().selectAll('.inviteInfo_top').boundingClientRect(function (rect) {
            that.setData({
                windowsHeight:app.globalData.getSystemInfoSync.windowHeight-rect[0].height-1
            })
        }).exec()

    },
    settimeSelect(e){
        console.log(e)
        let that =this;
        this.setData({
            timeSelect:e.target.dataset.timeindex
        })

    },
    close(){
        this.setData({
            canFlitter:false
        })
    },
    selectTime(){
        let that =this;
        this.setData({
            canFlitter:false
        })
        if(that.data.crrrentTab==1){

            that.setData({
                awardList:[],
                awardHasMore:true,
                awardPageNo:0
            })
            that.getInviteAwardList();

        }else {
            that.setData({
                friendList:[],
                friendHasMore:true,
                friendPageNo:0
            })
            that.getInviteFriedList()
        }
    },
    getTimeDate(){
        let that =this;
        let dataArr = ['全部时间'];
        let data = new Date();
        let year = data.getFullYear();
        data.setMonth(data.getMonth()+1, 1)//获取到当前月份,设置月份
        for (let i = 0; i < 12; i++) {
            data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
            let m = data.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            dataArr.push(data.getFullYear() + "-" + (m))
        }
        dataArr.push("更早时间");

        that.setData({
            timeList:dataArr
        })
        console.log(dataArr)
    },
    rest(){
        console.log('dfas')
        this.setData({
            timeSelect:0
        })
    },
    getSelectTime(){
        let that =this;
        let index = that.data.timeSelect;
        let timeList =that.data.timeList;
        if(index!=0&&index!=13){
            return  'EQ'+timeList[index]
        }else if(index==0){
            return ''
        }else if(index==13){
            return  'LT'+ timeList[index-1]
        }
    },
    bindDateChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
     getNowFormatDate(type) {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
         var currentdate
    if(type=='d'){
        currentdate= year + seperator1 + month + seperator1 + strDate;
    }else if(type=='m'){
        currentdate= year + seperator1 + month;
    }else {
        currentdate= year;
    }

    return currentdate;
}

})
