// Lista de palavras, categorias e dicas do jogo.
const palavras = [
    { palavra: "javascript", categoria: "Tecnologia", dica: "Linguagem usada para dar interatividade às páginas." },
    { palavra: "computador", categoria: "Tecnologia", dica: "Máquina utilizada para processar informações." },
    { palavra: "internet", categoria: "Tecnologia", dica: "Rede mundial que conecta dispositivos." },
    { palavra: "teclado", categoria: "Tecnologia", dica: "Acessório usado para digitar." },
    { palavra: "girassol", categoria: "Natureza", dica: "Flor conhecida por acompanhar a luz do Sol." },
    { palavra: "borboleta", categoria: "Natureza", dica: "Inseto que passa pela metamorfose." },
    { palavra: "elefante", categoria: "Animais", dica: "Grande mamífero que possui uma tromba." },
    { palavra: "golfinho", categoria: "Animais", dica: "Mamífero marinho conhecido por sua inteligência." },
    { palavra: "abacaxi", categoria: "Alimentos", dica: "Fruta tropical com casca áspera." },
    { palavra: "morango", categoria: "Alimentos", dica: "Fruta vermelha com pequenas sementes na parte externa." },
    { palavra: "brasilia", categoria: "Cidades", dica: "Capital do Brasil." },
    { palavra: "biblioteca", categoria: "Lugares", dica: "Lugar onde podemos encontrar muitos livros." }
];

// Variáveis que representam o estado da partida.
let palavraSecreta = "";
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoFinalizado = false;

// Referências aos elementos do HTML (DOM).
const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const elementoCategoria = document.getElementById("categoria");
const elementoDica = document.getElementById("dica");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// Escolhe uma palavra e prepara uma nova partida.
function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    const escolha = palavras[indice];

    palavraSecreta = escolha.palavra;
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoFinalizado = false;

    elementoCategoria.textContent = escolha.categoria;
    elementoDica.textContent = escolha.dica;
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "Nenhuma letra ainda.";
    mensagem.textContent = "Boa sorte! Digite uma letra para começar.";
    mensagem.classList.remove("erro");

    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;

    atualizarPalavra();
    inputLetra.focus();
}

// Mostra as letras descobertas e esconde as demais.
function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao.trim();
}

// Verifica se todas as letras da palavra foram descobertas.
function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }

    return true;
}

// Verifica a letra digitada pelo jogador.
function verificarLetra() {
    if (jogoFinalizado) {
        return;
    }

    const letra = inputLetra.value.toLowerCase().trim();

    if (!/^[a-záàâãéêíóôõúç]$/i.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra.";
        mensagem.classList.add("erro");
        inputLetra.value = "";
        inputLetra.focus();
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Você já utilizou essa letra.";
        mensagem.classList.add("erro");
        inputLetra.value = "";
        inputLetra.focus();
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Muito bem! Você acertou.";
        mensagem.classList.remove("erro");
    } else {
        tentativas--;
        mensagem.textContent = "Essa letra não está na palavra.";
        mensagem.classList.add("erro");
    }

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    if (venceu()) {
        mensagem.textContent = "Parabéns! Você descobriu a palavra!";
        finalizarJogo();
    } else if (tentativas === 0) {
        mensagem.textContent = "Fim de jogo! A palavra era: " + palavraSecreta + ".";
        mensagem.classList.add("erro");
        finalizarJogo();
    }

    inputLetra.value = "";

    if (!jogoFinalizado) {
        inputLetra.focus();
    }
}

// Impede novas tentativas depois da vitória ou derrota.
function finalizarJogo() {
    jogoFinalizado = true;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
}

// Eventos dos botões e do teclado.
botaoTentar.addEventListener("click", verificarLetra);

botaoReiniciar.addEventListener("click", iniciarJogo);

inputLetra.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

// Inicia a primeira partida quando a página é carregada.
iniciarJogo();
