<?php
session_start();
require_once "conexao.php";
?>
<!DOCTYPE HTML>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cadastro</title>
</head>

<body>

<h1>Cadastrar-se</h1>
<a href="painel.php" title="Voltar">Voltar ao Painel</a>
<hr size="1" color="#dfdfdf">

<?php

function validaCPF($cpf = null) {

    // Verifica se um número foi informado
    if(empty($cpf)) {
        return false;
    }

    // Elimina possivel mascara
    $cpf = ereg_replace('[^0-9]', '', $cpf);
    $cpf = str_pad($cpf, 11, '0', STR_PAD_LEFT);

    // Verifica se o numero de digitos informados é igual a 11
    if (strlen($cpf) != 11) {
        return false;
    }
    // Verifica se nenhuma das sequências invalidas abaixo
    // foi digitada. Caso afirmativo, retorna falso
    else if ($cpf == '00000000000' ||
        $cpf == '11111111111' ||
        $cpf == '22222222222' ||
        $cpf == '33333333333' ||
        $cpf == '44444444444' ||
        $cpf == '55555555555' ||
        $cpf == '66666666666' ||
        $cpf == '77777777777' ||
        $cpf == '88888888888' ||
        $cpf == '99999999999') {
        return false;
        // Calcula os digitos verificadores para verificar se o
        // CPF é válido
    } else {

        for ($t = 9; $t < 11; $t++) {

            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf{$c} * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf{$c} != $d) {
                return false;
            }
        }

        return true;
    }
}

function validaEmail($email) {
    $conta = "^[a-zA-Z0-9\._-]+@";
    $domino = "[a-zA-Z0-9\._-]+.";
    $extensao = "([a-zA-Z]{2,4})$";

    $pattern = $conta.$domino.$extensao;

    if (ereg($pattern, $email))
        return true;
    else
        return false;
}

if(isset($_POST['confirmar'])){
    $login = mysql_real_escape_string(strip_tags(trim($_POST['login'])));
    $queryLogin = mysql_query("SELECT ace_login FROM acesso WHERE ace_login = '$login'") or die(mysql_error());

    if(empty($login)){
        echo 'Este login é inválido';
    } else {
        if (mysql_num_rows($queryLogin) > 0) {
            echo 'Este login já está cadastrado!';
        } else {
            echo 'Este login está disponivel!';
        }
    }

}

if(isset($_POST['cadastrar'])){
    $nome = mysql_real_escape_string(strip_tags(trim($_POST['nome'])));
    $data = mysql_real_escape_string(strip_tags(trim($_POST['data'])));
    $email = mysql_real_escape_string(strip_tags(trim($_POST['email'])));
    $cpf = mysql_real_escape_string(strip_tags(trim($_POST['cpf'])));
    $login = mysql_real_escape_string(strip_tags(trim($_POST['login'])));
    $senha = mysql_real_escape_string(strip_tags(trim($_POST['senha'])));
    $confSenha = mysql_real_escape_string(strip_tags(trim($_POST['confirmar-senha'])));
    $permissao = mysql_real_escape_string(strip_tags(trim($_POST['permissao'])));

    if(empty($nome) && empty($data) && empty($email) && empty($login) && empty($senha) && empty($confSenha)){
        echo 'Preencha todos os campos';
    }
    else if(empty($nome)){
        echo 'Preencher o campo nome';
    }
    else if(empty($data)){
        echo 'Preencher o campo de data';
    }
    else if(empty($email)){
        echo 'Preencher o campo de email';
    }
    else if(empty($login)){
        echo 'Preencher o campo de login';
    }
    else if(empty($senha)){
        echo 'Preencher o campo de senha';
    }
    else if(empty($confSenha)){
        echo 'Preencher o campo de confirmação de senha';
    }
    else if($senha != $confSenha){
        echo 'O campo de confirmação de senha não está igual a senha';
    }
    else if(!validaCPF($cpf)){
        echo 'O CPF é inválido';
    }
    else if (!validaEmail($email)){
        echo "O email é inválido!";
    }
    else {

        $queryPessoa = mysql_query("SELECT pes_cpf FROM pessoa WHERE pes_cpf = '$cpf'") or die(mysql_error());

        if(mysql_num_rows($queryPessoa) > 0){
            echo 'Este CPF já está cadastrado!';
        } else {

            $queryLogin = mysql_query("SELECT ace_login FROM acesso WHERE ace_login = '$login'") or die(mysql_error());

            if(mysql_num_rows($queryLogin) > 0){
                echo 'Este login já está cadastrado!';
            } else {

                $DFm = explode("/", $data);
                $dataSQL = $DFm[2] . '-' . $DFm[1] . '-' . $DFm[0];

                $cadastrarPessoa = mysql_query("INSERT INTO pessoa (pes_nome, pes_datanasc, pes_email, pes_cpf) VALUES ('$nome', '$dataSQL', '$email', '$cpf')") or die(mysql_error());
                if ($cadastrarPessoa) {

                    $buscarPessoa = mysql_query("SELECT * FROM pessoa WHERE pes_cpf = '$cpf'") or die(mysql_error());
                    $pessoa = mysql_fetch_assoc($buscarPessoa);
                    $idPessoa = $pessoa['pes_id'];


                    $cadastrar = mysql_query("INSERT INTO acesso (ace_login, ace_senha, ace_nivel, pes_id) VALUES ('$login', '" . md5($senha) . "', '$permissao','$idPessoa')") or die(mysql_error());
                    if ($cadastrar) {
                        echo 'Usuário cadastrado com sucesso!';
                    } else {
                        echo 'Erro ao cadastrar usuário';
                    }
                } else {
                    echo 'Erro ao cadastrar usuário';
                }
            }
        }
    }
}

?>

<form action="" method="post">

    <label>Nome</label><br>
    <input type="text" name="nome" maxlength="50" placeholder="Seu nome"><br><br>

    <label>Data de Nascimento</label><br>
    <input type="text" name="data" maxlength="10" placeholder="Sua data de nascimento"><br><br>

    <label>E-mail</label><br>
    <input type="email" name="email" placeholder="Seu email"><br><br>

    <label>CPF</label><br>
    <input type="text" name="cpf" placeholder="Seu cpf"><br><br>

    <label>Login</label><br>
    <input type="text" name="login" maxlength="50" placeholder="Seu nome de usuário" style="float: left">
    <input type="submit" name="confirmar" value="Verificar login"><br><br>

    <label>Senha</label><br>
    <input type="password" name="senha" maxlength="50" placeholder="Sua senha de usuário"><br><br>

    <label>Confirmar Senha</label><br>
    <input type="password" name="confirmar-senha" maxlength="50" placeholder="Confirme sua senha"><br><br>

    <label>Permissão</label><br>
    <select name="permissao">
        <option value="1">Administrador</option>
        <option value="2">Usuário</option>
    </select>
    <br>
    <br>

    <input type="submit" name="cadastrar" value="Criar conta">

</form>

</body>
</html>