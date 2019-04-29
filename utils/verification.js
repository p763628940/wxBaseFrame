/**
 * 姓名校验
 */
const nameVerification = value => {
  if (value != '') {
    var val = value
    var msg = ''
    // 英文点和句号替换成中间点
    val = val.replace(/\.|。/g, "·")
    // 去除左右空格
    val = val.replace(/(^\s*)|(\s*$)/g, "")
    // 汉字包括少数民族名字
    var reg = new RegExp("^(([\u4e00-\u9fa5\\s]+[·])*[\u4e00-\u9fa5\\s]+)$")
    // 英文
    var reg1 = new RegExp("^([a-zA-Z\\s]+)$")
    // 为汉字的时候的处理
    if (reg.test(val)) {
      val = val.replace(/\s+/g, "")
      if (1 == val.length) {
        msg = "中文名字最少长度为2"
        wx.showToast({
          title: '中文名字最少长度为2',
          icon: 'none',
          duration: 1000
        });
      } else if (val.length > 32) {
        msg = "中文名字最大长度为32"
        wx.showToast({
          title: '中文名字最大长度为32',
          icon: 'none',
          duration: 1000
        });
      } else {
        msg = "0000"
      }
    } else if (reg1.test(val)) { //为英文的时候的处理
      val = val.replace(/[\s]+/g, " "); //空白符替换成空格
      if (1 == val.length) {
        msg = "英文名字最少长度为2"
        wx.showToast({
          title: '英文名字最少长度为2',
          icon: 'none',
          duration: 1000
        });
      } else if (val.length > 64) {
        msg = "英文名字最大长度为64"
        wx.showToast({
          title: '英文名字最大长度为64',
          icon: 'none',
          duration: 1000
        });
      } else {
        msg = "0000"
      }
    } else { //混合的时候处理
      msg = "请输入姓名"
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000
      });
    }
  } else { //混合的时候处理
    msg = "请输入姓名"
    wx.showToast({
      title: '请输入姓名',
      icon: 'none',
      duration: 1000
    });
  }
  if (msg != '0000' || msg == '') {
    return {
      veCode: false,
      msg: msg
    }
  } else {
    return {
      veCode: true,
      msg: val
    }
  }
}

/**
 * 手机号码校验
 */

const phoneVerification = value => {
  if (value != '') {
    var val = value
    var msg = "请输入正确的手机号码"
    val = val.replace(/\s+/g, "")
    var reg = new RegExp("^[1][3-9]\\d{9}$")
    // /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
    if (reg.test(val)) {
      msg = "0000"
    } else {
      msg = "请输入正确的手机号码"
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      });
    }
  } else {
    msg = "请输入正确的手机号码"
    wx.showToast({
      title: '手机号不能为空',
      icon: 'none',
      duration: 1000
    });
  }
  if (msg != '0000' || msg == '') {
    return {
      veCode: false,
      msg: msg
    }
  } else {
    return {
      veCode: true,
      msg: val
    }
  }
}

/**
 * Description: 银行卡号Luhm校验
 * Luhm校验规则：16位银行卡号（19位通用）:
 * 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
 * 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
 * 3.将加法和加上校验位能被 10 整除。
 */

