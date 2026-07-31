/* --- HELPER PARA SANITIZACIÓN / SEGURIDAD XSS Y VALIDACIÓN --- */
function sanitizeInput(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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

/* --- FORMULARIO CON VALIDACIÓN, SEGURIDAD Y ANIMACIÓN DE CARTA --- */
const form = document.getElementById('contactForm');
const bigEnvelopeCard = document.getElementById('bigEnvelopeCard');

if (form && bigEnvelopeCard) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Verificación Honeypot (si un bot llenó el campo oculto, cancelamos silenciosamente)
    const gotcha = document.getElementById('_gotcha');
    if (gotcha && gotcha.value !== '') {
      return; 
    }

    // 2. Validación y Limpieza en el cliente
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const asuntoInput = document.getElementById('asunto');
    const mensajeInput = document.getElementById('mensajeForm');

    const nombre = nombreInput ? nombreInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const asunto = asuntoInput ? asuntoInput.value.trim() : '';
    const mensaje = mensajeInput ? mensajeInput.value.trim() : '';

    if (!nombre || !email || !asunto || !mensaje) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    // 3. Animación del sobre
    bigEnvelopeCard.classList.add('closing');

    setTimeout(() => {
      bigEnvelopeCard.classList.add('flying');
    }, 600);

    // 4. Envío de datos de forma segura
    const formData = new FormData(form);

    fetch('https://formspree.io/f/xqerolvy', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        setTimeout(() => {
          alert('¡Mensaje enviado con éxito! Te responderemos muy pronto.');
          form.reset();
          bigEnvelopeCard.classList.remove('closing', 'flying');
        }, 1800);
      } else {
        alert('Hubo un problema al enviar el mensaje. Inténtalo nuevamente.');
        bigEnvelopeCard.classList.remove('closing', 'flying');
      }
    }).catch(error => {
      alert('Error de conexión. Inténtalo de nuevo.');
      bigEnvelopeCard.classList.remove('closing', 'flying');
    });
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
    'Branding': {
      asunto: 'Branding',
      mensaje: 'Hola equipo de Legadcy,\n\nMe gustaría empezar a crear mi legado y construir una identidad de marca única...'
    },
    'Publicidad Impresa': {
      asunto: 'Publicidad Impresa (PoP, Folletería clásica)',
      mensaje: 'Hola equipo de Legadcy,\n\nEstoy buscando los siguientes materiales impresos para impulsar mi legado...'
    },
    'Publicidad Exterior': {
      asunto: 'Publicidad Exterior (OOH)',
      mensaje: 'Hola equipo de Legadcy,\n\nQuiero que mi legado sea visto en grande. Me interesa cotizar opciones de publicidad exterior...'
    },
    'Promocionales': {
      asunto: 'Promocionales',
      mensaje: 'Hola equipo de Legadcy,\n\nEstoy buscando artículos promocionales creativos para dejar huella en mis clientes...'
    },
    'Activaciones de marca': {
      asunto: 'Activaciones de marca',
      mensaje: 'Hola equipo de Legadcy,\n\nMe interesa conectar con mi público de forma única. Quiero cotizar una activación de marca...'
    },
    'Creación de Páginas Web': {
      asunto: 'Creación de Páginas Web',
      mensaje: 'Hola equipo de Legadcy,\n\nQuiero llevar mi negocio al siguiente nivel digital con una nueva página web...'
    }
  };

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const nombreServicio = btn.getAttribute('data-servicio');
      const datosPredeterminados = mensajesPredeterminados[nombreServicio];

      if (datosPredeterminados) {
        if (asuntoInput) asuntoInput.value = sanitizeInput(datosPredeterminados.asunto);
        if (mensajeTextarea) mensajeTextarea.value = sanitizeInput(datosPredeterminados.mensaje);
      }

      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

/* --- MODAL PANTALLA COMPLETA CON NAVEGACIÓN MANUAL DE CARRUSEL --- */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeModalBtn = document.getElementById('closeModal');
  const modalPrevBtn = document.getElementById('modalPrevBtn');
  const modalNextBtn = document.getElementById('modalNextBtn');
  const carouselImages = document.querySelectorAll('.carousel-slide img');

  let modalIndex = 0;

  if (modal && modalImg && carouselImages.length > 0) {
    
    const updateModalImage = (index) => {
      if (index >= carouselImages.length) {
        modalIndex = 0;
      } else if (index < 0) {
        modalIndex = carouselImages.length - 1;
      } else {
        modalIndex = index;
      }
      modalImg.src = carouselImages[modalIndex].src;
      modalImg.alt = carouselImages[modalIndex].alt || 'Imagen ampliada';
    };

    carouselImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        updateModalImage(index);
        modal.classList.add('show');
      });
    });

    if (modalPrevBtn) {
      modalPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateModalImage(modalIndex - 1);
      });
    }

    if (modalNextBtn) {
      modalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateModalImage(modalIndex + 1);
      });
    }

    const closeModal = () => {
      modal.classList.remove('show');
    };

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('show')) return;

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        updateModalImage(modalIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateModalImage(modalIndex + 1);
      }
    });
  }
});

/* --- GESTOS TÁCTILES (SWIPE) PARA MÓVILES --- */
document.addEventListener('DOMContentLoaded', () => {

  const mainCarousel = document.querySelector('.carousel-container');
  let startXMain = 0;
  let endXMain = 0;

  if (mainCarousel) {
    mainCarousel.addEventListener('touchstart', (e) => {
      startXMain = e.changedTouches[0].screenX;
    }, { passive: true });

    mainCarousel.addEventListener('touchend', (e) => {
      endXMain = e.changedTouches[0].screenX;
      handleMainSwipe();
    }, { passive: true });

    function handleMainSwipe() {
      const diffX = startXMain - endXMain;
      const minSwipeDistance = 40;

      if (Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
          moveSlide(1);
        } else {
          moveSlide(-1);
        }
      }
    }
  }

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  let startXModal = 0;
  let endXModal = 0;

  if (modal && modalImg) {
    modal.addEventListener('touchstart', (e) => {
      startXModal = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      endXModal = e.changedTouches[0].screenX;
      handleModalSwipe();
    }, { passive: true });

    function handleModalSwipe() {
      if (!modal.classList.contains('show')) return;

      const diffX = startXModal - endXModal;
      const minSwipeDistance = 40;

      if (Math.abs(diffX) > minSwipeDistance) {
        const modalNextBtn = document.getElementById('modalNextBtn');
        const modalPrevBtn = document.getElementById('modalPrevBtn');

        if (diffX > 0 && modalNextBtn) {
          modalNextBtn.click();
        } else if (diffX < 0 && modalPrevBtn) {
          modalPrevBtn.click();
        }
      }
    }
  }

});