//医院模块
/**
 *  @ajax   入参   hosturl 路径    interfaceNo 接口代号
 *
 * */
function personal(ajax, hosturl) {
  const personal = {
    getUserInfo: ajax(hosturl, '100218', 'POST'), //获取用户基本信息
    getCustomerServiceInfo: ajax(hosturl, '600042', 'POST'), //获取在线客服
    feedback: ajax(hosturl, '100183', 'POST'), //意见反馈
    // scoreByInviteUser: ajax(hosturl, '100269', 'POST'), //邀请好友首页
    getCashAccountInfo: ajax(hosturl, '100267', 'POST'), //获得账户信息
    getMobileVerifyCode: ajax(hosturl, '100250', 'POST'), //获取验证码
    loginOrBindByMobile: ajax(hosturl, '100215', 'POST'), //登录注册
    authorize: ajax(hosturl, '600061', 'POST'),//隐私授权
    getCashWithdrawHistory: ajax(hosturl, '100268', 'POST'),//用户提现历史
    withDrawCash: ajax(hosturl, '100266', 'POST'),//代理人提现
    showWithDrawRecord: ajax(hosturl, '100290', 'POST'),//提现结果页面
    getInviteFriedAwardList: ajax(hosturl, '100271', 'POST'),//奖励明细列表
    savePicByWeChatServerId: ajax(hosturl, '100251', 'POST'),//保存用户认证图片
    completeUserInfo: ajax(hosturl, '100118', 'POST'),//更新用户信息
    showIdPic: ajax(hosturl, '100239', 'POST'),//用户提交认证状态信息
    getBankList: ajax(hosturl, '100260', 'POST'),//获取银行列表
    getBankListBind: ajax(hosturl, '100262', 'POST'),//用户绑定银行卡
    setPasswd: ajax(hosturl, '100261', 'POST'),//用户设置交易密码
    sendMessage: ajax(hosturl, '100265', 'POST'),//获取手机验证码
    showStatus: ajax(hosturl, '100240', 'POST'),//显示认证信息
    getCustomerList: ajax(hosturl, '600054', 'POST'),//代理人客户列表
    getBankCardAndPasswdStatus: ajax(hosturl, '100264', 'POST'),//用户查询银行卡信息
    verityPasswd: ajax(hosturl, '100263', 'POST'),//验证用户交易密码
  }
  return personal
}
export {
  personal
}
