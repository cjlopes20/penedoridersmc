<?php

    header("Content-Type: text/html; charset=UTF-8", true);
    header("Access-Control-Allow-Origin: *");
    
    session_start();
    require_once "conexao_app.php";

    $login = $_POST['login'];
    $senha = $_POST['senha'];
    $resposta = array();

    $queryLogin = mysql_query("SELECT usu_login FROM usuario WHERE usu_login = '$login' LIMIT 1") or die(mysql_error());
    $checkLogin = mysql_num_rows($queryLogin);

    if ($checkLogin > 0) {
        $resposta = array('resposta' => false, 'msg' => 'Este login ja esta cadastrado');
    } 
    else {
        $login     = $_POST['login'];
        $senha     = $_POST['senha'];
        $nome      = $_POST['nome'];
        $email     = $_POST['email'];
        $imagem     = $_POST['imagem'];
        $dataN     = $_POST['data'];

        if($login == '' || $login == undefined){
            $resposta = array('resposta' => false, 'msg' => 'Por favor, preencher o campo de login');
        }
        else if($senha == '' || $senha == undefined){
            $resposta = array('resposta' => false, 'msg' => 'Por favor, preencher o campo de senha');
        }
        else if($nome == '' || $nome == undefined){
            $resposta = array('resposta' => false, 'msg' => 'Por favor, preencher o campo de nome');
        }
        else if($email == '' || $email == undefined){
            $resposta = array('resposta' => false, 'msg' => 'Por favor, preencher o campo de email');
        }
        else {           
            $cadastrarPessoa = mysql_query("INSERT INTO usuario (usu_login, usu_senha, usu_nome, usu_email, usu_img, usu_datanasc) VALUES ('$login', '$senha', '$nome', '$email', '$imagem', '$dataN')") or die(mysql_error());
            if ($cadastrarPessoa) {
                  $resposta = array('resposta' => true, 'msg' => 'Usuario cadastrado com sucesso');
            } else {
                  $resposta = array('resposta' => false, 'msg' => 'Ocorreu um erro no cadastro');
            }
        }

	$myJSON  = json_encode($resposta);
	echo $myJSON;
  }

?>