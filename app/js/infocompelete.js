$(function(){
    //  Pretty simple huh?
     var scene = document.getElementById('scene');
     var parallax = new Parallax(scene);

     //初始化时间选择器
     zaneDate({
         elem: '#zane-calendar',
         width: 300,
         // 插件宽度配置 250 <= X <= 500
         height: 300,
         // 插件高度配置 250 <= X <= 350
         behindTop: 0,
     })
     
     //初始化地址选择器
     ylc = yeluochenCity('info_city', (city) => {console.log(city)}, null);
    //  console.log(ylc)
    //  

    $(".register-success>p").click(function(){
        var token=JSON.parse(localStorage.getItem('token'));
        console.log(token)
        var infoname=$.trim($(".info-name").val());
        var infosex=$.trim($(".info-sex").val());
        var infoclass=$.trim($(".info-class").val());
        var infobir=$.trim($(".info-bir").val());
        var infocity=$(".info_city").val();

       
        
        // if(infosex=="null"){
        //     // alert("请选择性别");
        //     layer.msg("请选择性别");
        // }else {
            // if(infoclass=="null"){
            //     // alert("请选择年级");
            //     console.log("请选择年级");
            //     layer.msg("请选择年级");
            // }
            // else{
                // console.log("infoclass="+infoclass);
                // $.ajax({
                //     url: config.userinfo,
                //     data: {
                //         username:infoname
                //         // address:infocity,
                //         // birthday:infobir,
                //         // gender:infosex,
                //         // class:infoclass
                //     },
                //     headers:{"Authorization":'Token '+token},
                //     dataType: 'JSON',
                //     type: 'PUT',
                //     success: function (data) {
                //         console.log(data)
                //     },
                //     error: function (data) {
                //         console.log(data)
                //     }
                // });

        $.ajax({
            url: config.userinfo,
            data: {
                username:infoname,
            },
            headers:{"Authorization":'Token '+token},
            dataType: 'JSON',
            type: 'PUT',
            success: function (data) {
                console.log(data)
            },
            error: function (data) {
                console.log(data)
            }
        });
        
    })
})