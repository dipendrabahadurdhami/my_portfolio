// Typing effect for roles
const roles = [ "Video Editor", "Web Developer", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
const roleElement = document.getElementById("role");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    roleElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);
function typeWriter(element, text, speed = 20) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      element.style.borderRight = "none";
    }
  }
  typing();
}

document.addEventListener("DOMContentLoaded", () => {
  // All paragraphs type simultaneously
  const typingEls = document.querySelectorAll(".typing");
  typingEls.forEach(el => typeWriter(el, el.dataset.text, 20));

  // Vertical line height matches tallest text column
  const line = document.querySelector(".vertical-line");
  const textSections = document.querySelector(".text-sections");
  setTimeout(() => {
    const maxHeight = textSections.offsetHeight;
    line.style.transition = "height 2s ease";
    line.style.height = maxHeight + "px";
  }, 100);
});

// Modern Particle Network with glow & parallax
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.opacity = "0.25";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
const particleCount = Math.floor(window.innerWidth / 15);
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 1.3,
    dy: (Math.random() - 0.5) * 1.3,
    radius: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5 + 0.3,
    speedFactor: Math.random() * 0.5 + 0.75
  });
}

let scrollOffset = 0;
window.addEventListener("scroll", () => {
  scrollOffset = window.scrollY * 0.03;
});

// Hero Interactive Mouse Star with Shooting Star Trail & Mixed Background Stars
const heroSection = document.querySelector('.hero');
const glowCanvas = document.createElement('canvas');
heroSection.appendChild(glowCanvas);
const glowCtx = glowCanvas.getContext('2d');
glowCanvas.style.position = 'absolute';
glowCanvas.style.top = 0;
glowCanvas.style.left = 0;
glowCanvas.style.width = '100%';
glowCanvas.style.height = '100%';
glowCanvas.style.zIndex = '0';
glowCanvas.style.pointerEvents = 'none';

function resizeGlowCanvas() {
  glowCanvas.width = heroSection.offsetWidth;
  glowCanvas.height = heroSection.offsetHeight;
}
resizeGlowCanvas();
window.addEventListener('resize', resizeGlowCanvas);

let mouse = { x: glowCanvas.width / 2, y: glowCanvas.height / 2 };
heroSection.addEventListener('mousemove', e => {
  const rect = glowCanvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// Background stars
const interactiveStars = [];
const randomStars = [];

// Base speed for both star types
const baseSpeed = 0.002;

// 60 interactive stars (toward mouse, slightly slower)
for (let i = 0; i < 60; i++) {
  interactiveStars.push({
    x: Math.random() * glowCanvas.width,
    y: Math.random() * glowCanvas.height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.5 + 0.2,
    delta: Math.random() * 0.01 + 0.002
  });
}

// 60 random stars (drifting)
for (let i = 0; i < 60; i++) {
  randomStars.push({
    x: Math.random() * glowCanvas.width,
    y: Math.random() * glowCanvas.height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.5 + 0.2,
    delta: Math.random() * 0.01 + 0.002,
    dx: (Math.random() - 0.5) * baseSpeed * 100,
    dy: (Math.random() - 0.5) * baseSpeed * 100
  });
}

// Shooting stars
const shootingStars = [];
function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * glowCanvas.width,
    y: Math.random() * glowCanvas.height,
    alpha: 1,
    speed: Math.random() * 0.6 + 0.2,
  });
}
setInterval(() => {
  if (shootingStars.length < 4) spawnShootingStar();
}, 800);

