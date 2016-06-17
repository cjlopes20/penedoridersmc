$(function() {

    $('ul.tabs').tabs();
    
    $.ajax({
        type: "GET",
        url: "http://penedoriders.com.br/php/app/site/eventos.php",
        contentType: 'text/plain; charset=utf-8',
        xhrFields: {
            withCredentials: false
        },
        headers: {},
        success: function(retorno) {

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

            $("#listViewEvento").kendoListView({
                dataSource: dataSource,
                selectable: true,
                change: function(e){
                    var data = e.sender.dataSource.view();
                    jQuery.map(e.sender.select(), function (item) {
                        var selecionado = data[jQuery(item).index()];
                        sessionStorage.setItem("eve_id", selecionado.id);
                        window.location.href = "evento-single.html";
                    });
                },
                template: kendo.template($("#templateEvento").html())
            });

        },
        error: function() {
            window.location.href = '../../../index.html';
        }
    });

});