//医院模块
/**
 *  @ajax   入参   hosturl 路径    interfaceNo 接口代号
 *
 * */
function Hospital(ajax,hosturl) {
    const Hospital = {
        getHospitalDetail: ajax(hosturl,'600017','POST'),
        getHospitalDeptList: ajax(hosturl,'600023','POST'),
        makeBill: ajax(hosturl,'600052','POST'),
        getPayLink: ajax(hosturl,'600024','POST')
    }
    return Hospital
}
export{
    Hospital
}
