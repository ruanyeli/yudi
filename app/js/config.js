//api
const serverurl = 'http://47.100.31.94';
const config = {
    register: serverurl + '/users', //注册
    code: serverurl + '/sms_codes/', //短信验证码
    news: serverurl + '/news/', //新闻列表
    lesson: serverurl + '/lessons', //课程
    mobile: serverurl + 'mobiles/{mobile}/count/', //手机号码注册数量
    userinfo: serverurl + '/userinfo/', //用户个人中心
    email: serverurl + '/emails/', //保存用户email
    login: serverurl + '/auth/', //登陆
    accounts: serverurl + 'accounts/{account}/password/token/', //根据用户帐号获取修改密码的token
    assgin: serverurl + '/assigns/', //题目
    qq: serverurl + '/qq/auth/', //qq登陆
    wechat:serverurl+'/weixin/auth/',//微信登陆


}



//ajax
window.getData = function (param, callback) {
    $.ajax({
        type: param.type || 'POST',
        url: param.url,
        data: param.data,
        async: param.async == null ? true : false,
        dataType: 'json',
        success: function (data) {
            callback && callback(data)
        },
        error: function(data){
            callback && callback(data)
       }        
    })
}



// 获取地址栏参数
function getParamsByUrl(url, name) {
    var params = url.substr(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        if (param[0] == name) {
            return param[1];
        }
    }
    return null;
}