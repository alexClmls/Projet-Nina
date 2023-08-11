
let currentImageIndex = 0;
let galleryImages = [];

function createGalleryImage(tag, src, alt) {
  const itemColumn = document.createElement('div');
  itemColumn.classList.add('item-column', 'mb-4', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-4');

  const img = document.createElement('img');
  img.dataset[tag] = '';
  img.classList.add('gallery-item', 'img-fluid', 'active');
  img.src = src;
  img.alt = alt;

  itemColumn.appendChild(img);
  return itemColumn;
}

// Récupérer le conteneur de la galerie
const galleryContainer = document.querySelector('.gallery-items-row');

const imagesData = [
  { tag: 'concert', src: './assets/images/gallery/concerts/aaron-paul-wnX-fXzB6Cw-unsplash.webp', alt: 'aaron paul' },
  { tag: 'entreprises', src: './assets/images/gallery/entreprise/ali-morshedlou-WMD64tMfc4k-unsplash.webp', alt: 'ali morshedlou' },
  { tag: 'entreprises', src: './assets/images/gallery/entreprise/jason-goodman-tHO1_OuKbg0-unsplash.webp', alt: 'jason goodman' },
  { tag: 'mariages', src: './assets/images/gallery/mariage/hannah-busing-RvF2R_qMpRk-unsplash.webp', alt: 'hannah busing' },
  { tag: 'portrait', src: './assets/images/gallery/portraits/ade-tunji-rVkhWWZFAtQ-unsplash.webp', alt: 'ade tunji' },
  { tag: 'mariages', src: './assets/images/gallery/mariage/jakob-owens-SiniLJkXhMc-unsplash.webp', alt: 'jakob owens' },
  { tag: 'portrait', src: './assets/images/gallery/portraits/nino-van-prattenburg--443cl1uR_8-unsplash.webp', alt: 'nino van prattenburg' },
  { tag: 'concert', src: './assets/images/gallery/concerts/austin-neill-hgO1wFPXl3I-unsplash.webp', alt: 'austin neill' },
  { tag: 'entreprises', src: './assets/images/gallery/entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash.webp', alt: 'mateus campos' },
];

imagesData.forEach(imageData => {
  const image = createGalleryImage(imageData.tag, imageData.src, imageData.alt);
  galleryContainer.appendChild(image);

  const imgElement = image.querySelector('img');
  imgElement.addEventListener('click', function () {
    openLightbox(this);
  });

  galleryImages.push(imgElement);
});
let filters = document.querySelectorAll("#filters li");

for (let filter of filters) {
  filter.addEventListener("click", function () {
    let tag = this.id;
    let images = document.querySelectorAll("#gallery img");
    galleryImages = [];

    if (document.querySelector('#filters .active') !== null) {
      document.querySelector('#filters .active').classList.remove('active');
    }

    this.classList.add('active');

    for (let image of images) {
      image.parentElement.style.display = 'none';

      if (tag === 'tous' || image.dataset[tag] !== undefined) {
        image.parentElement.style.display = 'block';
        galleryImages.push(image);
        
      }
    }
  });
}


// Fonction pour ouvrir la lightbox
function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const modalBody = document.querySelector('.modal-body');
  modalBody.style.display = 'block';

  lightboxImg.src = img.src;
  lightbox.style.display = 'block';

  currentImageIndex = galleryImages.indexOf(img);
}

// Gestion des événements pour les flèches de navigation
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

prevBtn.addEventListener('click', function () {
  changeImage(-1);
});
nextBtn.addEventListener('click', function () {
  changeImage(1);
});

// Fonction pour changer l'image dans la lightbox
function changeImage(direction) {

  currentImageIndex += direction;
  let lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.alt = "Contenu de l'image affichée dans la modale au clic";


  if (currentImageIndex < 0) {
    
    currentImageIndex = galleryImages.length - 1;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  
  } else if (currentImageIndex >= galleryImages.length) {
    
    currentImageIndex = 0;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  
  } else {
    lightboxImg.src = galleryImages[currentImageIndex].src;
  }

}

// Fonction pour fermer la lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const modalBody = document.querySelector('.modal-body');

  modalBody.style.display = 'none'; // Hide the modal body
  lightbox.style.display = 'none';
}

// Gestion des événements pour la fermeture de la lightbox en cliquant en dehors de l'image
const lightbox = document.getElementById('lightbox');
lightbox.addEventListener('click', function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

