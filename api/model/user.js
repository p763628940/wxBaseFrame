//用户模块
/**
 *  @ajax   入参   hosturl 路径    interfaceNo 接口代号
 *
 * */

function user(ajax,hosturl) {
     const user = {
         getUserId: ajax(hosturl,'100161','POST'),
         getOpenId: ajax(hosturl,'600030','POST'),
         decodeUser: ajax(hosturl,'600048','POST'),
         addUserMessage: ajax(hosturl,'100118','POST'),
         shareSuccess:ajax(hosturl,'600046','POST'),
         getSherMessage:ajax(hosturl,'600047','POST'),
         makePoint:ajax(hosturl,'100316','POST'),
         getPayUrl:ajax(hosturl,'600038','POST') //获取 支付链接
     }
    return user
}

 export{
     user
 }
