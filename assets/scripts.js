let filters = document.querySelectorAll("#filters li");

for(let filter of filters) {
    filter.addEventListener("click", function(){
        let tag = this.id;
        let images = document.querySelectorAll("#gallery img");

        if (document.querySelector('#filters .active') !== null) {
        document.querySelector('#filters .active').classList.remove('active');
        
        this.className = "nav-item active";
        }

        for(let image of images){
            image.onclick = "openModal(this)";
            image.classList.replace("active", "inactive");
            image.parentElement.style.display = "none";

            if (tag in image.dataset || tag === "tous"){
                image.classList.replace("inactive", "active");
                image.parentElement.style.display = "block";
            }
        }
    });
}
// Fonction pour ouvrir la lightbox
function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  lightboxImg.src = img.src;
  lightbox.style.display = 'block';
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

// Attacher un gestionnaire d'événements à chaque image dans la galerie
const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach(img => {
  img.addEventListener('click', function(event) {
    openLightbox(this);
  });
});

// Gestion des événements pour le bouton de fermeture
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', closeLightbox);

// Gestion des événements pour la fermeture de la lightbox en cliquant en dehors de l'image
const lightbox = document.getElementById('lightbox');
lightbox.addEventListener('click', function(event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Gestion des événements pour les flèches de navigation
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
prevBtn.addEventListener('click', function() {
  changeImage(-1);
});
nextBtn.addEventListener('click', function() {
  changeImage(1);
});

// Fonction pour changer l'image dans la lightbox
let currentImageIndex = 0;
function changeImage(direction) {
  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  } else if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }

  const lightboxImg = document.getElementById('lightboxImg');
  const caption = document.getElementById('caption');

  lightboxImg.src = galleryImages[currentImageIndex].src;
  caption.textContent = galleryImages[currentImageIndex].alt;
}