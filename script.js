// Lista das imagens (tem que ter os arquivos na pasta img)
const photos = [
    'img/foto1.jpg',
    'img/foto2.jpg',
    'img/foto3.jpg',
    // Adicione quantas fotos tiver
];

let photoIndex = 0; // Para controlar a sequencia
const gameArea = document.getElementById('gameArea');
const modal = document.getElementById('polaroidModal');
const polaroidImage = document.getElementById('polaroidImage');

// Função para criar um coração em lugar aleatório
function spawnHeart() {
    const heart = document.createElement('div');
    heart.classList.add('pop-heart');

    // Posição aleatória (evitando o centro onde está o coração principal)
    // Uma lógica simples: random de 0 a 90vw e 0 a 90vh
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 60);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // Clique no coração
    heart.addEventListener('click', () => {
        showPhoto();
        heart.remove(); // Remove o coração clicado
    });

    gameArea.appendChild(heart);

    // O coração some sozinho depois de 3 segundos se não clicar
    setTimeout(() => {
        if (heart.parentElement) heart.remove();
    }, 3000);
}

// Mostrar a Polaroide
function showPhoto() {
    if (photos.length === 0) return;

    polaroidImage.src = photos[photoIndex];
    modal.classList.remove('hidden');

    // Avança para a próxima foto, se chegar no fim, volta pro começo
    photoIndex = (photoIndex + 1) % photos.length;
}

// Fechar modal ao clicar
modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Loop do Jogo: cria um coração a cada 1.5 segundos
setInterval(spawnHeart, 1500);

// --- Lógica Disney (Aparecer aleatoriamente) ---
const chars = ['charLeft', 'charRight'];
setInterval(() => {
    const randomCharId = chars[Math.floor(Math.random() * chars.length)];
    const charElement = document.getElementById(randomCharId);

    // Sobe
    charElement.classList.add('peek-up');

    // Desce depois de 2 segundos
    setTimeout(() => {
        charElement.classList.remove('peek-up');
    }, 2000);

}, 5000); // Tenta aparecer alguém a cada 5 segundos