document.addEventListener('DOMContentLoaded', function() {
    // Screenshot slider functionality
    const screenshots = document.querySelectorAll('.screenshot');
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetId = this.getAttribute('data-screenshot');
            
            // Hide all screenshots and deactivate all dots
            screenshots.forEach(screenshot => {
                screenshot.classList.remove('active');
            });
            
            navDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the target screenshot and activate the clicked dot
            document.getElementById(targetId).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Auto-rotate screenshots every 5 seconds
    let currentScreenshot = 0;
    
    function rotateScreenshots() {
        screenshots.forEach(screenshot => {
            screenshot.classList.remove('active');
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        currentScreenshot = (currentScreenshot + 1) % screenshots.length;
        
        screenshots[currentScreenshot].classList.add('active');
        navDots[currentScreenshot].classList.add('active');
    }
    
    setInterval(rotateScreenshots, 5000);
    
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
    const animateElements = document.querySelectorAll('.feature-card, .step, .screenshot-slider');
    
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
