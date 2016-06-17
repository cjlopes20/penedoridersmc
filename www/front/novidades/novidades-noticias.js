$(function() {

    moment.locale('pt-BR');
    var idNoticias = JSON.parse(sessionStorage.getItem("not_id"));
    var obj = { "id": idNoticias };

    if(idNoticias) {

        $.ajax({
            type: "POST",
            url: "http://penedoriders.com.br/php/app/site/noticias-single.php",
            data: obj,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (retorno) {

                retorno = $.parseJSON(retorno);

                if(retorno[0].datah){
                    retorno[0].datah = new Date(retorno[0].datah);
                } else {
                    retorno[0].datah = "--:--";
                }

                var dataSource = new kendo.data.DataSource({
                    data: retorno,
                    sort: [{field: "datah", dir: "asc"},{field: "hora", dir: "asc"}]
                });

                $("#listViewNoticia").kendoListView({
                    dataSource: dataSource,
                    template: kendo.template($("#templateNoticia").html())
                });

            },
            error: function() {},
            contentType: 'application/x-www-form-urlencoded',
        });

    } else {
        window.location.href = "../noticia.html";
    }

});