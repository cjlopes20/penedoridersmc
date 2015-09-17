<?php
    session_start();
    require_once "conexao.php";

    if(isset($SESION['userLog'])){
        header ("Location: painel.php");
    }

    if(isset($_COOKIE['lembrar'])){
        $lembrar = 'checked';
        $login = base64_decode($_COOKIE['lembrar-login']);
        $senha = base64_decode($_COOKIE['lembrar-senha']);
    } else {
        $lembrar = null;
        $login = null;
        $senha = null;
    }

?>
<!DOCTYPE HTML>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Fazer Login</title>
</head>

<body>
	
	<h1>Fazer Login</h1>
	
	<hr size="1" color="#dfdfdf">

    <?php
        if(isset($_POST['logar'])){

            $login = mysql_real_escape_string(strip_tags(trim($_POST['login'])));
            $senha = mysql_real_escape_string(strip_tags(trim($_POST['senha'])));
            $lembrar = (isset($_POST['lembrar'])) ? true : false;

            if(empty($login)){
                echo 'Por favor, preencher o campo de login';
            }
            else if(empty($senha)){
                echo 'Por favor, preencher o campo de senha';
            }
            else {

                //VERIFICA LOGIN
                $query = mysql_query("SELECT ace_login FROM acesso WHERE ace_login = '$login' LIMIT 1") or die(mysql_error());
                $checkLogin = mysql_num_rows($query);

                //VERIFICA SENHA
                $query = mysql_query("SELECT * FROM acesso WHERE ace_login = '$login' AND ace_senha = '".md5($senha)."' LIMIT 1") or die(mysql_error());
                $checkPass = mysql_num_rows($query);

                if($checkLogin <= 0){
                    echo 'Este usuário não existe!';
                }
                else if($checkPass <= 0){
                    echo 'Senha incorreta!';
                }
                else {

                    $infoUser = mysql_fetch_assoc($query);

                    $_SESSION['userLog'] = true;
                    $_SESSION['userInfo'] = array(
                        'login' => base64_encode($infoUser['ace_login']),
                        'senha' => base64_encode($infoUser['ace_senha'])
                    );

                    if($lembrar){
                        setcookie('lembrar', true, time() + 3600 * 24 * 30, '/');
                        setcookie('lembrar-login', base64_encode($login), time() + 3600 * 24 * 30, '/');
                        setcookie('lembrar-senha', base64_encode($senha), time() + 3600 * 24 * 30, '/');
                    }else{
                        setcookie('lembrar', '', time() - 3600 * 24 * 30, '/');
                        setcookie('lembrar-login', '', time() - 3600 * 24 * 30, '/');
                        setcookie('lembrar-senha', '', time() - 3600 * 24 * 30, '/');
                    }

                    if(isset($_SESSION['userLog'])){
                        header("Location: painel.php");
                    } else {
                        echo 'Desculpe, ocorreu um erro';
                    }

                }

            }
        }
    ?>

	<form action="" method="post">
		
		<label>Login</label><br>
		<input type="text" name="login" maxlength="50" placeholder="Seu nome de usuário" value="<?php echo $login ?>"><br>

		<label>Senha</label><br>
		<input type="password" name="senha" maxlength="50" placeholder="Sua senha de usuário" value="<?php echo $senha ?>"><br>

        <input type="checkbox" name="lembrar" <?php echo $lembrar ?>> Lembrar-me

        <input type="submit" name="logar" value="Fazer login">
		
	</form>

</body>
</html>