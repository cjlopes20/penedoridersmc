<?php 
header("Content-Type: text/html; charset=UTF-8", true);
header("Access-Control-Allow-Origin: *");

session_start();
require_once "conexao_site.php";
$idNoticia = $_POST["id"];
$resultado = mysql_query("SELECT * FROM noticia WHERE not_id = $idNoticia") or die(mysql_error());
$listaMembros = array();
$i = 0;
while ($registro = mysql_fetch_assoc($resultado)) {
    $integrante = new stdClass;
    $integrante->titulo = $registro["not_titulo"];
	$integrante->descricao = $registro["not_descricao"];
    $integrante->texto = $registro["not_texto"];
    $integrante->autor = $registro["not_autor"];
    $integrante->img = $registro["not_img"];
    $integrante->hora = $registro["not_hora"];	
    $integrante->datah = $registro["not_data"];
    $integrante->id = $registro["IdNoticia"];
    $listaMembros[$i] = $integrante;
    $i++;
}

$myJSON  = json_encode($listaMembros);
echo $myJSON;

?>