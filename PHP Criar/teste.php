<?php
    header("Content-Type: text/html; charset=UTF-8", true);
    header("Access-Control-Allow-Origin: *");

    session_start();
    require_once "conexao_app.php";

    $login = $_POST['login'];
    $senha = $_POST['senha'];
    $resposta = array();

    $queryLogin = mysql_query("SELECT usu_login FROM usuario WHERE usu_login = '$login'") or die(mysql_error());

    if (mysql_num_rows($queryLogin) > 0) {
        $resposta = array('resposta' => false, 'msg' => 'Este login ja esta cadastrado');
    } else {
        $login     = $_POST['login'];
        $senha     = $_POST['senha'];
        $nome      = $_POST['nome'];
        $email     = $_POST['email'];

        if(empty($login)){
            $resposta = array('resposta' => false, 'msg' => 'Por favor, preencher o campo de login');
        }
        else if(empty($senha)){
            $resposta = array('resposta' => false, 'msg' => 'Por favor, preencher o campo de senha');
        }
        else if(empty($nome)){
            $resposta = array('resposta' => false, 'msg' => 'Por favor, preencher o campo de nome');
        }
        else if(empty($email)){
            $resposta = array('resposta' => false, 'msg' => 'Por favor, preencher o campo de email');
        }
        else {
            $cadastrarPessoa = mysql_query("INSERT INTO usuario (usu_login, usu_senha, usu_nome, usu_email) VALUES ('$login', '$senha', '$nome', '$email')") or die(mysql_error());
            if ($cadastrarPessoa) {
                  $resposta = array('resposta' => true, 'msg' => 'Usuario cadastrado com sucesso');
            } else {
                  $resposta = array('resposta' => false, 'msg' => 'Ocorreu um erro no cadastro');
            }
        }


   }
?>