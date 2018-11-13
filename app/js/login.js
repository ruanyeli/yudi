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


    //自动登陆
    var checkbox=$(".login-box-text").find("input");
    console.log(checkbox)
    checkbox.change(function () { 
       
    });


})