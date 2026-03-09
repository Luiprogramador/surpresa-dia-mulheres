function nextStep(stepNumber) {
    // Esconde todas as seções
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
    });

    // Mostra a seção desejada
    const currentStep = document.getElementById(`step-${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
    }
}

// Lógica para o Slideshow de fundo
function startBackgroundSlideshow() {
    const slides = document.querySelectorAll('.bg-slideshow .slide');
    let currentSlide = 0;
    if (slides.length === 0) return;

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000); 
}

// Lógica para a Chuva de Corações (Efeito Legal)
let heartInterval; // Variável para controlar o intervalo

function createHearts() {
    const container = document.getElementById('hearts-step-4');
    if (!container) return;

    // Cria um coração a cada 200 milissegundos
    heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Use um caractere Unicode de coração sólido (❤) ou vazio (♡)
        heart.innerText = '❤'; 
        
        // Posição horizontal aleatória (0% a 100% da largura)
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Tamanho aleatório (15px a 25px)
        heart.style.fontSize = Math.random() * 10 + 15 + 'px';
        
        // Duração da queda aleatória (2s a 4s) para dar profundidade
        heart.style.animationDuration = Math.random() * 2 + 2 + 's';

        container.appendChild(heart);

        // Remove o coração do DOM depois que a animação termina (4 segundos é a duração máx)
        setTimeout(() => {
            heart.remove();
        }, 4000);

    }, 200);
}

// Função para parar a chuva de corações (limpa memória)
function stopHearts() {
    clearInterval(heartInterval);
    const container = document.getElementById('hearts-step-4');
    if (container) {
        container.innerHTML = ''; // Limpa os corações que ainda estão na tela
    }
}

// Atualização da função de navegação
function nextStep(stepNumber) {
    // Esconde todas as seções
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
    });

    // Para o efeito de corações se estiver saindo do step 3
    stopHearts();

    // Mostra a seção desejada
    const currentStep = document.getElementById(`step-${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
        
        // Inicia o efeito de corações se for o step 3
        if (stepNumber === 3) {
            createHearts();
        }
    }
}

// Inicia o slideshow ao carregar
document.addEventListener('DOMContentLoaded', startBackgroundSlideshow);

// Lógica do Player de Música
function togglePlay() {
    const audio = document.getElementById("bg-music");
    const playBtn = document.getElementById("play-btn");
    const albumCover = document.getElementById("album-cover");

    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸ Pause";
        playBtn.style.backgroundColor = "transparent";
        playBtn.style.color = "#ff85a2";
        playBtn.style.border = "2px solid #ff85a2";
        albumCover.classList.add("spin"); // Começa a girar a foto
    } else {
        audio.pause();
        playBtn.innerText = "▶ Play";
        playBtn.style.backgroundColor = "#ff85a2";
        playBtn.style.color = "#1a1a1a";
        playBtn.style.border = "none";
        albumCover.classList.remove("spin"); // Para de girar
    }
}

// ATENÇÃO: Atualize a sua função nextStep() existente para disparar os corações no step 4!
function nextStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
    });

    stopHearts();

    const currentStep = document.getElementById(`step-${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
        
        // Agora os corações caem no step 4 (a página final)
        if (stepNumber === 4) {
            createHearts();
        }
    }
}

// Lógica do Contador de Tempo
function startCounter() {
    // Define a data que vocês se conheceram (Ano, Mês [0-11 onde Jan é 0, Fev é 1], Dia, Hora, Minuto)
    // 28 de Fevereiro de 2026 à meia-noite (ou mude a hora se lembrar o momento exato!)
    const startDate = new Date(2026, 1, 28, 0, 0, 0).getTime();

    // Atualiza o contador a cada 1 segundo (1000 milissegundos)
    setInterval(() => {
        const now = new Date().getTime();
        const difference = now - startDate;

        // Cálculos matemáticos para converter milissegundos em dias, horas, etc.
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Atualiza o HTML garantindo que sempre tenha 2 dígitos (ex: "08" em vez de "8")
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Chamar a função do contador assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    startBackgroundSlideshow(); // Sua função do slideshow que já estava aqui
    startCounter();             // Inicia o nosso novo contador
});

// Lógica da Tela de Carregamento
window.addEventListener('load', () => {
    // Quando tudo (fotos, vídeos, áudio) terminar de carregar, 
    // damos um pequeno delay de 1.5 segundos só para ela conseguir ler a mensagem da tela
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500);
});