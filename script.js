document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÃO INICIAL ---
    const dataInicio = new Date(2016, 3, 19, 10, 0, 0);
    const fotos = [
        'foto0.jpg', 'foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 
        'foto5.jpg', 'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9.jpg', 
        'foto10.jpg', 'foto11.jpg', 'foto12.jpg', 'foto13.jpg', 'foto14.jpg', 
        'foto15.jpg', 'foto16.jpg'
    ];
    
    // --- ELEMENTOS DA PÁGINA ---
    const carrosselImagem = document.getElementById('carrossel-imagem');
    const anosEl = document.getElementById('anos');
    const mesesEl = document.getElementById('meses');
    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');
    
    // Elementos da Tela de Entrada
    const telaEntrada = document.getElementById('tela-entrada');
    const btnEntrar = document.getElementById('btn-entrar');

    // --- CONTADOR DE TEMPO ---
    function atualizarContador() {
        // ... (o código do contador continua o mesmo)
        const agora = new Date();
        const diferenca = agora - dataInicio;
        const segundosTotal = Math.floor(diferenca / 1000);
        const minutosTotal = Math.floor(segundosTotal / 60);
        const horasTotal = Math.floor(minutosTotal / 60);
        const diasTotal = Math.floor(horasTotal / 24);
        const anos = Math.floor(diasTotal / 365.25);
        const meses = Math.floor((diasTotal % 365.25) / 30.44);
        const dias = Math.floor((diasTotal % 365.25) % 30.44);
        const horas = horasTotal % 24;
        const minutos = minutosTotal % 60;
        const segundos = segundosTotal % 60;
        anosEl.textContent = anos;
        mesesEl.textContent = meses;
        diasEl.textContent = dias;
        horasEl.textContent = horas;
        minutosEl.textContent = minutos;
        segundosEl.textContent = segundos;
    }

    // --- CARROSSEL DE FOTOS ---
    let fotoAtualIndex = 0;
    function trocarFoto() {
        carrosselImagem.style.opacity = 0;
        setTimeout(() => {
            fotoAtualIndex = (fotoAtualIndex + 1) % fotos.length;
            carrosselImagem.src = `imagens/${fotos[fotoAtualIndex]}`;
            carrosselImagem.style.opacity = 1;
        }, 1500);
    }

    // --- CORAÇÕES CAINDO ---
    function criarCoracao() {
        const coracao = document.createElement('div');
        coracao.classList.add('coracao');
        coracao.innerHTML = '❤️';
        coracao.style.left = `${Math.random() * 100}vw`;
        coracao.style.animationDuration = `${Math.random() * 5 + 5}s`;
        document.body.appendChild(coracao);
        setTimeout(() => { coracao.remove(); }, 10000);
    }

    // --- PLAYER DE MÚSICA ---
    const audio = new Audio('musica.mp3');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = pauseIcon;
        } else {
            audio.pause();
            playPauseBtn.innerHTML = playIcon;
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    playPauseBtn.addEventListener('click', togglePlayPause);

    // --- LÓGICA DE INICIALIZAÇÃO ---
    
    // Função para iniciar o site após o clique
    function iniciarSurpresa() {
        // 1. Esconde a tela de entrada
        telaEntrada.classList.add('escondido');
        
        // 2. Toca a música e atualiza o ícone do player
        audio.play();
        playPauseBtn.innerHTML = pauseIcon;

        // 3. Inicia todas as animações e contadores
        setInterval(atualizarContador, 1000);
        setInterval(trocarFoto, 7000);
        setInterval(criarCoracao, 500);
        
        // Chama a função uma vez no início para não esperar 1s
        atualizarContador();
    }
    
    // Ouve o clique no botão de entrada para iniciar tudo
    btnEntrar.addEventListener('click', iniciarSurpresa);
});