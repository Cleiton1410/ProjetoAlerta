let verificacao = true;
    function funcao() {
        if (verificacao) {
            vibrar(3);
            verificacao = false;
        }
    }

    window.addEventListener("mousemove", funcao);
    window.addEventListener("mousedown", funcao)


    function vibrar(tempoInicial) {
        if (tempoInicial != 0) {
            navigator.vibrate(tempoInicial)
            console.log("vibrou ", tempoInicial)
            setTimeout(() => vibrar(tempoInicial + 1000), tempoInicial * 1.5);
        }
        navigator.vibrate([0])
    }