<?php
header("Content-Type: text/html; charset=UTF-8", true);
header("Access-Control-Allow-Origin: *");

session_start();
require_once "conexao_site.php";
$idEve = $_POST["id"];
$resultado = mysql_query("SELECT * FROM eventos WHERE eve_id = $idEve") or die(mysql_error());
$listaMembros = array();
$i = 0;
while ($registro = mysql_fetch_assoc($resultado)) {
    $integrante = new stdClass;
    $integrante->titulo = $registro["eve_titulo"];
    $integrante->data = $registro["eve_data"];
    $integrante->hora = $registro["eve_hora"];
    $integrante->descricao = $registro["eve_descricao"];
    $integrante->img = $registro["eve_img"];
    $integrante->id = $registro["$idEve"];
    $listaMembros[$i] = $integrante;
    $i++;
}

$myJSON  = json_encode($listaMembros);
echo $myJSON;

?>