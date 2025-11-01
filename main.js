// DOM elements
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const splashScreen = document.querySelector('.splash-screen');

// Splash screen and hero content animation
document.addEventListener('DOMContentLoaded', () => {
    // Show splash screen for 4 seconds
    setTimeout(() => {
        splashScreen.classList.add('splash-hidden');
        
        // Animate hero content after splash screen disappears
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            gsap.fromTo(heroContent, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 1 }
            );
        }, 500);
    }, 4000);
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
        
        // Scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Update active link
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make sure hero content is visible immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.visibility = 'visible';
    }
    
    // Initialize Three.js scene
    init();
    
    // Add scroll animations
    initScrollAnimations();
});

// Scroll animations using GSAP
function initScrollAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.fromTo(
            section, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        
        gsap.fromTo(
            bar, 
            { width: 0 },
            { 
                width: width,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});