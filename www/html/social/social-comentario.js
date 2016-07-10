$(function() {

    moment.locale('pt-BR');
    var idPostagem = JSON.parse(localStorage.getItem("pos_id"));
    var obj = { "id": idPostagem };

    if(idPostagem) {
        $.ajax({
            type: "POST",
            url: "http://penedoriders.com.br/php/app-new/postagem/postagemGET.php",
            data: obj,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (retorno) {

                retorno = $.parseJSON(retorno);

                var dataSource = new kendo.data.DataSource({
                    data:  retorno,
                    sort: { field: "datahora", dir: "asc" }
                });

                $("#listViewPostagemCom").kendoListView({
                    dataSource: dataSource,
                    template: kendo.template($("#templatePostagemCom").html())
                });
            },
            error: function() {},
            contentType: 'application/x-www-form-urlencoded'
        });

        $.ajax({
            type: "POST",
            url: "http://penedoriders.com.br/php/app-new/comentario/comentarioGET.php",
            data: obj,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (retorno) {

                retorno = $.parseJSON(retorno);

                var dataSource = new kendo.data.DataSource({
                    data:  retorno,
                    sort: { field: "datahora", dir: "asc" }
                });

                $("#listViewComentario").kendoListView({
                    dataSource: dataSource,
                    template: kendo.template($("#templateComentario").html())
                });
            },
            error: function() {},
            contentType: 'application/x-www-form-urlencoded'
        });

    } else {
        window.location.href = "social.html";
    }

});

function buscarComentarios(){
    var idPostagem = JSON.parse(localStorage.getItem("pos_id"));
    var obj = { "id": idPostagem };

    $.ajax({
        type: "POST",
        url: "http://penedoriders.com.br/php/app-new/comentario/comentarioGET.php",
        data: obj,
        xhrFields: {
            withCredentials: false
        },
        headers: {},
        success: function (retorno) {

            retorno = $.parseJSON(retorno);

            var dataSource = new kendo.data.DataSource({
                data:  retorno,
                sort: { field: "datahora", dir: "asc" }
            });

            $("#listViewComentario").kendoListView({
                dataSource: dataSource,
                template: kendo.template($("#templateComentario").html())
            });
        },
        error: function() {},
        contentType: 'application/x-www-form-urlencoded'
    });
}

function enviarComentario() {
    var usuario = JSON.parse(localStorage.getItem("User"));
    var idPostagem = JSON.parse(localStorage.getItem("pos_id"));
    var objPostagem = { "posid": idPostagem };
    var comentario = jQuery('#comentarioPost').val();
    var date = new Date();
    var objComentario = {
        "usu_id": usuario.id,
        "usu_login": usuario.login,
        "usu_nome": usuario.nome,
        "texto": comentario,
        "datahora": date,
        "posid": objPostagem.posid
    };
    $.ajax({
        type: "POST",
        url: "http://penedoriders.com.br/php/app-new/comentario/comentarioPOST.php",
        data: objComentario,
        xhrFields: {
            withCredentials: false
        },
        headers: {},
        success: function(retorno) {
            $('#comentarioPost').val("");
            $('#modalComentario').closeModal();
            buscarComentarios();
        },
        error: function() { },
        contentType: 'application/x-www-form-urlencoded'
    });
}

function openModalPost() {
    $('#modalComentario').openModal();
    $('#comentarioPost').val("");
}
function mostrarResultado(box,num_max,campospan){
    var contagem_carac = box.length;
    if (contagem_carac != 0){
        document.getElementById(campospan).innerHTML = contagem_carac + " caracteres digitados";
        if (contagem_carac == 1){
            document.getElementById(campospan).innerHTML = contagem_carac + " caracter digitado";
        }
        if (contagem_carac >= num_max){
            document.getElementById(campospan).innerHTML = "Limite de caracteres excedido!";
        }
    }else{
        document.getElementById(campospan).innerHTML = "Ainda não temos nada digitado..";
    }
}

function contarCaracteres(box,valor,campospan){
    var conta = valor - box.length;
    document.getElementById(campospan).innerHTML = "Você ainda pode digitar " + conta + " caracteres";
    if(box.length >= valor){
        document.getElementById(campospan).innerHTML = "Opss.. você não pode mais digitar..";
        document.getElementById("campo").value = document.getElementById("campo").value.substr(0,valor);
    }
}
