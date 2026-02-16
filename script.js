document.addEventListener('DOMContentLoaded', function () {
    const botao = document.querySelector('.botao-whatsapp');

    if (botao) {
        botao.addEventListener('mouseover', function () {
            this.style.textShadow = '0 0 10px rgba(0, 255, 127, 0.5)';
        });

        botao.addEventListener('mouseout', function () {
            this.style.textShadow = 'none';
        });

        botao.addEventListener('click', function (e) {
            createParticles(e);
        });
    }

    startSocialProofPopup();
});

function createParticles(e) {
    const x = e.clientX;
    const y = e.clientY;

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = '#00ff7f';
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 10px rgba(0, 255, 127, 0.8)';

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 5;
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        };

        let life = 0;
        const maxLife = 30;

        const animate = setInterval(() => {
            life++;
            const opacity = 1 - life / maxLife;

            const randomX = x + velocity.x * life + (Math.random() - 0.5) * 20;
            const randomY = y + velocity.y * life + (Math.random() - 0.5) * 20;

            particle.style.left = randomX + 'px';
            particle.style.top = randomY + 'px';
            particle.style.opacity = String(opacity);

            if (life >= maxLife) {
                clearInterval(animate);
                particle.remove();
            }
        }, 30);
    }
}

function startSocialProofPopup() {
    const popup = document.getElementById('socialProofPopup');
    const popupNumero = document.getElementById('popupNumero');

    if (!popup || !popupNumero) {
        return;
    }

    const numeros = [
        '+55 16 9*******',
        '+55 11 9*******',
        '+55 21 9*******',
        '+55 31 9*******',
        '+55 41 9*******',
        '+55 85 9*******',
        '+55 62 9*******',
        '+55 27 9*******'
    ];

    let indexAtual = 0;

    const exibirPopup = () => {
        popupNumero.textContent = numeros[indexAtual];
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
        }, 3200);

        indexAtual = (indexAtual + 1) % numeros.length;
    };

    setTimeout(exibirPopup, 900);
    setInterval(exibirPopup, 9000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

