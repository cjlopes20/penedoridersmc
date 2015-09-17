<?php
    session_start();
    require_once "conexao.php";

    if(isset($_SESSION['userLog'])){
        header("Location: painel.php");
    } else {
        header("Location: login.php");
    }

