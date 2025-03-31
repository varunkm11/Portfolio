// Background Animation (Particle.js-like effect)
const canvas = document.querySelector('.background-animation');
const ctx = canvas.getContext('2d');

// Ensure canvas is initialized only if it exists
if (canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

let particlesArray = [];

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 2 + 1;
    let x = Math.random() * (canvas.width - size * 2) + size;
    let y = Math.random() * (canvas.height - size * 2) + size;
    let directionX = Math.random() * 0.4 - 0.2;
    let directionY = Math.random() * 0.4 - 0.2;
    let color = '#00ffff'; // Matches --ai-primary from CSS

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  if (!canvas || !ctx) return; // Guard against null canvas/context
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

// Initialize and start animation only if canvas exists
if (canvas && ctx) {
  init();
  animate();
}

// Handle window resize
window.addEventListener('resize', () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  }
});

// Add subtle mouse interaction (enhances the particle effect)
if (canvas) {
  canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.x;
    const mouseY = event.y;

    for (let i = 0; i < particlesArray.length; i++) {
      const particle = particlesArray[i];
      const distance = Math.sqrt(
        (mouseX - particle.x) ** 2 + (mouseY - particle.y) ** 2
      );

      if (distance < 100) {
        const forceDirectionX = (particle.x - mouseX) / distance;
        const forceDirectionY = (particle.y - mouseY) / distance;
        const force = (100 - distance) / 100;
        particle.directionX += forceDirectionX * force * 0.5;
        particle.directionY += forceDirectionY * force * 0.5;
      }
    }
  });
}

// Typed.js animation for the hero section
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Typed !== 'undefined') {
    const typedElement = document.querySelector('#typed-title');
    if (typedElement) {
      new Typed('#typed-title', {
        strings: ['AI/ML Engineer', 'Deep Learning Specialist', 'Data Scientist'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
      });
    } else {
      console.warn('Typed.js target element #typed-title not found in the DOM.');
    }
  } else {
    console.warn('Typed.js library not loaded.');
  }
});