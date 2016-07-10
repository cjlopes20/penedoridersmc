$(function() {

    $.ajax({
        type: "GET",
        url: "http://penedoriders.com.br/php/app/site/membros.php", 
        success: function(retorno) {

            retorno = $.parseJSON(retorno); 

            var dataSource = new kendo.data.DataSource({
                data:  retorno,
                sort: { field: "nome", dir: "asc" }
            });

            $("#listView").kendoListView({
                dataSource: dataSource,
                template: kendo.template($("#template").html())
            });

        }, 
        error: function(){}
    });

});
