let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');

};
 

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document
                  .querySelector(`header nav a[href*="#${id}"]`)
                  .classList.add('active');
            });
        }
    });

    // Sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);


    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('active');
};



ScrollReveal({ 
    // reset: true ,//
     distance: '80px',
     duration:2000,
     delay:200
 });
 
 ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
 ScrollReveal().reveal('.home-img, .skill-conteiner, .projects-box, .contact form ', { origin: 'bottom' });
 ScrollReveal().reveal('.home-content h1, .about-img ', { origin: 'left' });
 ScrollReveal().reveal('.home-content p, .about-content ', { origin: 'right' });
 





 (function () {
  // 1) Определи езика от <html lang="...">
  const lang = (document.documentElement.getAttribute('lang') || 'bg').toLowerCase();

  // 2) Думички за всеки език
  const STRINGS = {
    bg: ['От и до летище', 'Междуградски', 'Хотелски'],
    en: ['Airport transfers', 'Intercity', 'Hotel transfers'],
    ru: ['Трансферы в аэропорт', 'Междугородние', 'Отельные трансферы']
  };

  // 3) Избери набора според езика (fallback към BG)
  const words = STRINGS[lang] || STRINGS.bg;

  // 4) Стартирай Typed.js
  if (document.querySelector('.multiple-text')) {
    new Typed('.multiple-text', {
      strings: words,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    });
  }
})();



//модал//




(function(){
  const modal = document.getElementById('reservationModal');
  const openBtns = document.querySelectorAll('.skills-box .btn');

  // Отваряне на модала
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  // Затваряне (бутон или backdrop)
  modal.addEventListener('click', (e) => {
    if (e.target.dataset.close === 'true') closeModal();
  });

  // Затваряне с Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });

  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
})();



















  














(function(){
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('formToast');

  function showToast(msg, ok = true){
    if(!toast){ alert(msg); return; }
    toast.textContent = msg;
    toast.style.borderColor = ok ? 'rgba(123,247,85,.35)' : 'rgba(255,99,99,.35)';
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 4000);
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // Progressive enhancement: оставяме action/method за fallback без JS,
    // но тук ще изпратим чрез fetch, за да не напускаме страницата.
    e.preventDefault();

    // HTML5 валидация
    if (!form.reportValidity()) return;

    // Подгответе FormData (добавяме _replyto от полето email ако има)
    const fd = new FormData(form);
    if (form.email && form.email.value) fd.set('_replyto', form.email.value);

    const submitBtn = form.querySelector('button[type=\"submit\"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Изпращане…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showToast('Благодарим! Запитването е изпратено успешно. Ще се свържем с вас скоро.', true);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = Array.isArray(data?.errors) && data.errors.length
          ? data.errors.map(e => e.message).join(', ')
          : 'Възникна грешка при изпращането. Опитайте отново.';
        showToast(msg, false);
      }
    } catch (err) {
      showToast('Няма връзка или сървърна грешка. Опитайте по-късно.', false);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || 'Изпрати запитване';
      }
    }
  });
})();

  