// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .stat-card, .testimonial-card, .section-title'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backdropFilter = 'blur(12px)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace('+', '').replace('%', ''));
                if (text.includes('%')) {
                    animateCounter(stat, number, 2000);
                    setTimeout(() => {
                        stat.textContent = number + '%';
                    }, 2000);
                } else {
                    animateCounter(stat, number, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// CTA Button interactions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form submission handler (if you add a contact form later)
function handleFormSubmit(e) {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
}

// Performance optimization - Lazy loading for images (if you add images later)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
});

// Theme Toggle
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexamind-theme', theme);
    const moon = document.querySelector('.icon-moon');
    const sun = document.querySelector('.icon-sun');
    if (theme === 'light') {
        moon.style.display = 'none';
        sun.style.display = 'inline';
    } else {
        moon.style.display = 'inline';
        sun.style.display = 'none';
    }
}

const savedTheme = localStorage.getItem('nexamind-theme') || 'dark';
setTheme(savedTheme);

document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            openItem.classList.remove('open');
        });

        if (!isOpen) {
            item.classList.add('open');
        }
    });
});

// Video Play Button
const videoContainer = document.getElementById('videoContainer');
if (videoContainer) {
    videoContainer.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/RPKsAmJg0z8?autoplay=1&rel=0';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.border = '0';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;
        videoContainer.innerHTML = '';
        videoContainer.appendChild(iframe);
    });
}

// Cursor Trail
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const trail = [];
const TRAIL_LIFETIME = 300;
const LINE_WIDTH = 4;
const MAX_ALPHA = 0.5;

document.addEventListener('mousemove', e => {
    trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = Date.now();
    while (trail.length > 0 && now - trail[0].time > TRAIL_LIFETIME) {
        trail.shift();
    }
    if (trail.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 1; i++) {
            const midX = (trail[i].x + trail[i + 1].x) / 2;
            const midY = (trail[i].y + trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, midX, midY);
        }
        ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
        const avgAge = now - trail[Math.floor(trail.length / 2)].time;
        const alpha = MAX_ALPHA * (1 - avgAge / TRAIL_LIFETIME);
        ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, alpha)})`;
        ctx.lineWidth = LINE_WIDTH;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }
    requestAnimationFrame(animate);
}
animate();

function typeWriter(element, text, speed, cursorId, callback) {
    let i = 0;
    const cursor = document.getElementById(cursorId);
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (cursor) cursor.classList.add('hidden');
            if (callback) callback();
        }
    }
    type();
}

console.log('Typewriter starting...');
const titleEl = document.getElementById('typewriter-title');
const taglineEl = document.getElementById('typewriter-tagline');
const cursorTitle = document.getElementById('cursor-title');
const cursorTagline = document.getElementById('cursor-tagline');

console.log('Found elements:', { titleEl, taglineEl, cursorTitle, cursorTagline });

if (titleEl && taglineEl) {
    cursorTagline.classList.add('hidden');
    typeWriter(titleEl, 'NexaMind AI', 50, 'cursor-title', () => {
        setTimeout(() => {
            cursorTagline.classList.remove('hidden');
            typeWriter(taglineEl, 'Intelligent Solutions for Modern Business', 50, 'cursor-tagline', () => {
                cursorTagline.classList.add('hidden');
            });
        }, 1000);
    });
}

// Console welcome message
console.log(`
🚀 Welcome to NexaMind AI!
📧 Contact us: hello@nexamind.ai
🌐 Visit us: https://nexamind.ai
`);