<?php
header("Content-Type: text/html; charset=UTF-8", true);
header("Access-Control-Allow-Origin: *");

session_start();
require_once "conexao_site.php";

$idUsuario = $_POST["id"];
$resultado = mysql_query("SELECT * FROM usuario WHERE usu_id = '$idUsuario'") or die(mysql_error());

$listaUsuario = array();
$i = 0;
while ($registro = mysql_fetch_assoc($resultado)) {
        $usuario = new stdClass;
		$usuario->nome = $registro["usu_nome"];
        $usuario->email = $registro["usu_email"];
		$usuario->descricao = $registro["usu_descricao"];
		$usuario->datanasc = $registro["usu_datanasc"];
		$usuario->img = $registro["usu_img"];
        $listaUsuario[$i] = $usuario;
        $i++;
}
    $myJSON  = json_encode($listaUsuario);
    echo $myJSON;
?>