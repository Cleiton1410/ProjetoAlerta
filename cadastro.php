<?php
session_start(); // Inicia a sessão para armazenar o login do usuário

include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $login = $_POST['login'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $idade = $_POST['idade'];
    $curso = $_POST['curso'];

    // Prepara a query
    $sql = "INSERT INTO usuarios (login, email, senha, idade, curso) VALUES ('$login', '$email', '$senha', '$idade', '$curso')";
    
    if ($conn->query($sql) === TRUE) {
        // Salva o login do usuário na sessão
        $_SESSION['login'] = $login;
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
