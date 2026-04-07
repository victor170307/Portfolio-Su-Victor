/* ═══════════════════════════════════════════════
   PORTFOLIO SU VICTOR — java.js
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Références DOM ── */
  const scene     = document.getElementById('scene');
  const film      = document.getElementById('film');
  const carImg    = document.getElementById('carImg');
  const cardTitle = document.getElementById('cardTitle');
  const statusTxt = document.getElementById('statusText');
  const rpm       = document.getElementById('rpm');
  const hudStatus = document.getElementById('hudStatus');
  const hudTime   = document.getElementById('hudTime');
  const powerBtn  = document.getElementById('powerBtn');
  const engineBtn = document.getElementById('engineBtn');
  const skipBtn   = document.getElementById('skipBtn');
  const portfolio = document.getElementById('portfolio');

  /* ── État ── */
  let powered = false;
  let gone    = false;

  /* ── Horloge HUD ── */
  function updateClock() {
    const d  = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    hudTime.textContent = hh + ':' + mm;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ── Fonctions utilitaires ── */

  /** Fait défiler jusqu'à une section par son id */
  window.scrollTo = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /** Anime les barres de compétences à l'entrée dans le viewport */
  function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            // La largeur cible est déjà dans style.width via l'HTML inline
            // On force d'abord 0, puis on remet la valeur d'origine
            const target = bar.style.width;
            bar.style.width = '0%';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                bar.style.width = target;
              });
            });
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach((bar) => observer.observe(bar));
  }

  /* ── Révéler le portfolio ── */
  function revealPortfolio() {
    if (gone) return;
    gone = true;

    scene.classList.add('drive');

    setTimeout(function () {
      scene.classList.add('gone');
      document.body.classList.add('active');
      portfolio.removeAttribute('aria-hidden');
      window.history.replaceState(null, '', window.location.href);
      // Remonter en haut de la page
      document.documentElement.scrollTop = 0;
      // Lancer l'animation des barres de compétences
      animateSkillBars();
    }, 1400);
  }

  /* ── Bouton ALLUMER ── */
  powerBtn.addEventListener('click', function () {
    if (powered) return;
    powered = true;

    powerBtn.disabled = true;
    hudStatus.textContent = 'CONTACT ALLUMÉ';

    // Changer l'image pour la voiture feux allumés
    carImg.src = 'img/1111111111111111111111111111111111111111111.jpg';
    film.classList.add('powered');

    // Mise à jour de la carte
    cardTitle.textContent = 'Contact allumé';
    cardTitle.classList.add('glitch');
    setTimeout(() => cardTitle.classList.remove('glitch'), 400);

    statusTxt.textContent = 'Électronique active. Moteur prêt à démarrer.';
    rpm.style.width = '35%';

    engineBtn.disabled = false;
  });

  /* ── Bouton DÉMARRER ── */
  engineBtn.addEventListener('click', function () {
    if (!powered || gone) return;

    engineBtn.disabled = true;
    skipBtn.disabled   = true;

    hudStatus.textContent = 'DÉMARRAGE...';
    statusTxt.textContent = 'Vroum ! Départ imminent...';

    /* Montée progressive du régime */
    let value = 35;
    const interval = setInterval(function () {
      value = Math.min(value + 7, 100);
      rpm.style.width = value + '%';
      if (value >= 100) {
        clearInterval(interval);
        revealPortfolio();
      }
    }, 85);
  });

  /* ── Bouton SKIP ── */
  skipBtn.addEventListener('click', function () {
    revealPortfolio();
  });

})();
