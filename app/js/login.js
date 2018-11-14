$(function () {
    //密码显示隐藏
    var flag = true;
    $(".icon-yanjing_yincang_o").on("click", function () {
        var passwordVal = $(".login-password-input").val().trim().length;
        console.log(passwordVal)
        if (flag && passwordVal > 0) {
            $(".login-password-input").attr("type", "text");
            flag = false
        } else {
            $(".login-password-input").attr("type", "password");
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

    //用户登陆
    $(".login-box-text-success").on("click",function(){
        var username=$.trim($(".login-phone").val());
        var password=$.trim($(".login-password-input").val());
        getData({url:config.login,data:{username:username,password:password}},function(data){
            console.log(data)
            if(data.token){
                location.href="index.html"
            }
            localStorage.setItem("token",JSON.stringify(data.token));
        })
    })



    //自动登陆
    var checkbox=$(".login-box-text").find("input");
    checkbox.change(function () { 
       var checked=$(this).is(":checked")
       console.log(checked)
       if(checked){
           localStorage.setItem('username',JSON.stringify())
       }
    });


    
})