// Draw a five-pointed star
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function animateGlow() {
  glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);

  // Interactive stars moving toward mouse
  interactiveStars.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha > 1 || star.alpha < 0.2) star.delta = -star.delta;

    const dx = mouse.x - star.x;
    const dy = mouse.y - star.y;
    star.x += dx * baseSpeed * 0.5; // slightly slower toward mouse
    star.y += dy * baseSpeed * 0.5;

    glowCtx.beginPath();
    glowCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    glowCtx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    glowCtx.shadowBlur = 2;
    glowCtx.shadowColor = `rgba(255,255,255,${star.alpha})`;
    glowCtx.fill();
  });

  // Random drifting stars
  randomStars.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha > 1 || star.alpha < 0.2) star.delta = -star.delta;

    star.x += star.dx;
    star.y += star.dy;

    // Wrap around edges
    if (star.x < 0) star.x = glowCanvas.width;
    if (star.x > glowCanvas.width) star.x = 0;
    if (star.y < 0) star.y = glowCanvas.height;
    if (star.y > glowCanvas.height) star.y = 0;

    glowCtx.beginPath();
    glowCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    glowCtx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    glowCtx.shadowBlur = 2;
    glowCtx.shadowColor = `rgba(255,255,255,${star.alpha})`;
    glowCtx.fill();
  });

  // Mouse interactive star
  glowCtx.fillStyle = 'rgba(255,255,255,1)';
  glowCtx.shadowBlur = 6;
  glowCtx.shadowColor = 'rgba(255,255,255,1)';
  drawStar(glowCtx, mouse.x, mouse.y, 5, 7, 3.5);

  // Animate shooting stars
  shootingStars.forEach((s, index) => {
    const dx = mouse.x - s.x;
    const dy = mouse.y - s.y;
    s.x += dx * s.speed;
    s.y += dy * s.speed;
    s.alpha -= 0.008; // fade out

    if (s.alpha <= 0) {
      shootingStars.splice(index, 1);
      return;
    }

    glowCtx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    glowCtx.shadowBlur = 4;
    glowCtx.shadowColor = `rgba(255,255,255,${s.alpha})`;
    drawStar(glowCtx, s.x, s.y, 5, 4, 2);
  });

  requestAnimationFrame(animateGlow);
}
animateGlow();


// Animate particles and connect lines
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    const parallaxY = p.y + scrollOffset * p.speedFactor;
    ctx.beginPath();
    ctx.arc(p.x, parallaxY, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 119, 255, ${p.alpha})`;
    ctx.shadowColor = "rgba(0, 119, 255, 0.6)";
    ctx.shadowBlur = 4;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  const maxDistance = 220; // stronger lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < maxDistance) {
        const alpha = 0.7 * (1 - distance / maxDistance);
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y + scrollOffset * particles[i].speedFactor);
        ctx.lineTo(particles[j].x, particles[j].y + scrollOffset * particles[j].speedFactor);
        ctx.strokeStyle = `rgba(0, 119, 255, ${alpha})`;
        ctx.lineWidth = 1.5 * alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(0, 119, 255, ${alpha})`;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}
animateParticles();

// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

// Scroll Reveal & Stagger
const scrollElements = document.querySelectorAll('.scroll-reveal');
const projectCards = document.querySelectorAll('.project-card');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  scrollElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100 && !el.classList.contains('reveal')) {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      el.classList.add('reveal');
    }
  });
}

function staggerReveal(cards) {
  cards.forEach((el, index) => {
    setTimeout(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.classList.add('reveal');
    }, index * 180);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const visibleCards = Array.from(projectCards).filter(c => !c.classList.contains("hide"));
  staggerReveal(visibleCards);
  revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    const visibleCards = [];

    projectCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.classList.remove("hide");
        card.classList.remove("reveal");
        visibleCards.push(card);
      } else {
        card.classList.add("hide");
        card.classList.remove("reveal");
      }
    });

    staggerReveal(visibleCards);
  });
});
function animateText(el, direction = "left") {
  const text = el.textContent.trim();
  el.textContent = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("letter");
    span.style.animationDelay = `${i * 0.03}s`;
    el.appendChild(span);
  });
}

// Logo from left
animateText(document.querySelector(".navbar .logo"), "left");

// Phone (with location) from right
animateText(document.querySelector(".navbar .contact-info a:first-child"), "right");

// Email from right
animateText(document.querySelector(".navbar .contact-info a:last-child"), "right");
