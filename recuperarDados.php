<?php
session_start(); // Inicia a sessão para pegar o ID do usuário

include 'conexao.php';

// Supondo que o login do usuário foi salvo na sessão após o cadastro
$login = $_SESSION['login'];

// Prepara a query para buscar os dados do usuário
$sql = "SELECT login, email, idade, curso FROM usuarios WHERE login = '$login'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Se o usuário foi encontrado, retorna os dados em formato JSON
    $user = $result->fetch_assoc();
    echo json_encode($user);
} else {
    // Se não encontrou o usuário
    echo json_encode([
        "error" => "Usuário não encontrado."
    ]);
}

$conn->close();
?>
