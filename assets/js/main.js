// Kalau URL ada index.html, kita 'cuci' dia
if (window.location.pathname.endsWith('index.html')) {
    const cleanUrl = window.location.pathname.replace('index.html', '');
    window.history.replaceState(null, null, cleanUrl);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. DAFTAR PLUGIN GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. KURSOR (Muka Faris)
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        window.addEventListener('mousemove', e => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2, ease: "power2.out" });
        });
    }

    // 3. AVATAR FOLLOW MOUSE
    const avatar = document.querySelector('.avatar-image');
    const container = document.querySelector('.avatar-container');
    if (avatar && container) {
        window.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const angleX = (e.clientX - (rect.left + rect.width / 2)) / 25;
            const angleY = (e.clientY - (rect.top + rect.height / 2)) / 25;
            avatar.style.setProperty('--x', `${angleX}px`);
            avatar.style.setProperty('--y', `${angleY}px`);
        });
    }

    // 4. VIDEO CAROUSEL (Logic Next/Prev)
    const cards = document.querySelectorAll('.video-card');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentIndex = 2; // Kad tengah (active)

    function updateStack() {
        cards.forEach((card, index) => {
            card.classList.remove('stack-1', 'stack-2', 'stack-3', 'stack-4', 'stack-5', 'active');
            let position = (index - currentIndex + 5) % 5 + 1;
            card.classList.add(`stack-${position}`);
            if (position === 3) {
                card.classList.add('active');
                const v = card.querySelector('video');
                if(v) v.play();
            } else {
                const v = card.querySelector('video');
                if(v) v.pause();
            }
        });
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % 5; updateStack(); });
        prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + 5) % 5; updateStack(); });
    }

    // 5. POPUP / MODAL (Klik Video Portfolio)
    const modal = document.getElementById('tiktok-modal');
    const modalVideo = document.getElementById('modal-video-player');
    const closeModal = document.querySelector('.close-modal');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const vSource = this.querySelector('video').getAttribute('src');
            const title = this.getAttribute('data-title') || "My Project";
            const desc = this.getAttribute('data-desc') || "Visual Storytelling by Faris Ramlan";
            
            if(modal && modalVideo) {
                modalVideo.src = vSource;
                document.querySelector('.modal-info-side strong').innerText = title;
                document.querySelector('.modal-caption p').innerText = desc;
                modal.style.display = "flex";
                modalVideo.play();
            }
        });
    });

    if(closeModal) {
        closeModal.onclick = () => { modal.style.display = "none"; modalVideo.pause(); };
    }

    // 6. ANIMASI MASUK (Polaroid & Business Card)
    // Polaroid Animation
    gsap.utils.toArray(".polaroid-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 90%" },
            opacity: 0, y: 60, rotation: -10, duration: 1.2, ease: "back.out(1.7)"
        });
    });

    // Business Card Animation (Nama baru yang Faris tukar)
    gsap.utils.toArray(".bussiness-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 90%" },
            opacity: 0, y: 40, duration: 0.8, ease: "power3.out"
        });
    });

    // 7. HOVER INTERACTION (Point Cursor)
    const allInteractive = document.querySelectorAll('a, button, .video-card, .social-btn, .bussiness-card');
    const polaroids = document.querySelectorAll('.polaroid-card');

    // Hover biasa (Besarkan sikit)
    allInteractive.forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.5, duration: 0.3, overwrite: true }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: true }));
    });

    // Hover Polaroid (Besarkan banyak + Rotation effect guna CSS)
    polaroids.forEach(p => {
        p.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.5, duration: 0.3, overwrite: true }));
        p.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: true }));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 1. Berhenti daripada 'jump' secara default
            e.preventDefault();

            // 2. Cari section mana nak pergi (e.g. #work-showcase)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // 3. Skrol dengan lembut ke section tersebut
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // 4. Padamkan tanda # daripada URL tanpa refresh page
                window.history.replaceState(null, null, ' ');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hoverSound = document.getElementById('sound-hover');
    const clickSound = document.getElementById('sound-click');

    // 1. Bunyi Melingkar (Hover Nav Links)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0; // Reset ke saat ke-0 supaya boleh main banyak kali
            hoverSound.volume = 0.5;    // Jangan kuat sangat, nanti user terkejut
            hoverSound.play();
        });
    });

    // 2. Bunyi Klik (Semua Button & Interactive Elements)
    const interactiveElements = document.querySelectorAll('button, .nav-link, .video-card, .polaroid-card');
    interactiveElements.forEach(el => {
        el.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.volume = 0.7;
            clickSound.play();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hoverSound = document.getElementById('sound-hover');
    const clickSound = document.getElementById('sound-click');
    const cursor = document.querySelector('.cursor');

    // Pilih semua butang sosial berdasarkan class yang awak bagi
    const socialBtns = document.querySelectorAll('.social-btn');

    socialBtns.forEach(btn => {
        // 1. Bunyi Melingkar bila Hover
        btn.addEventListener('mouseenter', () => {
            if (hoverSound) {
                hoverSound.currentTime = 0;
                hoverSound.volume = 0.4; // Volume sedang-sedang
                hoverSound.play();
            }
            // Kursor muka Faris membesar sikit kat ikon
            gsap.to(cursor, { scale: 2, duration: 0.3 });
        });

        // 2. Kursor balik asal bila keluar
        btn.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });

        // 3. Bunyi Click bila tekan ikon
        btn.addEventListener('click', () => {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });
});