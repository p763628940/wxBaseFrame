var countryList = [
    {"name":"中国大陆","code":"86","prefix":"0"},
    {"name":"中国香港","code":"852","prefix":"0"},
    {"name":"中国澳门","code":"853","prefix":"0"},
    {"name":"中国台湾","code":"886","prefix":"0"},
    {"name":"阿布哈兹","code":"7","type":"A"},
    {"name":"阿布哈兹","code":"7","prefix":"A"},
    {"name":"阿尔巴尼亚","code":"355","prefix":"A"},
    {"name":"阿尔及利亚","code":"213","prefix":"A"},
    {"name":"阿富汗","code":"93","prefix":"A"},
    {"name":"阿根廷","code":"54","prefix":"A"},
    {"name":"阿联酋","code":"971","prefix":"A"},
    {"name":"阿鲁巴","code":"297","prefix":"A"},
    {"name":"阿曼","code":"968","prefix":"A"},
    {"name":"阿塞拜疆","code":"994","prefix":"A"},
    {"name":"阿森松岛","code":"247","prefix":"A"},
    {"name":"埃及","code":"20","prefix":"A"},
    {"name":"埃塞俄比亚","code":"251","prefix":"A"},
    {"name":"爱尔兰","code":"353","prefix":"A"},
    {"name":"爱沙尼亚","code":"372","prefix":"A"},
    {"name":"安道尔","code":"376","prefix":"A"},
    {"name":"安哥拉","code":"244","prefix":"A"},
    {"name":"安圭拉岛","code":"1264","prefix":"A"},
    {"name":"安提瓜和巴布达岛","code":"1268","prefix":"A"},
    {"name":"奥地利","code":"43","prefix":"A"},
    {"name":"澳大利亚","code":"61","prefix":"A"},
    {"name":"澳门","code":"853","prefix":"A"},
    {"name":"阿布哈兹","code":"7","type":"B"},
    {"name":"巴巴多斯岛","code":"1246","prefix":"B"},
    {"name":"巴布亚新几内亚","code":"675","prefix":"B"},
    {"name":"巴哈马群岛","code":"1242","prefix":"B"},
    {"name":"巴基斯坦","code":"92","prefix":"B"},
    {"name":"巴拉圭","code":"595","prefix":"B"},
    {"name":"巴勒斯坦","code":"970","prefix":"B"},
    {"name":"巴林","code":"973","prefix":"B"},
    {"name":"巴拿马","code":"507","prefix":"B"},
    {"name":"巴西","code":"55","prefix":"B"},
    {"name":"白俄罗斯","code":"375","prefix":"B"},
    {"name":"百慕大群岛","code":"1441","prefix":"B"},
    {"name":"保加利亚","code":"359","prefix":"B"},
    {"name":"北马里亚纳群岛","code":"1670","prefix":"B"},
    {"name":"北塞浦路斯","code":"392","prefix":"B"},
    {"name":"贝宁","code":"229","prefix":"B"},
    {"name":"比利时","code":"32","prefix":"B"},
    {"name":"冰岛","code":"354","prefix":"B"},
    {"name":"波多黎各","code":"1787","prefix":"B"},
    {"name":"波黑","code":"387","prefix":"B"},
    {"name":"波兰","code":"48","prefix":"B"},
    {"name":"玻利维亚","code":"591","prefix":"B"},
    {"name":"伯利兹","code":"501","prefix":"B"},
    {"name":"博茨瓦纳","code":"267","prefix":"B"},
    {"name":"不丹","code":"975","prefix":"B"},
    {"name":"布基纳法索","code":"226","prefix":"B"},
    {"name":"布隆迪","code":"257","prefix":"B"},
    {"name":"秘鲁","code":"51","prefix":"B"},
    {"name":"阿布哈兹","code":"7","type":"C"},
    {"name":"朝鲜","code":"850","prefix":"C"},
    {"name":"赤道几内亚","code":"240","prefix":"C"},
    {"name":"阿布哈兹","code":"7","type":"D"},
    {"name":"丹麦","code":"45","prefix":"D"},
    {"name":"德国","code":"49","prefix":"D"},
    {"name":"东帝汶","code":"670","prefix":"D"},
    {"name":"多哥","code":"228","prefix":"D"},
    {"name":"多米尼加","code":"1849","prefix":"D"},
    {"name":"阿布哈兹","code":"7","type":"E"},
    {"name":"俄罗斯","code":"7","prefix":"E"},
    {"name":"厄瓜多尔","code":"593","prefix":"E"},
    {"name":"厄立特里亚","code":"291","prefix":"E"},
    {"name":"阿布哈兹","code":"7","type":"F"},
    {"name":"法国","code":"33","prefix":"F"},
    {"name":"法罗群岛","code":"298","prefix":"F"},
    {"name":"法属波利尼西亚","code":"689","prefix":"F"},
    {"name":"法属圭亚那","code":"594","prefix":"F"},
    {"name":"菲律宾","code":"63","prefix":"F"},
    {"name":"斐济","code":"679","prefix":"F"},
    {"name":"芬兰","code":"358","prefix":"F"},
    {"name":"佛得角","code":"238","prefix":"F"},
    {"name":"福克兰群岛","code":"500","prefix":"F"},
    {"name":"阿布哈兹","code":"7","type":"G"},
    {"name":"冈比亚","code":"220","prefix":"G"},
    {"name":"刚果（布）","code":"242","prefix":"G"},
    {"name":"刚果（金）","code":"243","prefix":"G"},
    {"name":"哥伦比亚","code":"57","prefix":"G"},
    {"name":"哥斯达黎加","code":"506","prefix":"G"},
    {"name":"格恩西","code":"44","prefix":"G"},
    {"name":"格林纳达","code":"1473","prefix":"G"},
    {"name":"格陵兰岛","code":"299","prefix":"G"},
    {"name":"格鲁吉亚","code":"995","prefix":"G"},
    {"name":"古巴","code":"53","prefix":"G"},
    {"name":"瓜德罗普","code":"590","prefix":"G"},
    {"name":"关岛","code":"1","prefix":"G"},
    {"name":"圭亚那","code":"592","prefix":"G"},
    {"name":"阿布哈兹","code":"7","type":"H"},
    {"name":"哈萨克斯坦","code":"7","prefix":"H"},
    {"name":"海地","code":"509","prefix":"H"},
    {"name":"韩国","code":"82","prefix":"H"},
    {"name":"荷兰","code":"31","prefix":"H"},
    {"name":"荷兰加勒比区","code":"599","prefix":"H"},
    {"name":"荷属安的列斯群岛","code":"599","prefix":"H"},
    {"name":"荷属圣马丁","code":"599","prefix":"H"},
    {"name":"黑山","code":"382","prefix":"H"},
    {"name":"洪都拉斯","code":"504","prefix":"H"},
    {"name":"阿布哈兹","code":"7","type":"J"},
    {"name":"基里巴斯","code":"686","prefix":"J"},
    {"name":"吉布提","code":"253","prefix":"J"},
    {"name":"吉尔吉斯斯坦","code":"996","prefix":"J"},
    {"name":"几内亚","code":"224","prefix":"J"},
    {"name":"几内亚比绍共和国","code":"245","prefix":"J"},
    {"name":"加拿大","code":"1","prefix":"J"},
    {"name":"加纳","code":"233","prefix":"J"},
    {"name":"加蓬","code":"241","prefix":"J"},
    {"name":"柬埔寨","code":"855","prefix":"J"},
    {"name":"捷克","code":"420","prefix":"J"},
    {"name":"津巴布韦","code":"263","prefix":"J"},
    {"name":"阿布哈兹","code":"7","type":"K"},
    {"name":"喀麦隆","code":"237","prefix":"K"},
    {"name":"卡塔尔","code":"974","prefix":"K"},
    {"name":"开曼群岛","code":"1345","prefix":"K"},
    {"name":"科摩罗","code":"269","prefix":"K"},
    {"name":"科索沃","code":"383","prefix":"K"},
    {"name":"科特迪瓦","code":"225","prefix":"K"},
    {"name":"科威特","code":"965","prefix":"K"},
    {"name":"克罗地亚","code":"385","prefix":"K"},
    {"name":"肯尼亚","code":"254","prefix":"K"},
    {"name":"库克群岛","code":"682","prefix":"K"},
    {"name":"库拉索","code":"599","prefix":"K"},
    {"name":"阿布哈兹","code":"7","type":"L"},
    {"name":"拉脱维亚","code":"371","prefix":"L"},
    {"name":"莱索托","code":"266","prefix":"L"},
    {"name":"老挝","code":"856","prefix":"L"},
    {"name":"黎巴嫩","code":"961","prefix":"L"},
    {"name":"立陶宛","code":"370","prefix":"L"},
    {"name":"利比里亚","code":"231","prefix":"L"},
    {"name":"利比亚","code":"218","prefix":"L"},
    {"name":"列支士登","code":"423","prefix":"L"},
    {"name":"留尼汪岛","code":"262","prefix":"L"},
    {"name":"卢森堡","code":"352","prefix":"L"},
    {"name":"卢旺达","code":"250","prefix":"L"},
    {"name":"罗马尼亚","code":"40","prefix":"L"},
    {"name":"阿布哈兹","code":"7","type":"M"},
    {"name":"马达加斯加","code":"261","prefix":"M"},
    {"name":"马恩岛","code":"44-1624","prefix":"M"},
    {"name":"马尔代夫","code":"960","prefix":"M"},
    {"name":"马耳他","code":"356","prefix":"M"},
    {"name":"马拉维","code":"265","prefix":"M"},
    {"name":"马来西亚","code":"60","prefix":"M"},
    {"name":"马里","code":"223","prefix":"M"},
    {"name":"马其顿","code":"389","prefix":"M"},
    {"name":"马绍尔群岛","code":"692","prefix":"M"},
    {"name":"马提尼克","code":"596","prefix":"M"},
    {"name":"马约特","code":"269","prefix":"M"},
    {"name":"毛里求斯","code":"230","prefix":"M"},
    {"name":"毛里塔尼亚","code":"222","prefix":"M"},
    {"name":"美国","code":"1","prefix":"M"},
    {"name":"美属萨摩亚","code":"1684","prefix":"M"},
    {"name":"蒙古","code":"976","prefix":"M"},
    {"name":"蒙特塞拉特","code":"1664","prefix":"M"},
    {"name":"孟加拉国","code":"880","prefix":"M"},
    {"name":"密克罗尼西亚","code":"691","prefix":"M"},
    {"name":"缅甸","code":"95","prefix":"M"},
    {"name":"摩尔多瓦","code":"373","prefix":"M"},
    {"name":"摩洛哥","code":"212","prefix":"M"},
    {"name":"摩纳哥","code":"377","prefix":"M"},
    {"name":"莫桑比克","code":"258","prefix":"M"},
    {"name":"墨西哥","code":"52","prefix":"M"},
    {"name":"阿布哈兹","code":"7","type":"N"},
    {"name":"纳米比亚","code":"264","prefix":"N"},
    {"name":"南奥塞梯","code":"995-34","prefix":"N"},
    {"name":"南非","code":"27","prefix":"N"},
    {"name":"南苏丹","code":"211","prefix":"N"},
    {"name":"瑙鲁","code":"674","prefix":"N"},
    {"name":"尼泊尔","code":"977","prefix":"N"},
    {"name":"尼加拉瓜","code":"505","prefix":"N"},
    {"name":"尼日尔","code":"227","prefix":"N"},
    {"name":"尼日利亚","code":"234","prefix":"N"},
    {"name":"挪威","code":"47","prefix":"N"},
    {"name":"诺福克岛","code":"672","prefix":"N"},
    {"name":"阿布哈兹","code":"7","type":"P"},
    {"name":"帕劳","code":"680","prefix":"P"},
    {"name":"葡萄牙","code":"351","prefix":"P"},
    {"name":"阿布哈兹","code":"7","type":"R"},
    {"name":"日本","code":"81","prefix":"R"},
    {"name":"瑞典","code":"46","prefix":"R"},
    {"name":"瑞士","code":"41","prefix":"R"},
    {"name":"阿布哈兹","code":"7","type":"S"},
    {"name":"SaintKitts与尼维斯","code":"1869","prefix":"S"},
    {"name":"萨尔瓦多","code":"503","prefix":"S"},
    {"name":"萨摩亚","code":"685","prefix":"S"},
    {"name":"塞尔维亚","code":"381","prefix":"S"},
    {"name":"塞拉利昂","code":"232","prefix":"S"},
    {"name":"塞内加尔","code":"221","prefix":"S"},
    {"name":"塞浦路斯","code":"357","prefix":"S"},
    {"name":"塞舌尔","code":"248","prefix":"S"},
    {"name":"沙特阿拉伯","code":"966","prefix":"S"},
    {"name":"圣多美和普林西比","code":"239","prefix":"S"},
    {"name":"圣露西亚","code":"1758","prefix":"S"},
    {"name":"圣马利诺","code":"378","prefix":"S"},
    {"name":"圣皮埃尔和密克隆","code":"508","prefix":"S"},
    {"name":"圣文森特和格林纳丁斯","code":"1784","prefix":"S"},
    {"name":"斯里兰卡","code":"94","prefix":"S"},
    {"name":"斯洛伐克","code":"421","prefix":"S"},
    {"name":"斯洛文尼亚","code":"386","prefix":"S"},
    {"name":"斯威士兰","code":"268","prefix":"S"},
    {"name":"苏丹","code":"249","prefix":"S"},
    {"name":"苏里南","code":"597","prefix":"S"},
    {"name":"所罗门群岛","code":"677","prefix":"S"},
    {"name":"索马利亚","code":"252","prefix":"S"},
    {"name":"新加坡","code":"65","prefix":"S"},
    {"name":"阿布哈兹","code":"7","type":"T"},
    {"name":"塔吉克斯坦","code":"992","prefix":"T"},
    {"name":"泰国","code":"66","prefix":"T"},
    {"name":"坦桑尼亚","code":"255","prefix":"T"},
    {"name":"汤加","code":"676","prefix":"T"},
    {"name":"特克斯和凯科斯群岛","code":"1649","prefix":"T"},
    {"name":"特立尼达和多巴哥","code":"1868","prefix":"T"},
    {"name":"突尼斯","code":"216","prefix":"T"},
    {"name":"土耳其","code":"90","prefix":"T"},
    {"name":"土库曼斯坦","code":"993","prefix":"T"},
    {"name":"阿布哈兹","code":"7","type":"W"},
    {"name":"瓦努阿图","code":"678","prefix":"W"},
    {"name":"危地马拉","code":"502","prefix":"W"},
    {"name":"委内瑞拉","code":"58","prefix":"W"},
    {"name":"文莱","code":"673","prefix":"W"},
    {"name":"沃利斯与富图纳群岛","code":"681","prefix":"W"},
    {"name":"乌干达","code":"256","prefix":"W"},
    {"name":"乌克兰","code":"380","prefix":"W"},
    {"name":"乌拉圭","code":"598","prefix":"W"},
    {"name":"乌兹别克斯坦","code":"998","prefix":"W"},
    {"name":"阿布哈兹","code":"7","type":"X"},
    {"name":"西班牙","code":"34","prefix":"X"},
    {"name":"希腊","code":"30","prefix":"X"},
    {"name":"香港","code":"852","prefix":"X"},
    {"name":"新喀里多尼亚","code":"687","prefix":"X"},
    {"name":"新西兰","code":"64","prefix":"X"},
    {"name":"匈牙利","code":"36","prefix":"X"},
    {"name":"叙利亚","code":"963","prefix":"X"},
    {"name":"叙利亚","code":"963","prefix":"X"},
    {"name":"阿布哈兹","code":"7","type":"Y"},
    {"name":"牙买加","code":"1876","prefix":"Y"},
    {"name":"亚美尼亚","code":"374","prefix":"Y"},
    {"name":"也门","code":"967","prefix":"Y"},
    {"name":"伊拉克","code":"964","prefix":"Y"},
    {"name":"伊朗","code":"98","prefix":"Y"},
    {"name":"以色列","code":"972","prefix":"Y"},
    {"name":"意大利","code":"39","prefix":"Y"},
    {"name":"印度","code":"91","prefix":"Y"},
    {"name":"印度尼西亚","code":"62","prefix":"Y"},
    {"name":"英国","code":"44","prefix":"Y"},
    {"name":"英属维尔京群岛","code":"1284","prefix":"Y"},
    {"name":"英属印度洋领地","code":"246","prefix":"Y"},
    {"name":"约旦","code":"962","prefix":"Y"},
    {"name":"越南","code":"84","prefix":"Y"},
    {"name":"阿布哈兹","code":"7","type":"Z"},
    {"name":"赞比亚","code":"260","prefix":"Z"},
    {"name":"泽西岛","code":"44","prefix":"Z"},
    {"name":"乍得","code":"235","prefix":"Z"},
    {"name":"直布罗陀","code":"350","prefix":"Z"},
    {"name":"智利","code":"56","prefix":"Z"},
    {"name":"中非共和国","code":"236","prefix":"Z"}
    ]


module.exports = {
  countryList: countryList
}