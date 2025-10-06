// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Simplified fade-in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.coffee-card, .about-text, .about-image');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }
});


// Image lazy loading optimization
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}


// Scroll progress indicator (optional)
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: var(--color-accent);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Uncomment to enable scroll progress indicator
// createScrollProgress();

// Smooth video loop transition
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    // Slow down video playback to 50% speed (half speed)
    heroVideo.playbackRate = 0.5;

    // Add transition for smooth fade
    heroVideo.style.transition = 'opacity 0.8s ease-in-out';

    // Start fade before video ends
    heroVideo.addEventListener('timeupdate', function() {
        const timeLeft = this.duration - this.currentTime;

        // Fade out 0.8 seconds before end
        if (timeLeft <= 0.8 && timeLeft > 0.7) {
            this.style.opacity = '0.3';
        }
    });

    // Reset and fade back in when looping
    heroVideo.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
        // Small delay then fade back in
        setTimeout(() => {
            this.style.opacity = '1';
        }, 50);
    });
}
