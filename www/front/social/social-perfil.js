$(function() {

    var idPerfil = JSON.parse(sessionStorage.getItem("perfil"));
    var obj = { "id": idPerfil };

    if(idPerfil) {

        $.ajax({
            type: "POST",
            url: "http://penedoriders.com.br/php/app/usuario/usuarioGET.php",
            data: obj,
            xhrFields: {
                withCredentials: false
            },
            headers: {},
            success: function (retorno) {

                retorno = $.parseJSON(retorno);

                function convertData(date){
                    var curr_date = date.getDate();
                    var curr_month = date.getMonth() + 1;
                    var curr_year = date.getFullYear();
                    var data = curr_date + "/" + curr_month + "/" + curr_year;
                    var newDate = data.split('/');
                    if (newDate[0].length < 2) {
                        newDate[0] = "0" + newDate[0];
                    }
                    if (newDate[1].length < 2) {
                        newDate[1] = "0" + newDate[1];
                    }
                    return newDate[0] + "/" + newDate[1] + "/" + newDate[2];
                }

                function convertHora(hora){
                    var newDate = hora.split(':');
                    return newDate[0] + ":" + newDate[1];
                }

                for(var i = 0, lenI = retorno.length; i < lenI; i++){
                    retorno[i].data = convertData(new Date(retorno[i].data));
                    retorno[i].hora = convertHora(retorno[i].hora);
                }

                var dataSource = new kendo.data.DataSource({
                    data:  retorno,
                    sort: { field: "data", dir: "asc" }
                });

                $("#listView").kendoListView({
                    dataSource: dataSource,
                    template: kendo.template($("#template").html())
                });

            },
            error: function() {},
            contentType: 'application/x-www-form-urlencoded'
        });

    } else {
        window.location.href = "social.html";
    }

});