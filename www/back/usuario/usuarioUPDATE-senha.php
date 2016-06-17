<?php 
	header("Content-Type: text/html; charset=UTF-8_bin", true);
	header("Access-Control-Allow-Origin: *");
	session_start();
	require_once "conexao_site.php";

	$login = $_POST["login"];
	$nome = $_POST["nome"];
	$descricao = $_POST["descricao"];
	$datanasc = $_POST["datanasc"];
	$img = $_POST["img"];
	$idUsu = $_POST["User"];

	$sql = mysql_query("UPDATE usuario SET usu_login='$login', usu_nome='$nome', usu_descricao='$descricao', usu_datanasc='$datanasc', usu_img='$img' WHERE usu_id='$idUsu'");

	if($sql){
	  echo true;
	} else {
	  echo false;
	}
?>