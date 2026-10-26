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

    // 3. Modal da Carta de Amor
    const btnCarta = document.getElementById("btnCarta");
    const btnFecharCarta = document.getElementById("btnFecharCarta");
    const modalCarta = document.getElementById("modalCarta");

    btnCarta.addEventListener("click", () => modalCarta.classList.remove("hidden"));
    btnFecharCarta.addEventListener("click", () => modalCarta.classList.add("hidden"));

    // 4. Chuva de Corações
    const btnSurpresa = document.getElementById("btnSurpresa");
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

    // 5. Upload Dinâmico de Fotos
    const inputFoto = document.getElementById("input-foto");
    inputFoto.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const grid = document.getElementById("grid-fotos");
                const novaPolaroid = document.createElement("div");
                novaPolaroid.className = "bg-white p-4 pb-6 rounded shadow-md transform rotate-1 hover:rotate-0 transition duration-300";
                novaPolaroid.innerHTML = `
                    <img src="${event.target.result}" alt="Nova Foto" class="w-full h-64 object-cover rounded-sm mb-3">
                    <p class="font-romantic text-xl text-center text-gray-700">Nosso momento especial 💖</p>
                `;
                grid.prepend(novaPolaroid);
            };
            reader.readAsDataURL(file);
        }
    });
});