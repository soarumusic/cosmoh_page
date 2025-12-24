/**
 * navigation.js - Side Dot Navigation & Scroll Spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initSideNav();
  initLanguageSelector();
});

function initSideNav() {
  const dots = document.querySelectorAll('.nav-dot');
  const sections = document.querySelectorAll('section');

  // 1. Click to Scroll
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 2. Scroll Spy (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to corresponding dot
        const activeDot = document.querySelector(`.nav-dot[data-target="${id}"]`);
        if (activeDot) {
          activeDot.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

function initLanguageSelector() {
  const selector = document.getElementById('languageSelect');
  const flagImg = document.getElementById('currentFlag');

  if (selector && flagImg) {
    selector.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const flagSrc = selectedOption.getAttribute('data-flag');
      if (flagSrc) {
        flagImg.src = flagSrc;
      }

      // Update body class for language specific styles (fonts etc)
      document.body.classList.remove('lang-ko', 'lang-en', 'lang-ja');
      document.body.classList.add(`lang-${e.target.value}`);
    });
  }
}