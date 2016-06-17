<?php
header("Content-Type: text/html; charset=UTF-8", true);
header("Access-Control-Allow-Origin: *");

session_start();
require_once "conexao_site.php";

$idPostagem = $_POST["id"];

$resultado = mysql_query("SELECT * FROM comentario WHERE pos_id = '$idPostagem'") or die(mysql_error());

 $listaComentario = array();
 $i = 0;
     while ($registro = mysql_fetch_array($resultado, MYSQL_ASSOC)) {
            $integrante = new stdClass;
            $integrante->comid = $registro["com_id"];
    		$integrante->comentario = $registro["com_texto"];
    		$integrante->datahora = $registro["com_datahora"];
    		$integrante->usuid = $registro["usu_id"];
    		$integrante->usulogin = $registro["usu_login"];
    		$integrante->usunome = $registro["usu_nome"];
            $integrante->posid = $registro["pos_id"];
            $listaComentario[$i] = $integrante;
            $i++;
    }
    $myJSON  = json_encode($listaComentario);
    echo $myJSON;

?>