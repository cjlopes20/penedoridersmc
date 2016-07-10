// var vieModelNovidades = function(){
//     Noticia = {
//         img: '',
//         autor: '',
//         data: '',
//         titulo: '',
//         texto: ''
//     }
// }

$(function() {

    moment.locale('pt-BR');

    $.ajax({
        type: "GET",
        url: "http://penedoriders.com.br/php/app/site/noticias.php",
        contentType: 'text/plain; charset=utf-8',
        xhrFields: {
            withCredentials: false
        },
        headers: {},
        success: function(retorno) {

            retorno = $.parseJSON(retorno);

            if(retorno[0].datah){
                retorno[0].datah = new Date(retorno[0].datah);
            } else {
                retorno[0].datah = "--:--";
            }

            var dataSource = new kendo.data.DataSource({
                data:  retorno,
                sort: [{ field: "datah", dir: "asc" },{ field: "hora", dir: "asc" }]
            });

            $("#listViewNoticia").kendoListView({
                dataSource: dataSource,
                selectable: true,
                change: function(e){
                    var data = e.sender.dataSource.view();
                    jQuery.map(e.sender.select(), function (item) {
                        var selecionado = data[jQuery(item).index()];
                        localStorage.setItem("not_id", selecionado.id);
                        window.location.href = "novidades-noticias.html";
                    });
                },
                template: kendo.template($("#templateNoticia").html())
            });

        },
        error: function() {}
    });

    $.ajax({
        type: "GET",
        url: "http://penedoriders.com.br/php/app/site/blog.php",
        contentType: 'text/plain; charset=utf-8',
        xhrFields: {
            withCredentials: false
        },
        headers: {},
        success: function(retorno) {

            retorno = $.parseJSON(retorno);

            var dataSource = new kendo.data.DataSource({
                data:  retorno, hora: retorno,
                sort: [{ field: "data", dir: "asc" },{ field: "hora", dir: "asc" }]
            });

            $("#listViewBlog").kendoListView({
                dataSource: dataSource,
                selectable: true,
                change: function(e){
                    var data = e.sender.dataSource.view();
                    jQuery.map(e.sender.select(), function (item) {
                        var selecionado = data[jQuery(item).index()];
                        localStorage.setItem("blog_id", selecionado.id);
                        window.location.href = "novidades-blog.html";
                    });
                },
                template: kendo.template($("#templateBlog").html())
            });

        },
        error: function() {}
    });

});