import parameters from './constant'
/**
 * 小程序配置文件
 */

// 开发环境 dev ，测试环境 test ，正式环境 prod
const DEBUG = 'test';
let hostname = '';
let targetMini='';
let webViewHostname = '';

switch (DEBUG) {
  case 'dev':
    hostname = 'https://xiaoaidev.aibaoxian.com';
    targetMini='develop';
    break;
  case 'test':
    hostname = 'https://xiaoaitest.aibaoxian.com';
    targetMini='trial';
    break;
  case 'prod':
    hostname = 'https://xiaoai.aibaoxian.com';
    targetMini='release';
    break;
}
// api配置
const routerApi = {
  // 公共接口
  routerServices: "/routerServices",
};

const USER_INFO_KEY = 'userInfo';

module.exports = {
  config: {
    DEBUG,
    hostname,
    routerApi,
    parameters,
    USER_INFO_KEY,
      targetMini
  }

}
