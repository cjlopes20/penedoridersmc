<?php
    session_start();
    require_once "conexao.php";

    if(!isset($_SESSION['userLog'])){
        header("Location: login.php");
        die();
    }

    $login = base64_decode($_SESSION['userInfo']['login']);
    $senha = base64_decode($_SESSION['userInfo']['senha']);

    $query = mysql_query("SELECT * FROM acesso WHERE ace_login = '$login' AND  ace_senha = '$senha' LIMIT 1") or die(mysql_error());

    if(mysql_num_rows($query) <= 0){
        unset($_SESSION['userLog'], $_SESSION['userInfo']);
        session_destroy();
        header("Location: login.php");
        die();
    }

    $infoUser = mysql_fetch_assoc($query);

    if(isset($_GET['acao']) && $_GET['acao'] == 'sair'){
        unset($_SESSION['userLog'], $_SESSION['userInfo']);
        session_destroy();
        header("Location: login.php");
        die();
    }
?>
<!DOCTYPE HTML>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Seja bem vindo, <?php echo $infoUser['ace_login']; ?></title>
</head>

<body>

	<h1>Seja bem vindo, <?php echo $infoUser['ace_login']; ?> | <a href="?acao=sair" title="Sair">Sair</a></h1>

    <a href="cadastro.php" title="Criar uma conta">Criar uma conta</a>
    <br>
    <br>

    <a href="php/membros/membros.php" title="Membros">Membros</a>

</body>
</html>