document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const enterScreen = document.getElementById('enter-screen');
    const intro = document.getElementById('intro-video');
    const bgVideo = document.getElementById('bg-video');
    const content = document.getElementById('content');
    
    // --- NOUVEAUX ÉLÉMENTS POUR LE CERCLE MAGIQUE ---
    const transitionVideo = document.getElementById('transition-video');
    const skillsLink = document.querySelector('a[href="#skills"]');
    let hasSeenSkillsAnimation = false; // Flag pour ne le jouer qu'une fois

    startBtn.addEventListener('click', () => {
        enterScreen.style.opacity = "0";
        setTimeout(() => enterScreen.style.display = "none", 500);

        intro.style.opacity = "1";
        intro.play();
    });

    let isTransitionDone = false; 

    function transitionToPortfolio() { 
        if (isTransitionDone) return;
        isTransitionDone = true;
        
        intro.style.opacity = "0";
        
        if (bgVideo) {
            bgVideo.play().catch(err => console.log("Lecture fond bloquée :", err));
            bgVideo.classList.add('bg-visible');
        }
      
        setTimeout(() => {
            intro.style.display = "none"; 
            content.classList.remove('hidden');
            content.classList.add('visible'); 
            document.body.classList.remove('locked');
        }, 2000); 
    }
    
    intro.addEventListener('ended', transitionToPortfolio);
    intro.addEventListener('timeupdate', () => {
        if (intro.currentTime >= (intro.duration - 0.1)) {
            transitionToPortfolio();
        }
    });

    // --- LOGIQUE DU CERCLE MAGIQUE (COMPÉTENCES) ---
    if (skillsLink && transitionVideo) {
        skillsLink.addEventListener('click', (e) => {
            // Si l'animation a déjà été vue, on laisse le lien fonctionner normalement
            if (hasSeenSkillsAnimation) return;

            e.preventDefault(); // On stoppe le scroll immédiat

            // On prépare et on joue la vidéo cercle_2.mp4
            transitionVideo.classList.remove('hidden');
            transitionVideo.classList.add('active');
            transitionVideo.currentTime = 0;
            transitionVideo.play();

            // Une fois que l'onde de choc est finie (fin de la vidéo)
            transitionVideo.onended = () => {
                transitionVideo.classList.remove('active'); // Retrait de l'opacité
                setTimeout(() => transitionVideo.classList.add('hidden'), 500); // Cache la vidéo

                hasSeenSkillsAnimation = true; // On active le verrou

                // Scroll fluide vers la section maintenant qu'elle est "invoquée"
                document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
            };
        });
    }
});