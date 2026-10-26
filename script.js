document.addEventListener("DOMContentLoaded", () => {
    // 1. Contador de Tempo (Início: 05/02/2026)
    const dataInicio = new Date("2026-02-05T00:00:00");

    function atualizarContador() {
        const agora = new Date();
        const diferenca = agora - dataInicio;

        if (diferenca > 0) {
            const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
            const minutos = Math.floor((diferenca / 1000 / 60) % 60);
            const segundos = Math.floor((diferenca / 1000) % 60);

            document.getElementById("dias").innerText = dias;
            document.getElementById("horas").innerText = horas;
            document.getElementById("minutos").innerText = minutos;
            document.getElementById("segundos").innerText = segundos;
        }
    }
    setInterval(atualizarContador, 1000);
    atualizarContador();

    // 2. Player de Áudio
    const btnPlayer = document.getElementById("btnPlayer");
    const audioPlayer = document.getElementById("audioPlayer");
    const iconePlay = document.getElementById("iconePlay");
    const statusAudio = document.getElementById("statusAudio");

    if (btnPlayer && audioPlayer) {
        btnPlayer.addEventListener("click", () => {
            if (audioPlayer.paused) {
                audioPlayer.play().then(() => {
                    iconePlay.className = "fa-solid fa-pause";
                    statusAudio.innerText = "Tocando nossa música ❤️";
                }).catch(() => {
                    statusAudio.innerText = "Adicione um arquivo 'musica.mp3' na pasta assets!";
                });
            } else {
                audioPlayer.pause();
                iconePlay.className = "fa-solid fa-play";
                statusAudio.innerText = "Música pausada";
            }
        });
    }

    // 3. Modal da Carta de Amor
    const btnCarta = document.getElementById("btnCarta");
    const btnFecharCarta = document.getElementById("btnFecharCarta");
    const modalCarta = document.getElementById("modalCarta");

    if (btnCarta && modalCarta) {
        btnCarta.addEventListener("click", () => modalCarta.classList.remove("hidden"));
        btnFecharCarta.addEventListener("click", () => modalCarta.classList.add("hidden"));
    }

    // 4. Chuva de Corações
    const btnSurpresa = document.getElementById("btnSurpresa");
    if (btnSurpresa) {
        btnSurpresa.addEventListener("click", () => {
            for (let i = 0; i < 35; i++) {
                const heart = document.createElement("div");
                heart.innerHTML = "❤️";
                heart.style.position = "fixed";
                heart.style.left = Math.random() * window.innerWidth + "px";
                heart.style.top = "-20px";
                heart.style.fontSize = (Math.random() * 20 + 15) + "px";
                heart.style.zIndex = "9999";
                heart.style.transition = "transform 3s linear, opacity 3s linear";
                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.style.transform = `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`;
                    heart.style.opacity = "0";
                }, 50);

                setTimeout(() => heart.remove(), 3000);
            }
        });
    }

    // 5. Upload Dinâmico de Fotos (LocalStorage)
    const inputFoto = document.getElementById("input-foto");
    const grid = document.getElementById("grid-fotos");

    if (inputFoto && grid) {
        let fotosSalvas = JSON.parse(localStorage.getItem('nossas_fotos_portfolio')) || [];
        
        fotosSalvas.forEach(url => {
            const novaPolaroid = document.createElement("div");
            novaPolaroid.className = "bg-white p-4 pb-6 rounded shadow-md transform rotate-1 hover:rotate-0 transition duration-300";
            novaPolaroid.innerHTML = `
                <img src="${url}" alt="Foto Salva" class="w-full h-64 object-cover rounded-sm mb-3">
                <p class="font-romantic text-xl text-center text-gray-700">Nosso momento especial 💖</p>
            `;
            grid.prepend(novaPolaroid);
        });

        inputFoto.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Url = event.target.result;
                    fotosSalvas.push(base64Url);
                    localStorage.setItem('nossas_fotos_portfolio', JSON.stringify(fotosSalvas));

                    const novaPolaroid = document.createElement("div");
                    novaPolaroid.className = "bg-white p-4 pb-6 rounded shadow-md transform rotate-1 hover:rotate-0 transition duration-300";
                    novaPolaroid.innerHTML = `
                        <img src="${base64Url}" alt="Nova Foto" class="w-full h-64 object-cover rounded-sm mb-3">
                        <p class="font-romantic text-xl text-center text-gray-700">Nosso momento especial 💖</p>
                    `;
                    grid.prepend(novaPolaroid);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 6. Botão de Abrir Modal do Jogo no Header
    const btnAbrirJogo = document.getElementById("btnAbrirJogo");
    if (btnAbrirJogo) {
        btnAbrirJogo.addEventListener("click", abrirModalJogo);
    }
});

