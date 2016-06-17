$(function() {


    moment.locale('pt-BR');
    var idBlog = JSON.parse(sessionStorage.getItem("blog_id"));
    var obj = { "id": idBlog };

    if(idBlog) {

        $.ajax({
            type: "POST",
            url: "http://penedoriders.com.br/php/app/site/blog-single.php",
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
                    sort: {field: "datah", dir: "asc"}
                });

                $("#listViewBlog").kendoListView({
                    dataSource: dataSource,
                    template: kendo.template($("#templateBlog").html())
                });

            },
            error: function() {},
            contentType: 'application/x-www-form-urlencoded',
        });

    } else {
        window.location.href = "novidades.html";
    }

});