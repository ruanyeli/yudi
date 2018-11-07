$(function(){
    //获取短信验证码
    // clearInterval(timer);
    // var timer=null;
    $('.person-code-get').click(function(){
        var registerPhone=$.trim($(".register-phone").val());
        $(this).attr("disabled",true);
        console.log(registerPhone)
        //判断是否输入了手机号

       //匹配手机号码
       if(!(/^1(3|4|5|7|8)\d{9}$/.test(registerPhone))){ 
            alert("请输入正确的手机号码");
            $(this).attr("disabled",false);
            console.log(registerPhone)  
            // $(".register-phone").val(" ");
            return false; 
        }
      //获取短信验证码
        getData({url:config.code+registerPhone,type:'GET'},function(data){
            console.log(data)
            // console.log($('.person-code-get').val())
            //设置定时器
            var s=60;
            // timer=setInterval(function(){
            //     // $('.person-code-get').val()=s;
            //     s--;
            //     if(s == 0){
            //         $('.person-code-get').val("请输入验证码");
            //         $('.person-code-get').removeAttr("disabled");
            //         clearInterval(timer);                   
            //     }else{
            //         $('.person-code-get').val(s+"秒后重试");
            //         return;
            //     }
            // },1000)
        })

        //注册
        $('.register-success').click(function(){
            var registerPhone=$.trim($(".register-phone").val());
            var registerPasword=$.trim($(".password-get").val());
            var smsCoder=$.trim($(".person-code").val());
            getData({url:config.register,data:{mobile:registerPhone,sms_code:smsCoder,password:registerPasword}},function(data){
                console.log(data)
            })

        })

    })

    //用户登陆
    $('.login-box-text-success').click(function(){
        console.log(1)
        var loginPhone=$.trim($('.login-phone').val());
        var loginPassword=$.trim($('.login-password').val());
        console.log(loginPhone)
        getData({url:config.login,data:{username:loginPhone,password:loginPassword}},function(data){
            console.log(data)
        })
    })
    
   })






