// ============================================
// VIVA DRIVING SCHOOL GB — SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Hero parallax (subtle, scroll-based) ----
  var heroImg = document.getElementById('heroImg');
  var hero = document.getElementById('hero');

  if (heroImg && hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          var heroHeight = hero.offsetHeight;

          if (scrollY < heroHeight) {
            var offset = scrollY * 0.25;
            heroImg.style.transform = 'scale(1.08) translateY(' + offset + 'px)';
          }

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ---- Contact form (static-site friendly, no backend) ----
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (form && formNote) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var message = form.querySelector('#message').value.trim();

      if (!name || !phone) {
        formNote.style.color = '#e0263b';
        formNote.textContent = 'Please fill in your name and phone number.';
        return;
      }

      // Build a WhatsApp message as a simple, backend-free fallback
      var text = 'Hi VIVA Driving School, my name is ' + name +
        '. Phone: ' + phone +
        (message ? '. Message: ' + message : '') +
        '.';

      var waUrl = 'https://wa.me/4479XXXXXXXX?text=' + encodeURIComponent(text);

      formNote.style.color = '#3aa66b';
      formNote.textContent = 'Thanks! Opening WhatsApp to send your enquiry...';

      window.open(waUrl, '_blank', 'noopener');
      form.reset();
    });
  }

});
