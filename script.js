const photos = [
    'img/foto1.jpg',
    'img/foto2.jpg',
    'img/foto3.jpg',
    // Adicione suas fotos aqui
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
    // 1. Limite de corações simultâneos (Feedback 5)
    // Se já tiver 2 ou mais, cancela a criação desse e espera o próximo ciclo
    const currentHearts = document.querySelectorAll('.chalk-heart');
    if (currentHearts.length >= 2) return;

    const heart = document.createElement('div');
    heart.classList.add('chalk-heart');

    // 2. Lógica de Posição: Evitar o Centro (Feedback 2)
    // Vamos definir que o "centro proibido" é entre 30% e 70% da tela
    let x, y;
    const safePadding = 100; // Margem das bordas da tela

    // Tenta achar uma posição aleatória até cair fora do centro
    let validPosition = false;
    while (!validPosition) {
        x = Math.random() * (window.innerWidth - safePadding * 2) + safePadding;
        y = Math.random() * (window.innerHeight - safePadding * 2) + safePadding;

        // Define a caixa central proibida (onde está o coração grande)
        const centerXStart = window.innerWidth * 0.25;
        const centerXEnd = window.innerWidth * 0.75;
        const centerYStart = window.innerHeight * 0.25;
        const centerYEnd = window.innerHeight * 0.75;

        // Se a posição cair DENTRO dessa caixa, tenta de novo. Se cair FORA, aceita.
        if (x > centerXStart && x < centerXEnd && y > centerYStart && y < centerYEnd) {
            validPosition = false; // Tenta de novo
        } else {
            validPosition = true; // Achou um lugar bom nas laterais
        }
    }

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // Feedback 1: Removida a rotação aleatória
    // heart.style.transform = ... (REMOVIDO)

    heart.addEventListener('click', (e) => {
        e.stopPropagation();
        showPhoto();
        heart.remove();
    });

    gameArea.appendChild(heart);

    // Some depois de um tempo
    setTimeout(() => {
        if (heart.parentElement) {
            heart.style.transition = "opacity 0.5s";
            heart.style.opacity = 0;
            setTimeout(() => heart.remove(), 500);
        }
    }, 4000); // Aumentei um pouquinho o tempo pra dar chance de clicar
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

// Tenta spawnar com frequência, mas a trava do começo da função limita a quantidade
setInterval(spawnHeart, 1000);