<?php 
header("Content-Type: text/html; charset=UTF-8_bin", true);
header("Access-Control-Allow-Origin: *");
$conexao = mysql_connect('cpmy0013.servidorwebfacil.com', 'penedori_site', 'comunicacoes08') or die (mysql_error());
mysql_select_db('penedori_site') or die (mysql_error());
mysql_set_charset('UTF8', $conexao);