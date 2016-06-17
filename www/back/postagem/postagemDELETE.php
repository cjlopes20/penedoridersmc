<?php 
	header("Content-Type: text/html; charset=UTF-8_bin", true);
	header("Access-Control-Allow-Origin: *");
	session_start();
	require_once "conexao_site.php";

	$idPostagem = $_POST["posid"];

	$sql = mysql_query("DELETE FROM postagem WHERE pos_id = '$idPostagem' ");

	if($sql){
	  echo true;
	} else {
	  echo false;
	}

    
?>