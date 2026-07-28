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


/* --- LÓGICA MENÚ MÓVIL --- */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}


/* --- INTERACCIÓN DE TARJETAS POR CLIC (UNIVERSAL PARA MÓVIL Y TÁCTILES) --- */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Servicios
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('service-btn')) return;

      const isActive = card.classList.contains('active');
      serviceCards.forEach(c => c.classList.remove('active'));
      
      if (!isActive) {
        card.classList.add('active');
      }
    });
  });

  // 2. Información de Contacto
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach(card => {
    // Añadir insignia de "Haz clic" dinámicamente si no la tiene
    if (!card.querySelector('.click-badge')) {
      const badge = document.createElement('span');
      badge.className = 'click-badge';
      badge.innerHTML = 'Haz clic 👇';
      card.appendChild(badge);
    }

    card.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      infoCards.forEach(c => c.classList.remove('active'));

      if (!isActive) {
        card.classList.add('active');
      }
    });
  });
});


/* --- FORMULARIO CON ANIMACIÓN DE CARTA --- */
const form = document.getElementById('contactForm');
const bigEnvelopeCard = document.getElementById('bigEnvelopeCard');

if (form && bigEnvelopeCard) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensajeForm').value;

    bigEnvelopeCard.classList.add('closing');

    setTimeout(() => {
      bigEnvelopeCard.classList.add('flying');
    }, 600);

    setTimeout(() => {
      const correoEmpresa = "legadcymkt@gmail.com";
      const cuerpoEmail = `Nombre: ${nombre}%0D%0ACorreo de contacto: ${email}%0D%0A%0D%0AMensaje:%0D%0A${encodeURIComponent(mensaje)}`;

      window.location.href = `mailto:${correoEmpresa}?subject=${encodeURIComponent(asunto)}&body=${cuerpoEmail}`;

      form.reset();
      bigEnvelopeCard.classList.remove('closing', 'flying');
    }, 1800);
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

/* --- MANEJO DE BOTONES "SABER MÁS" DE SERVICIOS --- */
document.addEventListener('DOMContentLoaded', () => {
  const serviceButtons = document.querySelectorAll('.service-btn');
  const asuntoInput = document.getElementById('asunto');
  const mensajeTextarea = document.getElementById('mensajeForm');
  const contactoSection = document.getElementById('mensaje');

  // Mensajes predeterminados según el servicio
  const mensajesPredeterminados = {
    'Servicio 1': {
      asunto: 'Información sobre Servicio 1',
      mensaje: 'Hola equipo de Legadcy,\n\nServicio 1.'
    },
    'Servicio 2': {
      asunto: 'Información sobre Servicio 1',
      mensaje: 'Hola equipo de Legadcy,\n\nServicio 2'
    },
    'Servicio 3': {
      asunto: 'Información sobre Servicio 1',
      mensaje: 'Hola equipo de Legadcy,\n\nServicio 3'
    },
    'Servicio 4': {
      asunto: 'Información sobre Servicio 1',
      mensaje: 'Hola equipo de Legadcy,\n\nServicio 4'
    }
  };

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita interferir con la apertura/cierre de la tarjeta en móvil

      const nombreServicio = btn.getAttribute('data-servicio');
      const datosPredeterminados = mensajesPredeterminados[nombreServicio];

      if (datosPredeterminados) {
        if (asuntoInput) asuntoInput.value = datosPredeterminados.asunto;
        if (mensajeTextarea) mensajeTextarea.value = datosPredeterminados.mensaje;
      }

      // Desplazamiento suave hasta el formulario de contacto
      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});