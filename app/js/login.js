$(function () {
        //自动登陆
        var checkbox=$(".login-box-text").find("input");
        checkbox.change(function () { 
           var checked=$(this).is(":checked")
           console.log(checked)
           if(checked){

           }
        });
    
    //密码显示隐藏
    var flag = true;
    $(".icon-yanjing_yincang_o").on("click", function () {
        var passwordVal = $(".login-password-input").val().trim().length;
        if (flag && passwordVal > 0) {
            $(".login-password-input").attr("type", "text");
            $(this).removeClass().addClass("iconfont icon-yanjing_xianshi_o")
            flag = false
        } else {
            $(".login-password-input").attr("type", "password");
            $(this).removeClass().addClass("iconfont icon-yanjing_yincang_o")
            flag = true;
        }
    })
    
    //第三方登陆
    $(".login_qq").click(function(){
      getData({url:config.qq,type:'GET'},function (data) {
          console.log(data)
          location.href=data.oauth_url
      })
    })
    //微信登陆
    $(".login-wechat").click(function(){
        getData({url:config.wechat,type:"GET"},function(data){
            location.href=data.oauth_url
        })
    })

    // 
    $(".login-delte").click(function(){
        location.href="index.html"
    })




    //用户登陆
    $(".login-box-text-success").on("click",function(){
        var username=$.trim($(".login-phone").val());
        var password=$.trim($(".login-password-input").val());
        getData({url:config.login,data:{username:username,password:password}},function(data){
            // console.log(token)
            if(data.token){
                location.href="index.html",
                localStorage.setItem("token",JSON.stringify(data.token));//保存token
                localStorage.setItem("username",JSON.stringify(username));//保存用户名
                localStorage.setItem("password",JSON.stringify(password));//保存密码
            }else{
                $(".login-error").html("用户名或者密码错误")
            }
        })
    })

    
})