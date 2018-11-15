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
        var infocity=$(".info_city").val()

        $.ajax({
            url: config.userinfo,
            data: {
                username:infoname,
                address:infoclass,
                birthday:infobir,
                gender:infosex
            },
            headers:{"Authorization":'Token '+'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InNzeXppIiwiZXhwIjoxNTQyODY2NTE3LCJlbWFpbCI6IiJ9.eoF7G2-OrfFrRAkWSOJMOU0z-Z0CIkYOzRvdpUYim6E'},
            dataType: 'JSON',
            type: 'PUT',
            success: function (data) {
                console.log(data)
            },
            error: function (data) {
                console.log(data)
            }
        });
        // $.ajax({
        //     url: config.userinfo,
        //     // data: {
        //     //     username:infoname,
        //     //     address:infoclass,
        //     //     birthday:infobir,
        //     //     gender:infosex
        //     // },
        //     headers:{"Authorization":'Token '+'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InNzeXppIiwiZXhwIjoxNTQyODY2NTE3LCJlbWFpbCI6IiJ9.eoF7G2-OrfFrRAkWSOJMOU0z-Z0CIkYOzRvdpUYim6E'},
        //     dataType: 'JSON',
        //     type: 'GET',
        //     data:{username:infoname},
        //     success: function (data) {
        //         console.log(data)
        //     },
        //     error: function (data) {
        //         console.log(data)
        //     }
        // });
        // getData({url:config.userinfo,type:'GET',data:{username:infoname}},function(data){
        //     console.log(data)
        // })
    })
})