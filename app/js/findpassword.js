// $(".interest-container-choice-center-button").on("click",function(){
//         var username=$.trim($(".login-phone").val());
//         var password=$.trim($(".login-password-input").val());
//         getData1({url:config.findpassword,data:{username:username,password:password}},function(data){
//             console.log(data.token)
//             if(data.token){
//                 // location.href="index.html",
//                 localStorage.setItem("token",JSON.stringify(data.token));//保存token
//                 localStorage.setItem("username",JSON.stringify(username));//保存用户名
//                 localStorage.setItem("password",JSON.stringify(password));//保存密码
//             }else{
//                 $(".login-error").html("用户名或者密码错误")
//             }
//         })
//     });


$(function(){
    $(".person-code-get").on("click",function(){
        var mobilephone=$.trim($(".register-phone").val());
        getData1({url:config.findpassword+mobilephone,type:'GET'},function(data){
            console.log(data)
        })
       
    })



})
