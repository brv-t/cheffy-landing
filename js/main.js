document.addEventListener('DOMContentLoaded', function() {
    // Screenshot slider functionality (3 images per slide)
    const slides = document.querySelectorAll('.screenshot-slide');
    const navContainer = document.querySelector('.screenshot-nav');
    let navDots = []; 

    if (slides.length > 0 && navContainer) {
        // Dynamically create nav dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('nav-dot');
            if (index === 0) {
                dot.classList.add('active'); 
            }
            dot.setAttribute('data-slide', index);
            navContainer.appendChild(dot);
            navDots.push(dot);
        });

        navDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const targetSlideIndex = parseInt(this.getAttribute('data-slide'));
                currentSlide = targetSlideIndex; 
                showSlide(currentSlide);
            });
        });
    }
    
    let currentSlide = 0;
    
    function showSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
        });
        if (navDots.length > 0) {
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }
    }

    function rotateSlides() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    if (slides.length > 1) { 
        setInterval(rotateSlides, 5000);
    }

    // Initial display
    if (slides.length > 0) {
        showSlide(currentSlide);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.feature-card, .step, .screenshot-slider'); // Reverted to .screenshot-slider
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView();
});
