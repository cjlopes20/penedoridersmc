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
                console.log(retorno);
                retorno = $.parseJSON(retorno);
                if(!retorno.resposta){
                    toastr.error(retorno.msg);
                } else {
                    sessionStorage.setItem("User", JSON.stringify(retorno.usuario[0]));
                    window.location.href = "www/front/social/social.html";
                }
            },
            error: function() {},
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

