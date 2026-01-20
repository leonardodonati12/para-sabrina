const photos = [
    'img/foto1.jpg',
    'img/foto2.jpg',
    'img/foto3.jpg',
];

const captions = [
    "Onde tudo começou...",
    "Nós...",
    "Saudades...",
];

let photoIndex = 0;
const gameArea = document.getElementById('gameArea');
const modal = document.getElementById('polaroidModal');
const polaroidImage = document.getElementById('polaroidImage');
const polaroidDate = document.getElementById('polaroidDate');

function spawnHeart() {
    // 1. Limite Rígido: Apenas 2 corações por vez
    const currentHearts = document.querySelectorAll('.chalk-heart');
    if (currentHearts.length >= 2) return;

    const heart = document.createElement('div');
    heart.classList.add('chalk-heart');

    // 2. Lógica das Zonas Laterais (Imagem 1)
    // Vamos sortear: 0 = Esquerda, 1 = Direita
    const zone = Math.random() < 0.5 ? 'left' : 'right';

    let x, y;
    const padding = 50; // Margem da borda
    const zoneWidth = window.innerWidth * 0.25; // A zona ocupa 25% da tela

    if (zone === 'left') {
        // Gera X entre 50px e 25% da tela
        x = Math.random() * (zoneWidth - padding) + padding;
    } else {
        // Gera X entre 75% da tela e a borda final
        x = (window.innerWidth - zoneWidth) + Math.random() * (zoneWidth - padding);
    }

    // Y pode ser em qualquer altura (com margem)
    y = Math.random() * (window.innerHeight - padding * 2) + padding;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // SEM ROTAÇÃO (Feedback enfático)
    heart.style.transform = 'none';

    heart.addEventListener('click', (e) => {
        e.stopPropagation();
        showPhoto();
        heart.remove();
    });

    gameArea.appendChild(heart);

    // Tempo de vida do coração
    setTimeout(() => {
        if (heart.parentElement) {
            heart.style.transition = "opacity 0.5s";
            heart.style.opacity = 0;
            setTimeout(() => heart.remove(), 500);
        }
    }, 4000);
}

function showPhoto() {
    if (photos.length === 0) return;
    polaroidImage.src = photos[photoIndex];
    polaroidDate.textContent = captions[photoIndex] || "Nossos momentos...";
    modal.classList.remove('hidden');
    photoIndex = (photoIndex + 1) % photos.length;
}

modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Tenta criar coração a cada 1 segundo
setInterval(spawnHeart, 1000);