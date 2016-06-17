<?php
header("Content-Type: text/html; charset=UTF-8", true);
header("Access-Control-Allow-Origin: *");

session_start();
require_once "conexao_site.php";

	$texto = $_POST["texto"];
	$datahora = $_POST["datahora"];
	$usu_id = $_POST["usu_id"];
	$usu_login = $_POST["usu_login"];
	$usu_nome = $_POST["usu_nome"];
	$pos_id = $_POST["posid"];


	$sql = mysql_query("INSERT INTO comentario (com_texto, com_data, usu_id, usu_login, usu_nome, pos_id) VALUES ('$texto', '$datahora', '$usu_id', '$usu_login', '$usu_nome', '$pos_id')");

	if($sql){
	  echo true;
	} else {
	  echo false;
	}

?>