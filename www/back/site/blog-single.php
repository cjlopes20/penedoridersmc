<?php
header("Content-Type: text/html; charset=UTF-8", true);
header("Access-Control-Allow-Origin: *");

session_start();
require_once "conexao_site.php";
$idBlog = $_POST["id"];
$resultado = mysql_query("SELECT * FROM blog WHERE blo_id = $idBlog") or die(mysql_error());
$listaMembros = array();
$i = 0;
while ($registro = mysql_fetch_assoc($resultado)) {
    $integrante = new stdClass;
    $integrante->titulo = $registro["blo_titulo"];
    $integrante->descricao = $registro["blo_descricao"];
    $integrante->texto = $registro["blo_texto"];
    $integrante->autor = $registro["blo_autor"];
    $integrante->img = $registro["blo_img"];
    $integrante->hora = $registro["blo_hora"];
    $integrante->datah = $registro["blo_data"];
    $integrante->id = $registro["idBlog"];
    $listaMembros[$i] = $integrante;
    $i++;
}

$myJSON  = json_encode($listaMembros);
echo $myJSON;

?>