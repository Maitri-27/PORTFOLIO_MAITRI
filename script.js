// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main > section');

const setActiveSection = sectionId => {
  sections.forEach(section => {
    section.classList.toggle('active', section.id === sectionId);
  });

  navLinks.forEach(link => {
    const target = link.dataset.section;
    link.classList.toggle('active', target === sectionId);
  });
};

const showSection = sectionId => {
  const validId = document.getElementById(sectionId) ? sectionId : 'home';
  setActiveSection(validId);
  if (window.history.replaceState) {
    window.history.replaceState(null, '', `#${validId}`);
  } else {
    window.location.hash = validId;
  }
};

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const sectionId = link.dataset.section;
      showSection(sectionId);
      navMenu.classList.remove('active');
    });
  });
}

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) showSection(hash);
});

const initialHash = window.location.hash.replace('#', '');
showSection(initialHash || 'home');

// Contact form feedback with Formspree
const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (contactMessage) {
          contactMessage.textContent = 'Thank you! Your message has been sent successfully. I will follow up soon.';
          contactMessage.style.color = '#38bdf8';
        }
        contactForm.reset();
      } else {
        if (contactMessage) {
          contactMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
          contactMessage.style.color = '#ef4444';
        }
      }
    } catch (error) {
      if (contactMessage) {
        contactMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
        contactMessage.style.color = '#ef4444';
      }
    } finally {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}

// Certifications Carousel
const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.getElementById('carouselDots');
const certificationItems = document.querySelectorAll('.certification-item');

if (carouselTrack && certificationItems.length > 0) {
  let currentIndex = 0;
  const totalItems = certificationItems.length;
  const maxIndex = totalItems - 1;

  // Create dots
  for (let i = 0; i < totalItems; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    carouselDots.appendChild(dot);
  }

  const dots = document.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    const translateX = -(currentIndex * 100);
    carouselTrack.style.transform = `translateX(${translateX}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Update button states
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex === maxIndex;
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    // Don't allow going beyond bounds
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    updateCarousel();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        goToSlide(currentIndex + 1);
      }
    });
  }

  // Touch/Swipe support
  let startX = 0;
  let isDragging = false;

  carouselTrack.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    isDragging = true;
  });

  carouselTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = startX - e.pageX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < maxIndex) {
        goToSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
      isDragging = false;
    }
  });

  carouselTrack.addEventListener('mouseup', () => {
    isDragging = false;
  });

  carouselTrack.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Touch events for mobile
  carouselTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    isDragging = true;
  });

  carouselTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].pageX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < maxIndex) {
        goToSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
      isDragging = false;
    }
  });

  carouselTrack.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Initialize button states
  updateCarousel();
}
