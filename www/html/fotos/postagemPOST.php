<?php 
	header("Content-Type: text/html; charset=UTF-8_bin", true);
	header("Access-Control-Allow-Origin: *");

	session_start();
	require_once "conexao_site.php";

	$usuid = $_POST["usuario_id"];
	$usunome = $_POST["usuario_nome"];
	$usulogin = $_POST["usuario_login"];
	$datahora = $_POST["datahora"];
	$postagem = $_POST["comentario"];
	
	$sql = mysql_query("INSERT INTO postagem (pos_datahora, pos_texto, usu_id, usu_login,  usu_nome) VALUES ('$datahora', '$postagem', '$usuid', '$usulogin', '$usunome')");

	if($sql){
	  echo true;
	} else {
	  echo false;
	}    
?>