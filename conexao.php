<?php
$servername = "localhost";
$username = "root";  // Troque para o seu usuário
$password = "Km14101993";      // Troque para a sua senha
$dbname = "cadastro";  // Troque para o nome do seu banco de dados

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
