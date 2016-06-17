<?php

	header("Content-Type: text/html; charset=UTF-8_bin", true);
	header("Access-Control-Allow-Origin: *");

	session_start();
	require_once "conexao_site.php";

	$texto = $_POST["texto"];
	$datahora = $_POST["datahora"];
	$usu_id = $_POST["usu_id"];
	$usu_login = $_POST["usu_login"];
	$usu_nome = $_POST["usu_nome"];
	$usu_img = $_POST["usu_img"];

	
	$sql = mysql_query("INSERT INTO postagem (pos_texto, usu_img, pos_datahora, usu_id, usu_login, usu_nome) VALUES ('$texto', '$usu_img','$datahora', '$usu_id', '$usu_login', '$usu_nome')");

	if($sql){
	  echo true;
	} else {
	  echo false;
	}

?>