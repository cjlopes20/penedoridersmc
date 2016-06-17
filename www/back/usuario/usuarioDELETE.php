<?php 
	header("Content-Type: text/html; charset=UTF-8_bin", true);
	header("Access-Control-Allow-Origin: *");
	session_start();
	require_once "conexao_site.php";

	$idUsuario = $_POST["User"];

	$sql = mysql_query("DELETE FROM usuario WHERE usu_id = '$idUsuario' ");

	if($sql){
	  echo true;
	} else {
	  echo false;
	}

    
?>