<?php

	header("Content-Type: text/html; charset=UTF-8_bin", true);
    header("Access-Control-Allow-Origin: *");

	session_start();
	require_once "conexao_site.php";

	$contador = $_POST["offsetPost"];
	$idUsuario = $_POST["idUser"];

    $resultado = mysql_query("SELECT * FROM postagem") or die(mysql_error());

    $listaPostagem = array();
    $i = 0;
     while ($registro = mysql_fetch_array($resultado, MYSQL_ASSOC)) {
            $integrante = new stdClass;
            $integrante->posid = $registro["pos_id"];
    		$integrante->usuid = $registro["usu_id"];
    		$integrante->usulogin = $registro["usu_login"];
    		$integrante->usunome = $registro["usu_nome"];
        	$integrante->usuimg = $registro["usu_img"];
    		$integrante->postagem = $registro["pos_texto"];
    		$integrante->datahora = $registro["pos_datahora"];
            $listaPostagem[$i] = $integrante;
            $i++;
    }
    $myJSON  = json_encode($listaPostagem);
    echo $myJSON;
?>