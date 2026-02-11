document.addEventListener('DOMContentLoaded', () => {
  // semua JS kau letak sini
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Cursor
const cursor = document.querySelector('.cursor');

gsap.set(cursor, { xPercent: -50, yPercent: -50 });

window.addEventListener('mousemove', e => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: "power3.out"
  });
});

// Hero card animation (appear once)
gsap.from('.card', {
  y: 40,
  opacity: 0,
  duration: 10,
  ease: "power3.out"
});

// Scroll animation for all other sections
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%"
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: "power3.out"
  });
});

// Section headers entry animation
gsap.utils.toArray("h2").forEach(header => {
  gsap.from(header, {
    scrollTrigger: {
      trigger: header,
      start: "top 90%"
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power3.out"
  });
});

gsap.utils.toArray(".project-card").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%"
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out"
  });
});

gsap.from(".social-btn", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  }
});

const avatar = document.querySelector('.avatar-image');
const container = document.querySelector('.avatar-container');

window.addEventListener('mousemove', (e) => {
  // 1. Dapatkan posisi tengah avatar
  const rect = container.getBoundingClientRect();
  const avatarX = rect.left + rect.width / 2;
  const avatarY = rect.top + rect.height / 2;

  // 2. Kira jarak mouse dari tengah avatar
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // 3. Hadkan pergerakan (contoh: max 15px supaya tak terkeluar dari bulatan)
  const angleX = (mouseX - avatarX) / 30; 
  const angleY = (mouseY - avatarY) / 30;

  // 4. Update CSS Variables
  avatar.style.setProperty('--x', `${angleX}px`);
  avatar.style.setProperty('--y', `${angleY}px`);
});

const allButtons = document.querySelectorAll('a, .social-btn, .project-card');

allButtons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    // Kita cuma besarkan kursor sikit, tanpa ubah warna/background
    gsap.to(cursor, { 
      scale: 1.5, 
      duration: 0.3 
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    // Kembali ke saiz asal
    gsap.to(cursor, { 
      scale: 1, 
      duration: 0.3 
    });
  });
});

// Pastikan card Hello muncul rapat dengan avatar
gsap.from('.card', {
  y: 20,
  opacity: 0,
  duration: 1.5,
  delay: 0.5,
  ease: "back.out(1.7)"
});

// Animasi masuk untuk Avatar & Card secara berurutan (Stagger)
gsap.from([".avatar-container", ".card"], {
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2, // Avatar muncul dulu, 0.2 saat kemudian Card muncul
  ease: "back.out(1.7)"
});

