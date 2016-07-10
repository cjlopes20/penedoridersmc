function acessar(){

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

    var email = jQuery('#username').val();
    var senha = jQuery('#password').val();

    if(!email){
        toastr.warning('Por favor, digite um usuário válido');
    }
    else if(!senha){
        toastr.warning('Por favor, digite uma senha válida');
    }
    else{

        var obj = {
            "login": email,
            "senha": senha
        };
        $.ajax({
            type: "POST",
            url: "http://penedoriders.com.br/php/app/login.php",
            data: obj,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (retorno) {
                retorno = $.parseJSON(retorno);
                if(!retorno.resposta){
                    toastr.error(retorno.msg);
                } else {
                    localStorage.setItem("User", JSON.stringify(retorno.usuario[0]));
                    window.location.href = "home.html";
                }
            },
            error: function() {},
            contentType: 'application/x-www-form-urlencoded'
        });
    }
}

function cadastrarUsuario(){
    localStorage.clear();
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

    var login = document.getElementById('usernameCadastro').value;
    var senha = document.getElementById('passwordCadastro').value;
    var nome  = document.getElementById('nomeCadastro').value;
    var email = document.getElementById('emailCadastro').value;
    var url   = document.getElementById('urlCadastro').value;
    var dataN = document.getElementById('dataNCadastro').value;

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
                retorno = $.parseJSON(retorno);
                if(!retorno.resposta){
                    toastr.error(retorno.msg);
                } else {
                    localStorage.clear();
                    localStorage.setItem("User", JSON.stringify(retorno[0]));                    
                    window.location.href = "home.html";
                }
            },
            error: function() {  },
            contentType: 'application/x-www-form-urlencoded'
        });

    }
}

function showFormAccount() {
    jQuery('#block2-account').css('display', 'block');
    jQuery('#block2-account').addClass('slidein-from-right');
    jQuery('#block1-login').removeClass('slidein-from-left');
    jQuery('#block1-login').css('display', 'none');
}

function showFormLogin() {
    jQuery('#block1-login').css('display', 'block');
    jQuery('#block1-login').addClass('slidein-from-left');
    jQuery('#block2-account').removeClass('slidein-from-right');
    jQuery('#block2-account').css('display', 'none');
}


