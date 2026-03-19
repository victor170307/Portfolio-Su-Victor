const scene = document.getElementById('scene');
const statusText = document.getElementById('statusText');
const powerBtn = document.getElementById('powerBtn');
const engineBtn = document.getElementById('engineBtn');
const skipBtn = document.getElementById('skipBtn');
const portfolio = document.getElementById('portfolio');
const exteriorImage = document.getElementById('exteriorImage');

if (scene && statusText && powerBtn && engineBtn && skipBtn && portfolio && exteriorImage) {
  let carPowered = false;
  let portfolioVisible = false;

  const revealPortfolio = (hideDelay = 0) => {
    if (portfolioVisible) {
      return;
    }

    portfolioVisible = true;
    document.body.classList.add('portfolio-active');
    portfolio.setAttribute('aria-hidden', 'false');

    window.setTimeout(() => {
      scene.style.display = 'none';
    }, hideDelay);
  };

  powerBtn.addEventListener('click', () => {
    if (carPowered) {
      return;
    }

    carPowered = true;
    powerBtn.disabled = true;
    exteriorImage.src = 'img/1111111111111111111111111111111111111111111.jpg';
    scene.classList.add('is-cockpit');
    engineBtn.disabled = false;
    statusText.textContent = 'Contact allume. Image active. Tu peux demarrer.';
  });

  engineBtn.addEventListener('click', () => {
    if (!carPowered || portfolioVisible) {
      return;
    }

    engineBtn.disabled = true;
    skipBtn.disabled = true;
    statusText.textContent = 'Vroum ! Depart imminent...';

    scene.classList.add('drive-forward');

    window.setTimeout(() => {
      revealPortfolio(0);
    }, 1200);
  });

  skipBtn.addEventListener('click', () => {
    if (portfolioVisible) {
      return;
    }

    statusText.textContent = 'Portfolio ouvert.';
    revealPortfolio(0);
  });
}
