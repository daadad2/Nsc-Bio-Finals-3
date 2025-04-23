document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  const loadingBar = document.querySelector('.loading-progress');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    loadingBar.style.width = Math.min(progress, 100) + '%';
    loadingScreen.style.display = 'none';

    document.getElementById('loading-sound').pause();
    if (progress >= 100) {
      clearInterval(interval);
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.remove();
        initPage();
      }, 300);
    }
  }, 30);
});

function initPage() {
  const navLinks = document.querySelectorAll('nav a');
  const pages = document.querySelectorAll('.page');
  const pageSound = document.getElementById('pageSound');
  const bgOverlay = document.querySelector('.page-bg-overlay');

  document.querySelector('header').style.zIndex = '1000';

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      pageSound.currentTime = 0;
      pageSound.play().catch(e => console.log('Sound play prevented:', e));

      navLinks.forEach(navLink => navLink.classList.remove('active'));
      pages.forEach(page => page.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(this.getAttribute('data-page')).classList.add('active');
      
      const page = this.getAttribute('data-page');
      const bgImages = {
        home: 'images/bg-1.png',
        paleozoic: 'images/paleo.webp',
        mesozoic: 'images/822f8fb9811d9b71fa4c167a76de683f.jpg',
        cenozoic: 'images/bg-2.png',
        team: 'images/bg-4.png',
        members: 'images/team.jpg',
        references: 'images/thumb-1920-735747.png',
        documentation: 'images/teama.webp'
      };
      
      bgOverlay.style.opacity = '0';
      setTimeout(() => {
        bgOverlay.style.backgroundImage = `url('${bgImages[page]}')`;
        bgOverlay.style.opacity = page === 'members' ? '0.15' : '0.1';
      }, 300);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const eraButtons = document.querySelectorAll('.btn-gem');
  eraButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          const era = this.getAttribute('data-era');
          
          pageSound.currentTime = 0;
          pageSound.play().catch(e => console.log('Sound play prevented:', e));
          
          navLinks.forEach(navLink => navLink.classList.remove('active'));
          pages.forEach(page => page.classList.remove('active'));
          
          const eraLink = document.querySelector(`nav a[data-page="${era}"]`);
          if (eraLink) {
              eraLink.classList.add('active');
          }
          
          document.getElementById(era).classList.add('active');
          
          const bgImages = {
              paleozoic: 'images/paleo.jpg',
              mesozoic: 'images/meso.jpg',
              cenozoic: 'images/ceno.jpg'
          };
          
          bgOverlay.style.opacity = '0';
          setTimeout(() => {
              bgOverlay.style.backgroundImage = `url('${bgImages[era]}')`;
              bgOverlay.style.opacity = '0.1';
          }, 300);
          
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  });
  
  const timelineEras = document.querySelectorAll('.era');
  timelineEras.forEach(era => {
    era.addEventListener('click', function() {
      const eraId = this.classList[1];
      
      pageSound.currentTime = 0;
      pageSound.play().catch(e => console.log('Sound play prevented:', e));
      
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      pages.forEach(page => page.classList.remove('active'));
      
      const eraLink = document.querySelector(`nav a[data-page="${eraId}"]`);
      if (eraLink) {
        eraLink.classList.add('active');
      }
      
      document.getElementById(eraId).classList.add('active');
      
      const bgImages = {
          paleozoic: 'images/paleo.jpg',
          mesozoic: 'images/meso.jpg',
          cenozoic: 'images/ceno.jpg'
      };
      
      bgOverlay.style.opacity = '0';
      setTimeout(() => {
          bgOverlay.style.backgroundImage = `url('${bgImages[eraId]}')`;
          bgOverlay.style.opacity = '0.1';
      }, 300);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  
  const periodCards = document.querySelectorAll('.period-card');
  const modal = document.getElementById('period-modal');
  const closeModal = document.querySelector('.close-modal');
  
  const periodData = {
    'cambrian': {
        title: 'Cambrian Period',
      
        lifeForms: 'The Cambrian explosion brought an incredible diversity of life! Trilobites, anomalocaris, and other strange creatures filled the oceans. It was like a big party where everyone was invited!',
        geoFeatures: 'The supercontinent Rodinia had broken apart, and the continents were scattered. The climate was generally warm, with no ice at the poles. Shallow seas covered much of the land.',
        funFact: 'Did you know? Almost all major animal groups first appeared during the Cambrian explosion! It\'s like when Steven first met all the different gems!',
      image: 'images/Periods/cambrian-life.webp',
  caption: 'Life exploded like a gem fusion party—trilobites everywhere!'
      },
    'ordovician': {
        title: 'Ordovician Period',
     
        lifeForms: 'Life continued to diversify in the oceans. Graptolites, brachiopods, and cephalopods became common. The first primitive plants appeared on land.',
        geoFeatures: 'The continents were moving toward the south pole. There were extensive shallow seas, and the climate was warm and tropical.',
        funFact: 'The Ordovician ended with one of the five great mass extinctions in Earth\'s history!',
      image: 'images/Periods/ordovician.jpg',
  caption: 'Sea creatures stepped up their fashion game—tentacles and all.'
      },
    'silurian': {
        title: 'Silurian Period',
      
        lifeForms: 'Coral reefs became more common. The first jawed fish appeared. Plants and arthropods began to colonize the land more extensively.',
        geoFeatures: 'The climate stabilized after the Ordovician extinction. Sea levels were high, flooding many continental areas.',
        funFact: 'The first definite fossils of terrestrial animals (millipedes) appear in the Silurian!',
          image: 'images/Periods/silurian.jpg',
  caption: 'Land plants dipped their roots in and said, "We live here now."'
    },
    'devonian': {
        title: 'Devonian Period',
     
        lifeForms: 'Often called the "Age of Fishes." Sharks and bony fish diversified. The first amphibians evolved to live on land. Forests of primitive plants appeared.',
        geoFeatures: 'The supercontinent Gondwana covered the southern hemisphere. The climate was warm with no polar ice.',
        funFact: 'The Devonian extinction was one of the "Big Five" mass extinctions!',
  
         image: 'images/Periods/devonian.jpg',
  caption: 'The Age of Fishes? More like the Gem Beach Bash underwater!'
    },
    'carboniferous': {
        title: 'Carboniferous Period',
   
        lifeForms: 'Giant insects and amphibians thrived in the swampy forests. The first reptiles appeared. Vast coal-forming forests covered the land.',
        geoFeatures: 'The continents were coming together to form Pangaea. The climate was warm and humid with extensive wetlands.',
        funFact: 'The oxygen levels were so high that insects could grow to enormous sizes!',
  
         image: 'images/Periods/Carboniferous-Period.webp',
  caption: 'Insects were so big they could’ve had their own gem teams.'
    },
    'permian': {
        title: 'Permian Period',
    
        lifeForms: 'Reptiles diversified and became dominant. The ancestors of mammals appeared. Conifers became common.',
        geoFeatures: 'Pangaea was fully formed. The climate was generally hot and dry inland.',
        funFact: 'The Permian ended with the largest mass extinction in Earth\'s history - about 90% of marine species and 70% of terrestrial species went extinct!',
   
    image: 'images/Periods/Permian.jpg',
  caption: 'The party ended with a bang... and almost everyone left.'
      },
    'triassic': {
        title: 'Triassic Period',
       
        lifeForms: 'The first dinosaurs appeared. Mammal-like reptiles were common. The first true mammals appeared late in the period.',
        geoFeatures: 'Pangaea began to break apart. The climate was generally hot and dry.',
        funFact: 'The Triassic-Jurassic extinction paved the way for dinosaurs to dominate!',
  
         image: 'images/Periods/triassic-period.jpg',
  caption: 'Dinosaurs got their invite—small, awkward, but full of promise.'
    },
    'jurassic': {
        title: 'Jurassic Period',
     
        lifeForms: 'Dinosaurs became the dominant land animals. The first birds appeared. Giant marine reptiles ruled the seas.',
        geoFeatures: 'Pangaea continued to break apart. The climate was warm with no polar ice.',
        funFact: 'The Jurassic is when some of the most famous dinosaurs like Stegosaurus and Brachiosaurus lived!',
  
         image: 'images/Periods/Jurrasic.avif',
  caption: 'The dinos took over like the Diamonds on Homeworld!'
    },
    'cretaceous': {
        title: 'Cretaceous Period',
        
        lifeForms: 'Dinosaurs reached their peak diversity. Flowering plants appeared. The period ended with the famous asteroid impact.',
        geoFeatures: 'Continents were approaching their modern positions. Sea levels were very high.',
        funFact: 'The Cretaceous-Paleogene extinction wiped out all non-avian dinosaurs!',
  
         image: 'images/Periods/cretaceous-period-landscape-polar-forest-full-width.jpg.thumb.1024.1024.png',
  caption: 'T-Rex ruled, flowers bloomed, and the final curtain fell.'
    },
    'paleogene': {
        title: 'Paleogene Period',
       
        lifeForms: 'Mammals diversified and became dominant. Birds also flourished. Primates appeared.',
        geoFeatures: 'Continents continued to drift toward their current positions. The climate cooled toward the end.',
        funFact: 'This is when many modern mammal groups first appeared!',
  
         image: 'images/Periods/paleogene.jpg',
  caption: 'Mammals leveled up—fluffy, fierce, and fabulously evolved.'
    },
    'neogene': {
        title: 'Neogene Period',
     
        lifeForms: 'Grasslands expanded. Many modern mammal families appeared. Hominids (human ancestors) evolved.',
        geoFeatures: 'Continents were close to their current positions. The climate cooled, leading to ice ages.',
        funFact: 'The first humans (Homo) appeared in the late Neogene!',
        
         image: 'images/Periods/neogone.jpg',
  caption: 'Apes got clever, grass took over, and hominids made moves.'
    },
    'quaternary': {
        title: 'Quaternary Period',
        lifeForms: 'Modern humans evolved and spread across the globe. Many large mammals went extinct.',
        geoFeatures: 'Repeated glacial cycles (ice ages) occurred. Sea levels rose and fell dramatically.',
        funFact: 'We are currently living in the Quaternary Period!',
       image: 'images/Periods/Quaternary-Period.webp',
  caption: 'From Ice Ages to iPhones—this is our story.'
    }
  };

  periodCards.forEach(card => {
      card.addEventListener('click', function() {
          const period = this.getAttribute('data-period');
          const data = periodData[period];
      
          document.querySelector('.modal-title').textContent = data.title;
          document.querySelector('.modal-info h3:nth-of-type(1)').nextSibling.textContent = data.lifeForms;
          document.querySelector('.modal-info h3:nth-of-type(2)').nextSibling.textContent = data.geoFeatures;
          document.querySelector('.modal-info .fun-fact p').textContent = data.funFact;
          
          document.querySelector('.modal-image img').src = data.image;
          document.querySelector('.modal-image .image-caption').textContent = data.caption;
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
      });
  });
  
  closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
  });
  
  window.addEventListener('click', function(e) {
      if (e.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
      }
  });
  
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.period-card, .team-member, .gallery-item, .member-card, .reference-card');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };
  
  document.querySelectorAll('.period-card, .team-member, .gallery-item, .member-card, .reference-card').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
}



function playIntroVoice() {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance("Welcome to the performance task of Earth Science and Biology of Group 3 Kamel.");
    msg.rate = 1;
    msg.pitch = 1.05;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
  } else {
    console.warn("Speech synthesis not supported.");
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetPage = this.getAttribute('data-page');

    // Hide all pages
    pages.forEach(p => p.classList.remove('active'));

    // Show target page
    document.getElementById(targetPage).classList.add('active');
  });
});
const navLinks = document.querySelectorAll('nav a');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Get the target page id
    const targetPage = this.getAttribute('data-page');

    // Hide all pages
    pages.forEach(p => p.classList.remove('active'));

    // Show the selected page
    const pageToShow = document.getElementById(targetPage);
    if (pageToShow) {
      pageToShow.classList.add('active');
    }

    // Optional: highlight the active nav link
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
