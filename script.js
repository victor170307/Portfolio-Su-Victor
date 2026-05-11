document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const enterScreen = document.getElementById('enter-screen');
    const intro = document.getElementById('intro-video');
    const bgVideo = document.getElementById('bg-video');
    const content = document.getElementById('content');
    const transitionVideo = document.getElementById('transition-video');
    const navLinks = document.querySelectorAll('.menu-links a'); 
    
    let hasSeenTransitionAnimation = false; 

    // --- 1. L'ÉCRAN D'ACCUEIL ET L'INTRO ---
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
        if (intro.currentTime >= (intro.duration - 0.1) && !isTransitionDone) {
            transitionToPortfolio();
        }
    });

    // --- 2. LA NAVIGATION AVEC LE CERCLE MAGIQUE ---
    if (navLinks.length > 0 && transitionVideo) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 

                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    
                    if (hasSeenTransitionAnimation) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                        return; 
                    }

                    transitionVideo.classList.remove('hidden');
                    transitionVideo.classList.add('active'); 
                    transitionVideo.currentTime = 0;
                    transitionVideo.play();

                    transitionVideo.onended = () => {
                        if (bgVideo) {
                            bgVideo.src = 'video/bulle-loop.mp4';
                            bgVideo.load();
                            bgVideo.play();
                        }

                        transitionVideo.classList.remove('active'); 
                        setTimeout(() => transitionVideo.classList.add('hidden'), 500); 

                        hasSeenTransitionAnimation = true;
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    };
                }
            });
        });
    }

   
    const projectData = {
        dame: {
            title: "Jeu de Dame",
            description: "Création d'un jeu de dames entièrement fonctionnel, développé en Java avec Swing. Le projet intègre l'implémentation complète des règles du jeu et un système de notation des coups.",
            link: "https://github.com/Arlequin7zz/Jeu-De-Dame.git"
        },
        gamjam: {
            title: "Game Jam",
            description: "Création d'un jeu de survie en équipe lors d'une Game Jam. Développé en JavaScript, le jeu intègre un système de score arcade et exploite le thème 'Nothing is Safe', où chaque élément de l'environnement peut devenir une menace.",
            link: "https://github.com/ULTRASLAAN/Game-Jam.git"
        },
        portfolio_client: {
            title: "Portfolio",
            description: "Développement front-end (HTML/CSS/JS) d'un portfolio sur mesure, incluant la création de la charte graphique et l'optimisation responsive pour une navigation fluide sur tous les supports.",
            link: "https://victor170307.github.io/Portfolio-CHIS-BIANCA" 
        }
    };

    // B. Sélection des éléments HTML
    const projectCards = document.querySelectorAll('.project-card');
    const projectOverlay = document.getElementById('project-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayDescription = document.getElementById('overlay-description');
    const overlayLink = document.getElementById('overlay-link');
    const closeOverlayBtn = document.querySelector('.close-overlay');

    if (projectOverlay && closeOverlayBtn) {
        
        // C. Quand on clique sur une carte
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                const data = projectData[projectId]; // Cherche les infos dans la liste au-dessus

                // Si les infos existent, on ouvre la boîte
                if (data) {
                    overlayTitle.textContent = data.title;
                    overlayDescription.textContent = data.description;
                    overlayLink.href = data.link;

                    projectOverlay.classList.remove('hidden');
                    projectOverlay.classList.add('overlay-visible');
                    document.body.classList.add('locked');
                }
            });
        });

        // D. Fonction pour fermer la boîte
        const closeOverlay = () => {
            projectOverlay.classList.remove('overlay-visible');
            setTimeout(() => projectOverlay.classList.add('hidden'), 500); 
            document.body.classList.remove('locked');
        };

        // E. Événements pour fermer (clic sur la croix ou en dehors)
        closeOverlayBtn.addEventListener('click', closeOverlay);

        projectOverlay.addEventListener('click', (e) => {
            if (e.target === projectOverlay) { 
                closeOverlay();
            }
        });
    }
});