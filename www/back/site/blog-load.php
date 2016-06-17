<?php 
header("Content-Type: text/html; charset=UTF-8_bin", true);
header("Access-Control-Allow-Origin: *");

    session_start();
	require_once "conexao_site.php";
	$contador = $_POST["contador"];
    $resultado = mysql_query("SELECT * FROM 'blog' ORDER BY 'blo_data' DESC LIMIT 5 OFFSET $contador") or die(mysql_error());
    $listaMembros = array();
    $i = 0;
    while ($registro = mysql_fetch_array($resultado, MYSQL_ASSOC)) {
        $integrante = new stdClass;
        $integrante->titulo = $registro["blo_titulo"];
		$integrante->descricao = $registro["blo_descricao"];
        $integrante->texto = $registro["blo_texto"];
        $integrante->autor = $registro["blo_autor"];
        $integrante->img = $registro["blo_img"];
        $integrante->hora = $registro["blo_hora"];
        $integrante->data = $registro["blo_data"];
        $integrante->id = $registro["blo_id"];
        $listaMembros[$i] = $integrante;
        $i++;
    }

    $myJSON  = json_encode($listaMembros);
    echo $myJSON;

?>