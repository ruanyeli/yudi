$(function(){
    var flag=true;
    $(".body-img").on("click",function(){
        if(flag){
            $('.body-dig').css("display","block");
            var digChildren=$('.body-dig').children().children()
            digChildren.on("click",function(){
                $(this).addClass("active").siblings('li').removeClass("active")
            })
            flag=false;
        }else{
            $('.body-dig').css("display","none");
            flag=true;
        }
        
    })
})