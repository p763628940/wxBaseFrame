//商品信息 消息 客户管理
/**
 *  @ajax   入参   hosturl 路径    interfaceNo 接口代号
 *
 * */

function shop(ajax,hosturl) {
    const shop = {
        getProductInfo:ajax(hosturl,'600035','POST'), //查询商品信息(列表/详情）
        getUnReadMsgStatus:ajax(hosturl,'600056','POST'), //未读消息状态查询接口
        getVdAccoun:ajax(hosturl,'600060','POST'), //是否视频医生用户查询接口
        getShareInfoByShareId:ajax(hosturl,'600039','POST'),// (600039)根据shareId获得分享信息
        getMsgList:ajax(hosturl,'600057','POST'),// (600057)消息列表查询接口
        updateMsgStatus:ajax(hosturl,'600058','POST'),// (600058)消息状态更新接口
        timeList:ajax(hosturl,'100152','POST'),// (100152)字典列表
        getAwardStatic:ajax(hosturl,'100269','POST'),// (100269)邀请有礼
        getCodeCodeConfig:ajax(hosturl,'600064','POST'),// (600064)获取字典配置值
        getInviteFriedList:ajax(hosturl,'100270','POST'),// (100270)邀请好友列表,
        getInviteAwardList:ajax(hosturl,'100271','POST'),// (100271)奖励明细列表
        getCustomerList:ajax(hosturl,'600054','POST'),// (600054)代理人客户列表
        getCustomerDetail:ajax(hosturl,'600055','POST'),// (600055)代理人客户详情
        getCustomerInfo:ajax(hosturl,'600062','POST'),// (600062)代理人客户信息
        updateCustomerInfo:ajax(hosturl,'600063','POST'),// (600063)修改代理人客户信息
        inviteUser:ajax(hosturl,'600084','POST'),// (600084)接受好友邀请
    }
    return shop
}
export{
    shop
}
