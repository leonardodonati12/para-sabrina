// LISTA DE FOTOS
// Verifique se os nomes e extensões (.jpg/.png) estão IGUAIS aos da pasta
const photos = [
    'img/foto1.jpg',
    'img/foto2.jpg',
    'img/foto3.jpg',
    'img/foto4.jpg',
    'img/foto5.jpg',
    'img/foto6.jpg'
];

// LEGENDAS (Uma para cada foto)
const captions = [
    "Onde tudo começou...",
    "Nosso melhor sorriso...",
    "Momentos inesquecíveis...",
    "Amo o seu jeito...",
    "Sempre juntos...",
    "Para todo o sempre!"
];

let photoIndex = 0;
const gameArea = document.getElementById('gameArea');
const modal = document.getElementById('polaroidModal');
const polaroidImage = document.getElementById('polaroidImage');
const polaroidDate = document.getElementById('polaroidDate');

function spawnHeart() {
    // 1. Limite de 2 corações
    const currentHearts = document.querySelectorAll('.chalk-heart');
    if (currentHearts.length >= 2) return;

    const heart = document.createElement('div');
    heart.classList.add('chalk-heart');

    // 2. Zonas Laterais + Limite Inferior
    const zone = Math.random() < 0.5 ? 'left' : 'right';
    let x, y;

    const padding = 50;
    const bottomLimitBuffer = 150;
    const zoneWidth = window.innerWidth * 0.25;

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

    // Passa para a próxima foto
    photoIndex = (photoIndex + 1) % photos.length;
}

modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

setInterval(spawnHeart, 1000);