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
    startCarousel();
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

function startCarousel() {
    const carousel = document.getElementById('ofertasCarousel');
    const track = carousel ? carousel.querySelector('.carousel-track') : null;
    const prevBtn = carousel ? carousel.querySelector('.carousel-btn.prev') : null;
    const nextBtn = carousel ? carousel.querySelector('.carousel-btn.next') : null;
    const dotsWrap = document.getElementById('carouselDots');

    if (!carousel || !track || !prevBtn || !nextBtn || !dotsWrap) {
        return;
    }

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) {
        return;
    }

    let currentIndex = 0;
    let visibleSlides = getVisibleSlides();
    let autoTimer = null;

    function getVisibleSlides() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    function maxIndex() {
        return Math.max(0, slides.length - visibleSlides);
    }

    function getStep() {
        if (slides.length < 2) {
            return slides[0].getBoundingClientRect().width;
        }
        const first = slides[0].getBoundingClientRect();
        const second = slides[1].getBoundingClientRect();
        return second.left - first.left;
    }

    function renderDots() {
        dotsWrap.innerHTML = '';
        const total = maxIndex() + 1;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
            dotsWrap.appendChild(dot);
        }
    }

    function update() {
        const step = getStep();
        track.style.transform = 'translateX(-' + (currentIndex * step) + 'px)';
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex();
        renderDots();
    }

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex()));
        update();
    }

    function next() {
        if (currentIndex >= maxIndex()) {
            goTo(0);
            return;
        }
        goTo(currentIndex + 1);
    }

    function restartAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
        }
        autoTimer = setInterval(next, 4500);
    }

    prevBtn.addEventListener('click', function () {
        goTo(currentIndex - 1);
        restartAuto();
    });

    nextBtn.addEventListener('click', function () {
        next();
        restartAuto();
    });

    carousel.addEventListener('mouseenter', function () {
        if (autoTimer) {
            clearInterval(autoTimer);
        }
    });

    carousel.addEventListener('mouseleave', function () {
        restartAuto();
    });

    window.addEventListener('resize', function () {
        const newVisible = getVisibleSlides();
        if (newVisible !== visibleSlides) {
            visibleSlides = newVisible;
            carousel.style.setProperty('--visible-slides', String(visibleSlides));
        }
        if (currentIndex > maxIndex()) {
            currentIndex = maxIndex();
        }
        update();
    });

    carousel.style.setProperty('--visible-slides', String(visibleSlides));
    update();
    restartAuto();
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
