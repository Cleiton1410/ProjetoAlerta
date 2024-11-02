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
async function submitForm(event) {
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

    try {
        const response = await fetch("/api/cadastro", {
            method: "POST",
            body: JSON.stringify(res),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const result = await response.text();
        alert("Cadastro realizado com sucesso!");
        console.log(result);

        // Salvar id e dados do form no localstorage
        const userId = JSON.parse(result).id; // Supondo que a resposta tenha um campo 'id'
        localStorage.setItem('userId', userId);
        salvarDados();
        
        // Redirecionar para a tela secundária
        window.location.assign("alerta.html");
    } catch (error) {
        console.error("Erro:", error);
    }
}

function salvarDados() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;
    const dataNasc = document.getElementById('datanasc').value; // Corrigido para o id correto
    const curso = document.getElementById('curso').value;

    const dadosCadastro = {
        login: login,
        senha: senha,
        email: email,
        dataNasc: dataNasc,
        curso: curso,
    };

    localStorage.setItem('dadosCadastro', JSON.stringify(dadosCadastro));
    alert('Cadastro salvo com sucesso!');
}

// Verificar se o id do usuário está no local storage
if (localStorage.getItem('userId')) {
    window.location.assign("alerta.html");
} else {
    document.getElementById("cadastroForm").addEventListener("submit", submitForm);
}
