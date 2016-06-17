<?php 
header("Content-Type: text/html; charset=UTF-8_bin", true);

    session_start();
require_once "conexao_site.php";

    $resultado = mysql_query("SELECT * FROM membros") or die(mysql_error());
    $listaMembros = array();
    $i = 0;
    while ($registro = mysql_fetch_array($resultado, MYSQL_ASSOC)) {
        $integrante = new stdClass;
        $integrante->nome = $registro["mem_nome"];
	$integrante->sexo = $registro["mem_sexo"];
	$integrante->img = $registro["mem_img"];
        $integrante->id = $registro["mem_id"];
        $integrante->nivel = $registro["mem_nivel"];
        $integrante->entrada = $registro["mem_entrada"];
        $listaMembros[$i] = $integrante;
        $i++;
    }

    $myJSON  = json_encode($listaMembros);
    echo $myJSON;

?>