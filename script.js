document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const enterScreen = document.getElementById('enter-screen');
    const intro = document.getElementById('intro-video');
    const bgVideo = document.getElementById('bg-video');
    const content = document.getElementById('content');

    // 1. Action quand l'utilisateur clique sur le bouton "DÉCOUVRIR"
    startBtn.addEventListener('click', () => {
        // Disparition de l'écran noir de départ
        enterScreen.style.opacity = "0";
        setTimeout(() => enterScreen.style.display = "none", 500);

        // Apparition et lecture de l'intro
        intro.style.opacity = "1";
        intro.play();
    });

    let isTransitionDone = false; // Verrou pour éviter que l'animation se lance deux fois

    // 2. La fonction qui fait la transition Intro -> Portfolio
  function transitionToPortfolio() {
        if (isTransitionDone) return;
        isTransitionDone = true;
        
        // 1. On lance le fondu de sortie de l'intro
        intro.style.opacity = "0";
        
        // 2. On fait apparaître Coco doucement en arrière-plan
        if (bgVideo) {
            bgVideo.play().catch(err => console.log("Lecture fond bloquée :", err));
            bgVideo.classList.add('bg-visible');
        }
        
        // 3. LE CONSEIL : On attend un peu plus avant de montrer le texte
        // Ici, on attend 1.5 seconde (1500ms) pour que l'intro ait bien disparu
        setTimeout(() => {
            intro.style.display = "none"; 
            
            // On affiche le contenu (nom, projets, etc.)
            content.classList.remove('hidden');
            content.classList.add('visible'); 
            
            // On permet enfin de scroller
            document.body.classList.remove('locked');
        }, 2000); 
    }

    // 3. On détecte la fin de l'intro pour lancer la transition
    intro.addEventListener('ended', transitionToPortfolio);

    // Sécurité : si la vidéo reste bloquée à la toute dernière image
    intro.addEventListener('timeupdate', () => {
        if (intro.currentTime >= (intro.duration - 0.1)) {
            transitionToPortfolio();
        }
    });
});