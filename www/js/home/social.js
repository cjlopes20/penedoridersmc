$(function() {

    var usuario = JSON.parse(localStorage.getItem("User"));
    var objGetPostagem = {
        "offsetPost": '0',
        "idUser": usuario.id
    };

    $.ajax({
        type: "POST",
        url: "http://penedoriders.com.br/php/app-new/postagem/postagem-load.php",
        data: objGetPostagem,
        xhrFields: {
            withCredentials: false
        },
        headers: {},
        success: function(retorno) {

            retorno = $.parseJSON(retorno);

            for(var i = 0, lenI = retorno.length; i < lenI; i++){
                retorno[i].datahora = dataAtualFormatada(new Date(retorno[i].datahora));
            }

            var dataSource = new kendo.data.DataSource({
                data:  retorno,
                sort: [{ field: "datahora", dir: "desc" }]
            });

            $("#listViewPostagem").kendoListView({
                dataSource: dataSource,
                selectable: true,
                change: function(e){
                    var data = e.sender.dataSource.view();
                    jQuery.map(e.sender.select(), function (item) {
                        var selecionado = data[jQuery(item).index()];
                        localStorage.setItem("pos_id", selecionado.posid);
                        openModalComentario();
                    });
                },
                template: kendo.template($("#templatePostagem").html())
            });
        },
        error: function() { },
        contentType: 'application/x-www-form-urlencoded'
    });

    setInterval(function(){
        buscarPostagens();
    }, 600000);

});

function dataAtualFormatada(data){
    var dia = data.getDate();
    if (dia.toString().length == 1)
        dia = "0"+dia;
    var mes = data.getMonth()+1;
    if (mes.toString().length == 1)
        mes = "0"+mes;
    var ano = data.getFullYear();
    return mes+"-"+dia+"-"+ano;
}

function buscarPostagens(){

    var usuario = JSON.parse(localStorage.getItem("User"));
    var objGetPostagem = {
        "offsetPost": '0',
        "idUser": usuario.id
    };

    $.ajax({
        type: "POST",
        url: "http://penedoriders.com.br/php/app-new/postagem/postagem-load.php",
        data: objGetPostagem,
        xhrFields: {
            withCredentials: false
        },
        headers: {},
        success: function(retorno) {

            retorno = $.parseJSON(retorno);

            for(var i = 0, lenI = retorno.length; i < lenI; i++){
                retorno[i].datahora = dataAtualFormatada(new Date(retorno[i].datahora));
            }

            var dataSource = new kendo.data.DataSource({
                data:  retorno,
                sort: [{ field: "datahora", dir: "desc" }]
            });

            $("#listViewPostagem").kendoListView({
                dataSource: dataSource,
                selectable: true,
                change: function(e){
                    var data = e.sender.dataSource.view();
                    jQuery.map(e.sender.select(), function (item) {
                        var selecionado = data[jQuery(item).index()];
                        localStorage.setItem("posid", selecionado.id);
                        openModalComentario();
                    });
                },
                template: kendo.template($("#templatePostagem").html())
            });

        },
        error: function() { },
        contentType: 'application/x-www-form-urlencoded'
    });
}

function enviarPostagem() {
    var usuario = JSON.parse(localStorage.getItem("User"));
    var postagem = jQuery('#postagemPost').val();
    var date = new Date();
    var objPostagem = {
        "usu_id": usuario.id,
        "usu_login": usuario.login,
        "usu_nome": usuario.nome,
        "usu_img": usuario.img,
        "texto": postagem,
        "datahora": date
    };
    $.ajax({
        type: "POST",
        url: "http://penedoriders.com.br/php/app-new/postagem/postagemPOST.php",
        data: objPostagem,
        xhrFields: {
            withCredentials: false
        },
        headers: {},
        success: function(retorno) {
            $('#postagemPost').val("");
            $('#modalPostagem').closeModal();
            buscarPostagens();
        },
        error: function() { },
        contentType: 'application/x-www-form-urlencoded'
    });
}

function openModalPost() {
    $('#modalPostagem').openModal();
    $('#postagemPost').val("");
    $('#postagemPost').focus();
}

function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),

        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
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
        document.getElementById("postagemPost").value = document.getElementById("postagemPost").value.substr(0,valor);
    }
}

function acessPage(local) {

    //PAGINA
    jQuery('#pageMotoclube').hide();
    jQuery('#pageNovidades').hide();
    jQuery('#pageSocial').hide();
    jQuery('#pageEventos').hide();
    jQuery('#pagePerfil').hide();
    jQuery('#page' + local).show();

    //ITEM MENU
    jQuery('#itemMotoclube').removeClass('item-select');
    jQuery('#itemNovidades').removeClass('item-select');
    jQuery('#itemSocial').removeClass('item-select');
    jQuery('#itemEventos').removeClass('item-select');
    jQuery('#itemPerfil').removeClass('item-select');
    jQuery('#item' + local).addClass('item-select');

    //TOP PAGE
    jQuery('#nameTop').html(local);

    if(local === 'Perfil'){
        
        jQuery('#btn-leftMenu').css('display', 'block');
        
    } else{
        jQuery('#btn-leftMenu').css('display', 'none');
        $('.button-collapse').sideNav('hide');
    }

}