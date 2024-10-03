document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(event)
    const form = event.target;

    let res = {};
    for ([key, val] in new FormData(form).entries()) {
        res[key] = val;
    }
    console.log(new FormData(form));
    fetch(form.action, {
        method: form.method,
        body: JSON.stringify(res),
        headers: {
            'content-type': "application/json"
        }
    })
    .then(response => response.text())
    .then(result => {
        alert("Cadastro realizado com sucesso!");
        console.log(result);
        // window.location.assign("telaSecundaria.html");
    })
    .catch(error => console.error('Erro:', error));
});

document.getElementById('idade').type = 'text';
