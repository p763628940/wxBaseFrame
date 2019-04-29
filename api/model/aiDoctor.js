//视频医生几口
/**
 *  @ajax   入参   hosturl 路径    interfaceNo 接口代号
 *
 * */

function aiDoctor(ajax,hosturl) {
    const aiDoctor = {
        getPayUrl:ajax(hosturl,'600038','POST'), //获取 支付链接
        getProductInfo:ajax(hosturl,'600035','POST'),//(600035)查询商品信息(列表/详情）
        registNewUser:ajax(hosturl,'600045','POST'), //(600045)注册领卡接口
        getVerifyCode:ajax(hosturl,'600044','POST') //(600044)获取验证码
    }
    return aiDoctor
}
export{
    aiDoctor
}
