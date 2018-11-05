$(function(){
    //获取短信验证码
   $('.person-code-get').click(function(){
    var registerPhone=$.trim($(".register-phone").val());
    
    // console.log(registerCoder)
       //判断是否输入了手机号

    console.log(typeof(registerPhone))
       //匹配手机号码
       if(!(/^1(3|4|5|7|8)\d{9}$/.test(registerPhone))){ 
            alert("请输入正确的手机号码");  
            return false; 
        }
      //获取短信验证码
        getData({url:config.code+registerPhone,type:'GET'},function(data){
            console.log(data)
        })

        //注册
        
        $('.register-success').click(function(){
            var registerCoder=$.trim($(".person-code").val());
            getData({url:config.register,data:{mobile:registerPhone,sms_code:registerCoder}},function(data){
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






