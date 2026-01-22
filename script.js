// LISTA DE FOTOS (Certifique-se que elas existem na pasta img)
const photos = [
    'img/foto1.jpg',
    'img/foto2.jpg',
    'img/foto3.jpg',
    'img/foto4.jpg',
    'img/foto5.jpg',
    'img/foto6.jpg'
];

// LEGENDAS
const captions = [
    "Um início...",
    "Uma conexao magica...",
    "Momentos inesquecíveis...",
    "Quero estar contigo...",
    "Sempre juntos...",
    "Para todo o sempre!"
];

let photoIndex = 0;
const gameArea = document.getElementById('gameArea');
const modal = document.getElementById('polaroidModal');
const polaroidImage = document.getElementById('polaroidImage');
const polaroidDate = document.getElementById('polaroidDate');

function spawnHeart() {
    // 1. Limite de 2 corações simultâneos
    const currentHearts = document.querySelectorAll('.chalk-heart');
    if (currentHearts.length >= 2) return;

    const heart = document.createElement('div');
    heart.classList.add('chalk-heart');

    // 2. Zonas Laterais (Esquerda e Direita apenas)
    const zone = Math.random() < 0.5 ? 'left' : 'right';
    let x, y;

    const padding = 50;
    const bottomLimitBuffer = 150; // Respeita o chão dos personagens
    const zoneWidth = window.innerWidth * 0.25; // Zona ocupa 25% da lateral

    if (zone === 'left') {
        x = Math.random() * (zoneWidth - padding) + padding;
    } else {
        x = (window.innerWidth - zoneWidth) + Math.random() * (zoneWidth - padding);
    }

    const usableHeight = window.innerHeight - padding - bottomLimitBuffer;
    y = Math.random() * (usableHeight - padding) + padding;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
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
    polaroidDate.textContent = captions[photoIndex] || "Com amor...";

    modal.classList.remove('hidden');

    photoIndex = (photoIndex + 1) % photos.length;
}

modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

setInterval(spawnHeart, 1000);