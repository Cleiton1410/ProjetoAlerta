// TODO: caso o id do usuário estiver no local storage, ir direto à tela secundaria

// quantidade de milisegundos em um ano
const MS_EM_UM_ANO = 1000 * 60 * 60 * 24 * 365;

/**
 * @param {string} datanasc
 */
function calcularIdade(datanasc) {
    const data_nasc_unix = new Date(datanasc).getTime();
    const tempo_unix_agora = new Date().getTime();
    return Math.floor((tempo_unix_agora - data_nasc_unix) / MS_EM_UM_ANO);
}

/**
 * @param {SubmitEvent} event
 */
function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const res = {
        curso: parseInt(formData.get("curso")),
        datanasc: formData.get("datanasc"),
        idade: calcularIdade(formData.get("datanasc")),
        email: formData.get("email"),
        login: formData.get("login"),
        senha: formData.get("senha"),
    };
    fetch("/api/cadastro", {
        method: "POST",
        body: JSON.stringify(res),
        headers: {
            "content-type": "application/json",
        },
    })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const result = response.text();
            alert("Cadastro realizado com sucesso!");
            console.log(result);

            // TODO: Salvar id e dados do form no localstorage (ver https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)

            // window.location.assign("telaSecundaria.html");
        })
        .catch((error) => console.error("Erro:", error));
}

document.getElementById("cadastroForm").addEventListener("submit", submitForm);
document.getElementById("idade").type = "text";


