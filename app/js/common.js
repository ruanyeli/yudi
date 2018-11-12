$(function(){
    //导航栏切换
    var personAnv=$(".person-anv").children().children();
    personAnv.on('click',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    
    //点击登陆弹出模态框
    $(".header-login").on('click',function(){
        location.href="login.html"
    })

    //点击注册弹出模态框
    $(".header-register").on('click',function(){
       location.href="register.html"
    })

})
   
