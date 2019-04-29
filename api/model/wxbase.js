
// 用于存储 封装过后的微信异步操作

//login 换取 openid
function wxLogin() {
    return new Promise(function(resolve,reject){
        wx.login({
            success: res => {
                if (res.code) {
                    // code本地保存，随时调用
                    resolve(res.code)
                }else {
                    reject(res)
                }
            }
        })
    })
}
//检查session 是否过期
function checkSession() {
    return new Promise(function(resolve,reject){
        wx.checkSession({
            success() {
                console.log("处于登录态");
                // session_key 未过期，并且在本生命周期一直有效
                resolve(true)
            },
            fail() {
                reject(false)

            }
        })
    })
}
// 获取 配置
//获取地理位置 封装

module.exports={
    wxBase:{
        wxLogin,
        checkSession
    }
}


