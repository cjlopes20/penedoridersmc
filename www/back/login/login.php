<?php
    header("Content-Type: text/html; charset=UTF-8", true);
    header("Access-Control-Allow-Origin: *");

    session_start();
    require_once "conexao_app.php";

    $username = $_POST['login'];
    $password = $_POST['senha'];
    $resposta = null;

    if(empty($username)){
        $resposta = array("resposta" =>  false, "msg" => "Por favor, preencher o campo de login");
    }
    else if(empty($password)){
        $resposta = array("resposta" =>  false, "msg" => "Por favor, preencher o campo de senha");
    }
    else {

        //VERIFICA LOGIN
        $query = mysql_query("SELECT usu_login FROM usuario WHERE usu_login = '$username' LIMIT 1") or die(mysql_error());
        $checkLogin = mysql_num_rows($query);

        if($checkLogin <= 0){
            $resposta = array("resposta" => false, "msg" => "Login invalido");
        }
        else {

             //VERIFICA SENHA
             $query = mysql_query("SELECT * FROM usuario WHERE usu_login = '$username' AND usu_senha = '$password' LIMIT 1") or die(mysql_error());
             $checkPass = mysql_num_rows($query);

             if($checkPass <= 0){
                $resposta = array("resposta" =>  false, "msg" => "Senha invalida");
             }
             else {
                $resultado = mysql_query("SELECT * FROM usuario WHERE usu_login = '$username' AND usu_senha = '$password' LIMIT 1") or die(mysql_error());
                $lista = array();
                $i = 0;
                while ($registro = mysql_fetch_assoc($resultado)) {
                    $usuario = new stdClass;
                    $usuario->login = $registro["usu_login"];
                    $usuario->nome = $registro["usu_nome"];
                    $usuario->email = $registro["usu_email"];
                    $usuario->descricao = $registro["usu_descricao"];
                    $usuario->datanasc = $registro["usu_datanasc"];
                    $usuario->img = $registro["usu_img"];
                    $usuario->id = $registro["usu_id"];
                    $lista[$i] = $usuario;
                    $i++;
                }
                $resposta = array("resposta" => true, "msg" => "", "usuario" => $lista);
             }
        }
    }

    $myJSON  = json_encode($resposta);
    echo $myJSON;

?>