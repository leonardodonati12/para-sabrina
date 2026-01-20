// LISTA DE FOTOS: Coloque aqui os nomes exatos das suas fotos na pasta img
const photos = [
    'img/foto1.jpg',
    'img/foto2.jpg',
    'img/foto3.jpg',
    // 'img/outra-foto.png',
];

// LEGENDAS: Na mesma ordem das fotos (opcional)
const captions = [
    "Onde tudo começou...",
    "Sorrisos bobos...",
    "Saudade de você...",
    // "Legenda da outra foto...",
];

let photoIndex = 0;
const gameArea = document.getElementById('gameArea');
const modal = document.getElementById('polaroidModal');
const polaroidImage = document.getElementById('polaroidImage');
const polaroidDate = document.getElementById('polaroidDate');

// Função que cria o coração
function spawnHeart() {
    const heart = document.createElement('div');
    heart.classList.add('chalk-heart'); // Usa a classe do CSS

    // Define posição aleatória (evitando as bordas extremas)
    const padding = 50;
    const x = Math.random() * (window.innerWidth - padding * 2) + padding;
    const y = Math.random() * (window.innerHeight - padding * 2) + padding;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // Rotação aleatória pra ficar "jogado"
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Ao clicar no coração
    heart.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita bugs
        showPhoto();
        heart.remove(); // O coração some
    });

    gameArea.appendChild(heart);

    // O coração desaparece sozinho se ninguém clicar em 3.5 segundos
    setTimeout(() => {
        if (heart.parentElement) {
            heart.style.transition = "opacity 0.5s";
            heart.style.opacity = 0;
            setTimeout(() => heart.remove(), 500);
        }
    }, 3500);
}

// Abre a Polaroide
function showPhoto() {
    if (photos.length === 0) return;

    polaroidImage.src = photos[photoIndex];
    polaroidDate.textContent = captions[photoIndex] || "Nossos momentos...";

    modal.classList.remove('hidden');

    // Vai pra próxima foto da lista
    photoIndex = (photoIndex + 1) % photos.length;
}

// Fecha o modal ao clicar nele
modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Gera um novo coração a cada 1.3 segundos
setInterval(spawnHeart, 1300);