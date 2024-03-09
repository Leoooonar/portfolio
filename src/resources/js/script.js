document.addEventListener('DOMContentLoaded', function() {
    var videos = [
        { src: '../resources/videos/firstVideo.mp4', desc: 'Description pour la vidéo 1.' },
        { src: '../resources/videos/secondVideo.mp4', desc: 'Description pour la vidéo 2.' },
        // ... autres vidéos
    ];
    
    var currentVideo = 0;
    var videoPlayer = document.getElementById('videoPlayer');
    var videoDesc = document.getElementById('videoDesc');
    
    function changeVideo(index) {
        // Animer la vidéo existante pour disparaître
        videoPlayer.classList.add('fade-out');

        setTimeout(function() {
            // Mettre à jour la vidéo après que l'animation de fondu soit terminée
            currentVideo = index;
            videoPlayer.src = videos[currentVideo].src;
            videoDesc.textContent = videos[currentVideo].desc;
            videoPlayer.load();
            
            // Enlever la classe 'fade-out' pour que la nouvelle vidéo apparaisse
            videoPlayer.classList.remove('fade-out');
            videoPlayer.play();
        }, 500); // Correspond à la durée de l'animation CSS
    }
    
    // Boutons de navigation pour les vidéos
    document.querySelector('.prev-arrow').addEventListener('click', function() {
        var newIndex = currentVideo > 0 ? currentVideo - 1 : videos.length - 1;
        changeVideo(newIndex);
    });
    
    document.querySelector('.next-arrow').addEventListener('click', function() {
        var newIndex = currentVideo < videos.length - 1 ? currentVideo + 1 : 0;
        changeVideo(newIndex);
    });

    // Intersection Observer pour les images
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Vérifie si l'élément est visible
            if (entry.isIntersecting) {
                // Ajoute la classe pour l'animation
                entry.target.classList.add('image-slide-up');
                // Après l'animation, vous pouvez choisir de ne plus observer l'élément
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // par défaut, le root est le viewport
        rootMargin: '1000px',
        threshold: 0 // déclenche l'animation lorsque 0% de l'élément est visible
    });

    // Cible toutes les images que vous souhaitez animer
    const images = document.querySelectorAll('.animatable-image'); // Assurez-vous que vos images ont cette classe
    images.forEach(image => {
        observer.observe(image);
    });
});