const luhmCheck = bankno => {
  var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
  var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
  var newArr = new Array();

  for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }

  var arrJiShu = new Array(); //奇数位*2的积 <9
  var arrJiShu2 = new Array(); //奇数位*2的积 >9
  var arrOuShu = new Array(); //偶数位数组

  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) { //奇数位
      if (parseInt(newArr[j]) * 2 < 9)
        arrJiShu.push(parseInt(newArr[j]) * 2);
      else
        arrJiShu2.push(parseInt(newArr[j]) * 2);
    } else //偶数位
      arrOuShu.push(newArr[j]);
  }

  var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数

  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }

  var sumJiShu = 0; //奇数位*2 < 9 的数组之和
  var sumOuShu = 0; //偶数位数组之和
  var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0;

  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }

  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }

  //计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

  //计算Luhm值
  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  var luhm = 10 - k;

  if (lastNum == luhm && lastNum.length != 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * 银行卡号验证
 */

const bandNoVerification = value => {
  if (value != '') {
    var val = value
    var msg = "请输入正确的银行卡号"
    // 去除空格
    val = val.replace(/\s+/g, "")
    if (!luhmCheck(val)) {
      msg = "请输入正确的银行卡号"
    } else {
      msg = '0000'
    }
  } else {
    msg = "请输入正确的银行卡号"
  }
  if (msg != '0000' || msg == '') {
    return {
      veCode: false,
      msg: msg
    }
  } else {
    return {
      veCode: true,
      msg: val
    }
  }
}

/**
 * 邮箱
 */
const emailVerification = value => {
  if (value != '' || value != null) {
    var val = value
    var msg = ''
    // 去除左右空格
    val = val.replace(/(^\s*)|(\s*$)/g, "")
    // 验证邮箱格式
    var reg = new RegExp("(^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$)")
    // 邮箱输入错误
    if (!reg.test(val)) {
      msg = "请输入正确的邮箱"
    } else { //混合的时候处理
      msg = "0000"
    }
  } else { //混合的时候处理
    msg = "邮箱不能为空"
  }
  if (msg != '0000' || msg == '') {
    return {
      veCode: false,
      msg: msg
    }
  } else {
    return {
      veCode: true,
      msg: val
    }
  }
}
/**
 * 身份证
 */
const idCardVerification = value => {
  if (value != '' || value != null) {
    var val = value
    var msg = ''
    // 去除左右空格
    val = val.replace(/(^\s*)|(\s*$)/g, "")
    //地区号
    var city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    // 验证身份证格式
    var reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
    if (!reg.test(val)) {
      msg = "请输入正确的身份证号码"
      wx.showToast({
        title: '请输入正确的身份证号码',
        icon: 'none',
        duration: 1000
      });
    } else if (!city[val.substr(0, 2)]) {
      msg = "地址编码错误";
      wx.showToast({
        title: '地址编码错误',
        icon: 'none',
        duration: 1000
      });
    } else {
      if (val.length == 18) {
        //将前17位保存在加权因子数组里
        var w = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        //这是除以11后，可能产生的11位余数、验证码，也保存成数组，校验位
        var y = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
        var sum = 0; //用来保存前17位各自相乖后的总和

        for (var i = 0; i < 17; i++) {
          sum += val.substring(i, i + 1) * w[i];
        }
        var idCardMod = sum % 11; //计算出校验码所在数组的位置
        var idCardLast = val.substring(17); //得到最后一位身份证号码
        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (idCardMod == 2) {
          if (!(idCardLast == "X" || idCardLast == "x")) {
            return false;
          }
        } else {
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (!(idCardLast == y[idCardMod])) {
            return false;
          }
        }
        msg = "0000"
      }
    }
  } else { //混合的时候处理
    msg = "身份证号码不能为空"
    wx.showToast({
      title: '身份证号码不能为空',
      icon: 'none',
      duration: 1000
    });
  }
  if (msg != '0000' || msg == '') {
    return {
      veCode: false,
      msg: msg
    }
  } else {
    return {
      veCode: true,
      msg: val
    }
  }
}
/**
 * 验证码
 */
const codeVerification = value => {
  if (value != '' || value != null) {
    var val = value
    var msg = ''
    // 去除左右空格
    val = val.replace(/(^\s*)|(\s*$)/g, "")
    // 全数字
    var reg = new RegExp(/^\d*$/)
    // 验证码输入错误
    if (!reg.test(val)) {
      msg = "请输入正确的验证码"
    } else {
      msg = "0000"
    }
  } else { //混合的时候处理
    msg = "验证码不能为空"
  }
  if (msg != '0000' || msg == '') {
    return {
      veCode: false,
      msg: msg
    }
  } else {
    return {
      veCode: true,
      msg: val
    }
  }
}
const sendVerifyCode = userCodeTxt => {
  let interval = null;
  userCodeTxt = '获取验证码';
  let currentTime = 60;

  if (currentTime == 60) {
    userCodeTxt = currentTime + 's';
  }

  interval = setInterval(function() {
    currentTime--;
    userCodeTxt = currentTime + 's';
    currentTime = currentTime
    if (currentTime <= 0) {
      clearInterval(interval)
      userCodeTxt = '重新获取';
      currentTime = 60;
      disabled = false;
    }
  }, 1000)
}
export const verification = {
  nameVerification: nameVerification,
  phoneVerification: phoneVerification,
  bandNoVerification: bandNoVerification,
  emailVerification: emailVerification,
  idCardVerification: idCardVerification,
  codeVerification: codeVerification,
  sendVerifyCode: sendVerifyCode
}