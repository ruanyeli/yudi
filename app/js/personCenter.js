$(function(){
    var per_nav=$(".personcenter-center").children();
    console.log(per_nav)
    var per_tab=$(".per-tab")
    console.log(per_tab)

    per_nav.on("click",function () { 
        $(this).addClass('active').siblings('p').removeClass('active');
        var index = $(this).index();
        per_tab.eq(index).addClass('selected').siblings('div').removeClass('selected');

     })
    
})
