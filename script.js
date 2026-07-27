/* --- CARRUSEL DE IMÁGENES --- */
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach(slide => slide.classList.remove('active'));
  slides[currentSlide].classList.add('active');
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => moveSlide(-1));
  nextBtn.addEventListener('click', () => moveSlide(1));
}

setInterval(() => {
  moveSlide(1);
}, 5000);


/* --- FORMULARIO DE CONTACTO --- */
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensajeForm').value;

    const correoEmpresa = "legadcymkt@gmail.com";
    const cuerpoEmail = `Nombre: ${nombre}%0D%0ACorreo de contacto: ${email}%0D%0A%0D%0AMensaje:%0D%0A${encodeURIComponent(mensaje)}`;

    window.location.href = `mailto:${correoEmpresa}?subject=${encodeURIComponent(asunto)}&body=${cuerpoEmail}`;
  });
}


/* --- ANIMACIÓN EN SCROLL --- */
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const snapSections = document.querySelectorAll('.snap-section');
  snapSections.forEach(section => observer.observe(section));
});
