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

    const curso = formData.get("curso");

    if (!curso || curso == "0") {
        alert("Por favor, selecione um curso válido.");
        return;
    }

    const nascString = formData.get("idade").split('/')
    const datanasc = new Date(parseInt(nascString[2]), parseInt(nascString[1]) - 1, parseInt(nascString[0]));
    const idadeAnos = calcularIdade(datanasc);

    if (isNaN(datanasc) || idadeAnos < 10 || idadeAnos > 100) {
        throw new Error("Data de nascimento inválida");
    }
    const data = new Date(datanasc);
    const dadosUsuario = {
        curso: parseInt(formData.get("curso")),
        datanasc: `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`,
        idade: idadeAnos,
        email: formData.get("email"),
        login: formData.get("login"),
        senha: formData.get("senha"),
    };

    try {
        const response = await fetch("/api/cadastro", {
            method: "POST",
            body: JSON.stringify(dadosUsuario),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Não foi possível enviar o cadastro, tente novamente mais tarde.");
        }

        const result = await response.text();

        // Salvar id e dados do form no localstorage
        const userId = result; // Supondo que a resposta tenha um campo 'id'
        localStorage.setItem('userId', userId);
        localStorage.setItem('dadosCadastro', JSON.stringify(dadosUsuario));

        // Redirecionar para a tela secundária
        alert("Cadastro realizado com sucesso!");
        window.location.assign("alerta.html");
    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar: " + error.message);
    }
}

function setarEstilosSelect() {
    let valor = document.getElementById("curso").value
    if (valor == "0" || !valor) {
        document.getElementById("curso").classList.add('select-sem-valor');
    } else {
        document.getElementById("curso").classList.remove('select-sem-valor');
    };
}

// Verificar se o id do usuário está no local storage
// if (localStorage.getItem('userId')) {
//     window.location.assign("alerta.html");
// } else {
    document.getElementById("cadastroForm").addEventListener("submit", submitForm);
// }

document.getElementById("curso").addEventListener("change", setarEstilosSelect);
setarEstilosSelect();

$(document).ready(function() {
    $("#idade").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2014",
        showButtonPanel: true
    });
});
