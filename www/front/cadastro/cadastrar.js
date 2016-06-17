function cadastrarUsuario(){
    sessionStorage.clear();
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    var login = document.getElementById('username').value;
    var senha = document.getElementById('password').value;
    var nome  = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var url   = document.getElementById('url').value;
    var dataN = document.getElementById('dataN').value;

    if(!login){
        toastr.warning('Por favor, digite um usuário válido');
    }
    else if(!senha){
        toastr.warning('Por favor, digite uma senha válida');
    }
    else if(!nome){
        toastr.warning('Por favor, digite um nome válido');
    }
    else if(!email){
        toastr.warning('Por favor, digite um email válido');
    }
    else{
        var obj = {
            "login": login,
            "senha": senha,
            "nome": nome,
            "email": email,
            "imagem": url,
            "data": dataN
        };
        $.ajax({
            type: "POST",
            url: "http://penedoriders.com.br/php/app/cadastrar.php",
            data: obj,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (retorno) {
                console.log(retorno);
                if(!retorno.resposta){
                    toastr.error(retorno.msg);
                } else {
                    // retorno = $.parseJSON(retorno);
                    // console.log(retorno);
                    // sessionStorage.setItem("User", JSON.stringify(retorno[0]));
                    // window.location.href = "../social/social.html";
                    //IR PARA LOGIN
                }
            },
            error: function() { console.log(retorno); },
            contentType: 'application/x-www-form-urlencoded'
        });

    }
}