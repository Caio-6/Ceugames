document.body.addEventListener("click",function (event){
    if(event.target.closest(".btn-action") || event.target.closest(".btn-add-friend"))
    {
        window.alert("É uma pena, mas por enquanto essa função não está disponível");   
    }
})