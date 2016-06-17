jQuery(function () {
    
    setInterval(function () {        
        var usuario = sessionStorage.getItem("User");
        if(!usuario){
            window.location.href = '../../../index.html';
        } else {
            var obj = JSON.parse(usuario);
            if(!obj.id){
                window.location.href = '../../../index.html';
            }
        }
    }, 1500);

});

function menuSair() {
    sessionStorage.clear();
    window.location.href = '../../../index.html';
}
function menuSobre() {
    /* Tela da versao*/
}
function menuPerfil() {
    /* Tela da do perfil do usuario logado */
}

function openModalMenu(){
     $('#modalMenu').openModal();
    //$('.button-collapse').sideNav('show');
}