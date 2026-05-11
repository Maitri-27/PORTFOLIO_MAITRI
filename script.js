const links = document.querySelectorAll('.site-nav a');
const pageSections = document.querySelectorAll('.page-section');

function showSection(id) {
  pageSections.forEach((section) => {
    section.classList.toggle('active', section.id === id);
  });
}

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      event.preventDefault();
      showSection(targetId);
      window.location.hash = targetId;
    }
  });
});

window.addEventListener('load', () => {
  const hash = window.location.hash.slice(1);
  const validSection = Array.from(pageSections).some((section) => section.id === hash);
  showSection(validSection ? hash : 'home');
});
