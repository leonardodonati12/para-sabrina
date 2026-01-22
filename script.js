// LISTA DE FOTOS: Certifique-se que foto1.jpg até foto6.jpg estão na pasta img
const photos = [
    'img/foto1.jpg',
    'img/foto2.jpg',
    'img/foto3.jpg', // Se a sua for .png ou .jng, altere aqui!
    'img/foto4.jpg',
    'img/foto5.jpg',
    'img/foto6.jpg'
];

// LEGENDAS: Uma frase para cada foto
const captions = [
    "Onde tudo começou...",      // Legenda da Foto 1
    "Nosso melhor sorriso...",   // Legenda da Foto 2
    "Momentos inesquecíveis...", // Legenda da Foto 3
    "Amo o seu jeito...",        // Legenda da Foto 4
    "Sempre juntos...",          // Legenda da Foto 5
    "Para todo o sempre!"        // Legenda da Foto 6
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

    // 2. Zonas Laterais + Limite Inferior
    const zone = Math.random() < 0.5 ? 'left' : 'right';
    let x, y;

    const padding = 50;
    const bottomLimitBuffer = 150; // Sobe o limite inferior
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
    // Pega a legenda correspondente ou usa uma padrão se faltar
    polaroidDate.textContent = captions[photoIndex] || "Com amor...";

    modal.classList.remove('hidden');

    // Avança para a próxima foto (volta pro zero se chegar no fim)
    photoIndex = (photoIndex + 1) % photos.length;
}

modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

setInterval(spawnHeart, 1000);