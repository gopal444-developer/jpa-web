document.addEventListener('DOMContentLoaded', () => {
     
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.id = 'scrollToTopBtn';
    document.body.appendChild(scrollButton);

    const scrollBtnStyle = `
        position: fixed; bottom: 30px; right: 30px; padding: 10px 15px; 
        background: #00BFFF; color: #1a237e; border: none; border-radius: 50%; 
        cursor: pointer; display: none; z-index: 9999; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    `;
    scrollButton.style.cssText = scrollBtnStyle;

    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    };

    scrollButton.onclick = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
 
    
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Submitted Sucsessfully");
            this.reset();
        });
    }

 
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if(menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

     
    const slidesContainer = document.getElementById('slides-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    const slides = document.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;
    
    let currentSlideIndex = 0;
    let autoPlayInterval;

    if (totalSlides === 0 || !slidesContainer) return;

     
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            showSlide(i);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');


     
    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = totalSlides - 1;
        } else {
            currentSlideIndex = index;
        }

        const offset = -currentSlideIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlideIndex].classList.add('active');
    }

     
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => showSlide(currentSlideIndex + 1), 5000);
    }

    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

     
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
        resetAutoPlay();
    });
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
        resetAutoPlay();
    });
    
     
    slidesContainer.addEventListener('mouseover', () => clearInterval(autoPlayInterval));
    slidesContainer.addEventListener('mouseout', () => startAutoPlay());
 
    showSlide(currentSlideIndex);
    startAutoPlay(); 
});