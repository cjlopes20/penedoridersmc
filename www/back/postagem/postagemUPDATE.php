<?php 
	header("Content-Type: text/html; charset=UTF-8_bin", true);
	header("Access-Control-Allow-Origin: *");
	session_start();
	require_once "conexao_site.php";

	$comentario = $_POST["comentario"];
	$datahora = $_POST["datahora"];
	$id = $_POST["posid"];

	$sql = mysql_query("UPDATE postagem SET pos_comentario='$comentario', pos_datahora='$datahora' WHERE pos_id='$id'");

	if($sql){
	  echo true;
	} else {
	  echo false;
	}
?>