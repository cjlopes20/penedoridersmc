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
    }
    var email = jQuery('#username').val();
    var senha = jQuery('#password').val();
    var check = jQuery('#remember').val();
    if(!email){
        toastr.warning('Por favor, digite um usuário válido');
    }
    else if(!senha){
        toastr.warning('Por favor, digite uma senha válida');
    }
    else{
        var obj = {
            "login": email,
            "senha": senha,
            "lembrar": check
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
                    window.location.href = "novidades.html";
                }
            },
            error: function() {
            },
            contentType: 'application/x-www-form-urlencoded',
        });
    }
}

function cadastrarUsuario(){
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
    }
    var login = jQuery('#username').val();
    var senha = jQuery('#password').val();
    var nome = jQuery('#nome').val();
    var email = jQuery('#email').val();
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
            "email": email
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
                console.log(retorno);
                if(!retorno.resposta){
                    toastr.error(retorno.msg);
                } else {
                    window.location.href = "novidades.html";
                }
            },
            error: function() {
            },
            contentType: 'application/x-www-form-urlencoded',
        });
    }
}

$(document).ready(function() {
    $('ul.tabs').tabs();
});