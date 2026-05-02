document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const enterScreen = document.getElementById('enter-screen');
    const intro = document.getElementById('intro-video');
    const bgVideo = document.getElementById('bg-video');
    const content = document.getElementById('content');

    startBtn.addEventListener('click', () => {
        // Disparition de l'écran noir de départ
        enterScreen.style.opacity = "0";
        setTimeout(() => enterScreen.style.display = "none", 500);

        // Apparition et lecture de l'intro
        intro.style.opacity = "1";
        intro.play();
    });

    let isTransitionDone = false; // Verrou pour éviter que l'animation se lance deux fois

  function transitionToPortfolio() { //transition vers le portfolio 
        if (isTransitionDone) return;
        isTransitionDone = true;
        
    
        intro.style.opacity = "0";
        
        if (bgVideo) {
            bgVideo.play().catch(err => console.log("Lecture fond bloquée :", err));
            bgVideo.classList.add('bg-visible');
        }
      
        setTimeout(() => {
            intro.style.display = "none"; 
            
            // On affiche le contenu (nom, projets, etc.)
            content.classList.remove('hidden');
            content.classList.add('visible'); 
            
            // On permet enfin de scroller
            document.body.classList.remove('locked');
        }, 2000); 
    }

    intro.addEventListener('ended', transitionToPortfolio);
    intro.addEventListener('timeupdate', () => {
        if (intro.currentTime >= (intro.duration - 0.1)) {
            transitionToPortfolio();
        }
    });
});