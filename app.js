//app.js
import {UserManage} from './utils/UserManage'
import {wxBase,User} from './api/api'
import {failedTost,init,getPage} from './utils/util'
import {config} from './config/config'
const regeneratorRuntime = require('./lib/regenerator-runtime/runtime-module');



App({
  onLaunch: function () {
      init(this);
      UserManage.getallSherMessage(this);
      // console.log(this.globalData.getSystemInfoSync)
  },
  globalData: {
    userInfo: {},
    getSystemInfoSync:{},
      shareInfo:{},
     shareInfoPage:{},
      PayShareId:'',
      certFromBefore:''

  },

    async getUserMessage(fun) {
        // 第一步 获取 code
        let code = await wxBase.wxLogin(); //获取
        //第二步 获取 openid
        //  getOpenId 接口参数
        let getOpenIdData ={};
        getOpenIdData.appName =config.parameters.appName;
        getOpenIdData.code=code;
        let useData =await User.getOpenId(getOpenIdData);  //根据 拿code 换取 openid 和unid
        let userInfo = useData.body.userInfo;
        console.log(userInfo);
        await failedTost(useData);

        //第三步 如果 有 unid  创建获取用户信息
        //根据用户
        if(userInfo && userInfo.openId && userInfo.unionId){
            //  getUserId 接口参数
            let getUserIdData = {
                authType: '3',
                authValue: userInfo.openId,
                fromSystem: config.parameters.systemId,
                unionId: userInfo.unionId,
                channelId: UserManage.getUserInfoBykey('channelId')||config.parameters.channelId
            };
            let  userInfoUserData =await User.getUserId(getUserIdData);  // 使用 unionld 和 openid 获取
            let getUserIdUserInfo= userInfoUserData.body;
            console.log(getUserIdUserInfo);
            await failedTost(userInfoUserData);


            //第四步如果 没有 用户信息 则显示遮罩层

            if(getUserIdUserInfo.nickName){
                getPage(1).setData({
                    showWarp:false
                });
            }

            if (getUserIdUserInfo.userId){
                getUserIdUserInfo.unionId=userInfo.unionId;
                getUserIdUserInfo.openId=userInfo.openId;
                UserManage.storeUserInfo(getUserIdUserInfo)
            }


          return UserManage.getUserState();

        }

    },
    //解密
    async getUserMessageByclick(grantDetail,fun){
        let appName =config.parameters.appName; // app名称
        let openId =UserManage.getUserInfoBykey('openId');
        // 第一步  查看session 是否过期
        let sessionFlg = await wxBase.checkSession();


        //第二步 如果过期  或者本地未找到 openid 则 重新获取openID  返回userIfo
        let userInfo;  //  getOpenId 接口的反回结果
        if(!sessionFlg||!openId){
            let code = await wxBase.wxLogin(); //获取
            let getOpenIdData ={};
            getOpenIdData.appName = config.parameters.appName;
            getOpenIdData.code=code;
            let useData =await User.getOpenId(getOpenIdData);  //根据 拿code 换取 openid 和unid
                userInfo = useData.body.userInfo;
            await failedTost(useData);
        }
        // 第三步 解密用户信息   返回decodeUser
        //  decodeUser 接口的参数
        let reqData = {
            appName:appName ,
            openId:openId||userInfo.openId,
            encryptedData: grantDetail.encryptedData,
            iv: grantDetail.iv
        };
        let decodeUser= await User.decodeUser(reqData);
        await failedTost(decodeUser);
        let decodeUserData;
        if(decodeUser.body.decryptData.unionId){
            decodeUserData =decodeUser.body.decryptData;
        }else {
            return false
        }
        //创建用户
        let getUserIdData = {
            authType: '3',
            authValue: decodeUserData.openId,
            fromSystem: config.parameters.systemId,
            unionId: decodeUserData.unionId,
            channelId: UserManage.getUserInfoBykey("channelId")||config.parameters.channelId
        };
        let  getUserIdRes =await User.getUserId(getUserIdData);  // 使用 unionld 和 openid 获取
        await failedTost(getUserIdRes);
        //如果没有 昵称则补录信息
        let getUserIdResData =getUserIdRes.body;
        if(!getUserIdResData.userId){
            return
        }
        if(!getUserIdResData.nickName){
            let addUserMessageResData = {
                userInfo: {
                    userId: getUserIdResData .userId||UserManage.getUserInfoBykey('userId'),
                    nickName: decodeUserData.nickName,
                    avatarUrl: decodeUserData.avatarUrl
                }}

            await  User.addUserMessage(addUserMessageResData);
            UserManage.updateCurrentUserInfo('nickName',decodeUserData.nickName);
            UserManage.updateCurrentUserInfo('avatarUrl',decodeUserData.avatarUrl);
        }
        if(fun){
            fun(getUserIdResData)
        }
        return UserManage.getUserState();





    },
    //设置 渠道id
    setChannelId:UserManage.setChannelId,
    //获取页面  1当前页 2亲一个页面
    getPage:getPage,
    //获取用户状态
    getUserState:UserManage.getUserState,
    // 获取根据key获取用户信息
    getUserInfoBykey:UserManage.getUserInfoBykey
})
