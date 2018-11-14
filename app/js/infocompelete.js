$(function(){
     // Pretty simple huh?
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

    $(".register-success>p").on("click",function(){
        var token=JSON.parse(localStorage.getItem('token'));
        console.log(token)
        var infoname=$.trim($(".info-name").val());
        var infosex=$.trim($(".info-sex").val());
        var infoclass=$.trim($(".info-class").val());
        var infobir=$.trim($(".info-bir").val());
        var infocity=$(".info_city").val()
        getData({url:config.userinfo,type:'GET',headers:{"X-CSRFToken":token},data:{username:infoname,gender:infosex,birthday:infobir,address:infocity}},function(data){
            console.log(data)
        })
    })
})