// BANCO DE DADOS DE PERGUNTAS DO JOGO
const perguntas = {
    fofo: [
        "Qual foi o momento exato em que você percebeu que estava apaixonado(a) por mim?",
        "Qual é a sua foto nossa favorita de todas e por quê?",
        "Se pudessemos viajar juntos amanhã para qualquer lugar do mundo, para onde iriamos?",
        "Qual detalhe no meu rosto ou no meu corpo você mais ama olhar?",
        "Qual foi a conversa nossa na internet que você nunca mais esqueceu?",
        "O que eu faço que sempre tira um sorriso sincero do seu rosto?",
        "Qual música sempre faz você lembrar imediatamente de mim?",
        "Se você tivesse que me descrever para alguém em apenas 3 palavras, quais seriam?"
    ],
    quente: [
        "Qual é o seu maior desejo ou fantasia que você ainda quer realizar comigo?",
        "Qual lugar do meu corpo você mais gosta que eu te beije?",
        "Qual é a roupa, lingerie ou peça que eu uso que mais te deixa louco(a)?",
        "Qual foi a noite ou momento mais inesquecível que já passamos juntos?",
        "O que eu faço durante um beijo que te faz perder o fôlego?",
        "Se tivéssemos 24 horas sozinhos sem ninguém por perto, o que faríamos?",
        "Qual é a sua lembrança mais picante de nós dois juntos?",
        "Um toque ou carinho que te arrepia por inteiro na hora?"
    ]
};

let modoAtual = 'fofo';
let indiceAtual = 0;

function abrirModalJogo() {
    document.getElementById("modalJogo").classList.remove("hidden");
    voltarMenuModos();
}

function fecharModalJogo() {
    document.getElementById("modalJogo").classList.add("hidden");
}

function iniciarJogo(modo) {
    modoAtual = modo;
    // Embaralha as perguntas
    perguntas[modoAtual].sort(() => Math.random() - 0.5);
    indiceAtual = 0;

    document.getElementById("menuModos").classList.add("hidden");
    document.getElementById("areaPergunta").classList.remove("hidden");
    
    exibirPergunta();
}

function exibirPergunta() {
    const tag = document.getElementById("categoriaTag");
    const texto = document.getElementById("textoPergunta");

    if (modoAtual === 'fofo') {
        tag.innerText = "💖 Romântico & Fofo";
        tag.className = "text-xs font-bold uppercase tracking-wider text-pink-300 mb-2 block";
    } else {
        tag.innerText = "🔥 Pergunta Quente";
        tag.className = "text-xs font-bold uppercase tracking-wider text-red-400 mb-2 block";
    }

    texto.innerText = perguntas[modoAtual][indiceAtual];
}

function proximaPergunta() {
    indiceAtual = (indiceAtual + 1) % perguntas[modoAtual].length;
    exibirPergunta();
}

function voltarMenuModos() {
    document.getElementById("menuModos").classList.remove("hidden");
    document.getElementById("areaPergunta").classList.add("hidden");
}
