<?php

    header("Content-Type: text/html; charset=UTF-8", true);
    header("Access-Control-Allow-Origin: *");

    session_start();
    require_once "conexao_site.php";

    $resultado = mysql_query("SELECT * FROM postagem ORDER BY 'pos_datahora'") or die(mysql_error());
    $listaPostagem = array();
    $i = 0;
	while ($registro = mysql_fetch_array($resultado, MYSQL_ASSOC)) {
		$integrante = new stdClass;
		$integrante->usuid = $registro["usu_id"];
		$integrante->comentario = $registro["pos_comentario"];
		$integrante->datahora = $registro["pos_datahora"];
		$integrante->posid = $registro["pos_id"];
		$listaPostagem[$i] = $integrante;
		$i++;
	}

	$myJSON  = json_encode($listaPostagem);
	echo $myJSON;

?>