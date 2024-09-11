document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;

    // Faz o envio do formulário para o PHP
    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    })
    .then(response => response.text())
    .then(result => {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "telaSecundaria.html";
    })
    .catch(error => console.error('Erro:', error));
});

document.getElementById('idade').type = 'text';
