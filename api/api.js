import { config } from "../config/config"; //获取参数配置
import { madeajax } from "../utils/util";      // promise 接口生成函数
import { user } from "./model/user";  // user model 用户相关的接口
import { Hospital } from "./model/Hospital";  // user model 医院相关接口
import { aiDoctor } from "./model/aiDoctor";  // user model 医院相关接口
import { personal } from "./model/personal";  // user model 医院相关接口
import { shop } from "./model/shop";  // user model 医院相关接口
import { wxBase } from "./model/wxbase"; //微信基础 promise模块

module.exports = {
  wxBase: wxBase,
  User: user(madeajax, config.hostname + config.routerApi.routerServices), //用户模块
  Hospital: Hospital(madeajax, config.hostname + config.routerApi.routerServices), //挂号模块
  aiDoctor: aiDoctor(madeajax, config.hostname + config.routerApi.routerServices), //视频医生模块
  personal: personal(madeajax, config.hostname + config.routerApi.routerServices), //个人中心模块
  shop: shop(madeajax, config.hostname + config.routerApi.routerServices), // 返佣 madebylong
}
