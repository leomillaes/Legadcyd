/* --- CARRUSEL DE IMÁGENES --- */
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}vw)`;
  }
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => moveSlide(-1));
  nextBtn.addEventListener('click', () => moveSlide(1));
}

// Desplazamiento automático cada 5 segundos
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


/* --- INTERACCIÓN DE TARJETAS POR CLIC --- */
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


/* --- ANIMACIÓN EN SCROLL PARA LAS SECCIONES GENERALES --- */
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

/* --- EFECTO SPLIT TEXT EN EL HERO --- */
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.split-text-target');
  const containers = document.querySelectorAll('.hero-text-container, .vertical-text-container');

  let globalCharIndex = 0;

  targets.forEach(target => {
    const words = target.textContent.trim().split(' ');
    target.innerHTML = '';

    words.forEach(word => {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('split-word');

      word.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.classList.add('split-char');
        charSpan.textContent = char;
        
        charSpan.style.transitionDelay = `${globalCharIndex * 0.008}s`
        globalCharIndex++;

        wordSpan.appendChild(charSpan);
      });

      target.appendChild(wordSpan);
      target.appendChild(document.createTextNode(' '));
    });
  });

  // Observador para activar la animación en los contenedores
  if (containers.length > 0) {
    const splitObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.15
    });

    containers.forEach(container => splitObserver.observe(container));
  }
});

/* --- MANEJO DE BOTONES "SABER MÁS" DE SERVICIOS --- */
document.addEventListener('DOMContentLoaded', () => {
  const serviceButtons = document.querySelectorAll('.service-btn');
  const asuntoInput = document.getElementById('asunto');
  const mensajeTextarea = document.getElementById('mensajeForm');
  const contactoSection = document.getElementById('mensaje');

  const mensajesPredeterminados = {
    'Servicio 1': {
      asunto: 'Branding',
      mensaje: 'Hola equipo de Legadcy,\n\nMe gustaría empezar a crear mi legado y construir una identidad de marca única..."'
    },
    'Servicio 2': {
      asunto: 'Publicidad Impresa (PoP, Folletería clásica)',
      mensaje: 'Hola equipo de Legadcy,\n\nEstoy buscando los siguientes materiales impresos para impulsar mi legado..."'
    },
    'Servicio 3': {
      asunto: 'Publicidad Exterior (OOH)',
      mensaje: 'Hola equipo de Legadcy,\n\nQuiero que mi legado sea visto en grande. Me interesa cotizar opciones de publicidad exterior..."'
    },
    'Servicio 4': {
      asunto: 'Promocionales',
      mensaje: 'Hola equipo de Legadcy,\n\nEstoy buscando artículos promocionales creativos para dejar huella en mis clientes..."'
    },
    'Servicio 5': {
      asunto: 'Activaciones de marca',
      mensaje: 'Hola equipo de Legadcy,\n\nMe interesa conectar con mi público de forma única. Quiero cotizar una activación de marca..."'
    },
    'Servicio 6': {
      asunto: 'Creación de Páginas Web',
      mensaje: 'Hola equipo de Legadcy,\n\nQuiero llevar mi negocio al siguiente nivel digital con una nueva página web..."'
    }
  };

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const nombreServicio = btn.getAttribute('data-servicio');
      const datosPredeterminados = mensajesPredeterminados[nombreServicio];

      if (datosPredeterminados) {
        if (asuntoInput) asuntoInput.value = datosPredeterminados.asunto;
        if (mensajeTextarea) mensajeTextarea.value = datosPredeterminados.mensaje;
      }

      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});