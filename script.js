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
// ==========================================
// PETS INTERATIVOS QUE ANDAM PELO SITE 🐱🐻
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Frases carinhosas quando clica nos pets
    const falasCat = ["Miau! Te amo! 🐱❤️", "Você é perfeita! ✨", "Carinho aqui! 🥰", "Purr... 💖", "Você é o amor dele! 💕"];
    const falasBear = ["Hum! Abraço de urso! 🐻🤗", "Você é muito fofa! 🧸", "Amo vocês dois! ❤️", "Owww... 💖", "Melhor casal! ✨"];

    // Criar elementos dos Pets
    const pet1 = document.createElement("div");
    pet1.className = "pet-caminhando pet-andando";
    pet1.id = "petGato";
    pet1.innerHTML = `<span class="emoji">🐱</span><div class="pet-balao" id="balaoGato">Miau!</div>`;

    const pet2 = document.createElement("div");
    pet2.className = "pet-caminhando pet-andando";
    pet2.id = "petUrso";
    pet2.innerHTML = `<span class="emoji">🐻</span><div class="pet-balao" id="balaoUrso">Oi amor!</div>`;

    document.body.appendChild(pet1);
    document.body.appendChild(pet2);

    // Posições e velocidades iniciais
    let posX1 = 50;
    let posX2 = window.innerWidth - 120;
    let dir1 = 1;  // 1 = direita, -1 = esquerda
    let dir2 = -1;
    let vel1 = 1.2;
    let vel2 = 0.9;

    // Função de animação contínua (Andar)
    function moverPets() {
        const larguraTela = window.innerWidth - 60;

        // Movimentação do Gatinho
        posX1 += vel1 * dir1;
        if (posX1 >= larguraTela) { dir1 = -1; }
        if (posX1 <= 20) { dir1 = 1; }
        pet1.style.left = posX1 + "px";
        pet1.querySelector('.emoji').style.transform = dir1 === 1 ? 'scaleX(1)' : 'scaleX(-1)';

        // Movimentação do Ursinho
        posX2 += vel2 * dir2;
        if (posX2 >= larguraTela) { dir2 = -1; }
        if (posX2 <= 20) { dir2 = 1; }
        pet2.style.left = posX2 + "px";
        pet2.querySelector('.emoji').style.transform = dir2 === 1 ? 'scaleX(1)' : 'scaleX(-1)';

        requestAnimationFrame(moverPets);
    }
    moverPets();

    // Reação ao clicar no Gatinho 🐱
    pet1.addEventListener("click", (e) => {
        e.stopPropagation();
        animarEInteragir(pet1, "balaoGato", falasCat);
    });

    // Reação ao clicar no Ursinho 🐻
    pet2.addEventListener("click", (e) => {
        e.stopPropagation();
        animarEInteragir(pet2, "balaoUrso", falasBear);
    });

    function animarEInteragir(petElem, idBalao, listaFalas) {
        // Efeito de pulo
        petElem.classList.remove("pet-pulo");
        void petElem.offsetWidth; // Força re-render para reiniciar animação
        petElem.classList.add("pet-pulo");

        // Mostrar balão de fala aleatório
        const balao = document.getElementById(idBalao);
        const falaSorteada = listaFalas[Math.floor(Math.random() * listaFalas.length)];
        balao.innerText = falaSorteada;
        balao.classList.add("ativo");

        // Soltar mini corações do pet
        soltarCoracoesPet(petElem);

        setTimeout(() => {
            balao.classList.remove("ativo");
        }, 2500);
    }

    // Criar explosão de pequenos corações ao clicar no pet
    function soltarCoracoesPet(petElem) {
        const rect = petElem.getBoundingClientRect();
        for (let i = 0; i < 6; i++) {
            const coracao = document.createElement("span");
            coracao.innerText = Math.random() > 0.5 ? "💖" : "✨";
            coracao.style.position = "fixed";
            coracao.style.left = (rect.left + 15 + (Math.random() * 20 - 10)) + "px";
            coracao.style.top = (rect.top - 10) + "px";
            coracao.style.fontSize = "1.2rem";
            coracao.style.zIndex = "10000";
            coracao.style.pointerEvents = "none";
            coracao.style.transition = "transform 1s ease-out, opacity 1s ease-out";
            document.body.appendChild(coracao);

            setTimeout(() => {
                coracao.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -60px) scale(1.3)`;
                coracao.style.opacity = "0";
            }, 30);

            setTimeout(() => coracao.remove(), 1000);
        }
    }
});

function voltarMenuModos() {
    document.getElementById("menuModos").classList.remove("hidden");
    document.getElementById("areaPergunta").classList.add("hidden");
}
