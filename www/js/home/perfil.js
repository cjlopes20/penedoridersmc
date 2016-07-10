$(function() {
    
    var idPerfil = JSON.parse(localStorage.getItem("User"));
    var obj = { "id": idPerfil.id };

    if(idPerfil) {

        $.ajax({
            type: "POST",
            url: "http://penedoriders.com.br/php/app-new/usuario/usuarioGET.php",
            data: obj,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (retorno) {

                retorno = $.parseJSON(retorno);

                var dataSource = new kendo.data.DataSource({
                    data:  retorno,
                    sort: { field: "data", dir: "asc" }
                });

                $("#listViewPerfil").kendoListView({
                    dataSource: dataSource,
                    template: kendo.template($("#templatePerfil").html())
                });

            },
            error: function() {},
            contentType: 'application/x-www-form-urlencoded'
        });

    } else {

    }

});/**
 * Created by Cristiano Lopes on 21/06/2016.
 */
