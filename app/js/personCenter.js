window.onload=function(){
    var personAnv=document.querySelector('.person-anv');
    var personAnvChild=personAnv.querySelector('ul');
    var personAnvLi=personAnvChild.children;
    var headerResiger=document.querySelector('.header-register');//导航栏注册
    var headerLogin=document.querySelector('.header-login');//导航栏登陆

    var personLogin=document.querySelector(".person-register");
    var  personloginregister = document.querySelector(".person-login");

   

    for(var i=0;i<personAnvLi.length;i++){
        personAnvLi[i].index=i;
        personAnvLi[i].onclick=function(){
            for(var i=0;i<personAnvLi.length;i++){
                personAnvLi[i].className=""
            }
            this.className="active"
        }
    }

    headerResiger.onclick=function(){
        personLogin.style.display="block"
    }

    headerLogin.onclick=function(){
        personloginregister.style.display="block"
    }




}