class BinaryRain {
    constructor() {
        this.canvas = document.getElementById('binaryRain');
        this.ctx = this.canvas.getContext('2d');

        this.fontSize = 16;
        this.columns = [];

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const columnsCount = Math.floor(this.canvas.width / this.fontSize);
        this.columns = Array(columnsCount).fill(0);
    }

    animate() {
        // Fade effect for trailing
        this.ctx.fillStyle = 'rgba(0, 20, 30, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Binary digit color
        this.ctx.fillStyle = '#00f3ff';
        this.ctx.font = `${this.fontSize}px monospace`;
        this.ctx.textBaseline = 'top';

        this.columns.forEach((yPos, index) => {
            const text = Math.random() > 0.5 ? '1' : '0';
            const x = index * this.fontSize;
            this.ctx.fillText(text, x, yPos);

            if (yPos > this.canvas.height && Math.random() > 0.975) {
                this.columns[index] = 0;
            } else {
                // Slower falling effect
                this.columns[index] += this.fontSize * 0.3;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BinaryRain();
});



    const DOM = {
        navbar: document.getElementById('navbar'),
        hamburger: document.getElementById('hamburger'),
        navMenu: document.getElementById('nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        scrollProgress: document.getElementById('scroll-progress'),
        typingText: document.getElementById('typing-text'),
        contactForm: document.getElementById('contact-form'),
        projectCards: document.querySelectorAll('.project-card'),
        buttons: document.querySelectorAll('.btn, .project-link, .social-link'),
        sections: document.querySelectorAll('section[id]'),
        animateElements: document.querySelectorAll('.about-card, .project-card, .skill-category, .contact-item, .stat'),
        skillItems: document.querySelectorAll('.skill-item'),
        statNumbers: document.querySelectorAll('.stat-number')
    };

    
// Add to your main JS file
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved preference or system preference
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

// Toggle function
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Optional: Play subtle transition animation
  html.style.transition = 'background-color 0.5s ease';
  setTimeout(() => html.style.transition = '', 500);
});
    // ======================
    // PERFECT TYPING ANIMATION
    // ======================
    const initTypingAnimation = () => {
        const texts = ['Full Stack Developer', 'App Developer', 'Data Analyst', 'Tech Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout;

        const type = () => {
            clearTimeout(typingTimeout);
            const currentText = texts[textIndex];
            
            // Update text content
            DOM.typingText.textContent = currentText.substring(0, charIndex);
            
            // Animation logic
            if (!isDeleting) {
                // Typing forward
                charIndex++;
                
                if (charIndex > currentText.length) {
                    isDeleting = true;
                    // Pause at complete word (2 seconds)
                    typingTimeout = setTimeout(type, 2000);
                    return;
                }
            } else {
                // Deleting backward
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    // Brief pause before next word (300ms)
                    typingTimeout = setTimeout(type, 300);
                    return;
                }
            }
            
            // Typing speeds (comfortable pace)
            const speed = isDeleting ? 40 : 70;
            typingTimeout = setTimeout(type, speed);
        };

        type();
    };

    // ======================
    // MOBILE NAVIGATION
    // ======================
    const initMobileNav = () => {
        DOM.hamburger.addEventListener('click', () => {
            DOM.navMenu.classList.toggle('active');
            DOM.hamburger.classList.toggle('active');
        });

        DOM.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                DOM.navMenu.classList.remove('active');
                DOM.hamburger.classList.remove('active');
            });
        });
    };

    // ======================
    // SCROLL EFFECTS
    // ======================
    const initScrollEffects = () => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Scroll progress bar
            DOM.scrollProgress.style.width = `${(scrolled / docHeight) * 100}%`;
            
            // Sticky navbar
            DOM.navbar.classList.toggle('scrolled', scrolled > 50);
            
            // Active section highlighting
            highlightActiveSection();
            
            // Parallax effect
            applyParallax();
        };

        window.addEventListener('scroll', handleScroll);
    };

    // ======================
    // ANIMATION OBSERVERS
    // ======================
    const initAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    if (entry.target.classList.contains('skill-item')) {
    const progressBar = entry.target.querySelector('.skill-progress');
    const percentageText = entry.target.querySelector('.skill-percentage');
    const targetWidth = progressBar.dataset.width;

    // Animate bar
    progressBar.style.width = `${targetWidth}%`;

    // Automatically set percentage text
    percentageText.textContent = `${targetWidth}%`;
}
                }
            });
        }, observerOptions);

        DOM.animateElements.forEach(el => observer.observe(el));
        DOM.skillItems.forEach(item => observer.observe(item));
        DOM.statNumbers.forEach(stat => observer.observe(stat));
    };

    // ======================
    // HELPER FUNCTIONS
    // ======================
    const highlightActiveSection = () => {
        const scrollPos = window.scrollY + 100;
        
        DOM.sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.id;
            
            if (scrollPos >= top && scrollPos < top + height) {
                DOM.navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    };

    const applyParallax = () => {
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
        }
    };

    const animateCounter = (element) => {
        const target = +element.dataset.target;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // ======================
    // FORM HANDLING
    // ======================
    const initForm = () => {
        if (!DOM.contactForm) return;
        
        DOM.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(DOM.contactForm);
            const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Validate form
            if (![...formData.values()].every(Boolean)) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('email'))) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                DOM.contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    };

    // ======================
    // UI EFFECTS
    // ======================
    const initUIEffects = () => {
        // Project card hover
        DOM.projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.transition = 'transform 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Button glow effect
        DOM.buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.7)';
                button.style.transition = 'box-shadow 0.3s ease';
            });
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '';
            });
        });
    };

    // ======================
    // NOTIFICATION SYSTEM
    // ======================
    const showNotification = (message, type) => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        setTimeout(() => notification.remove(), 5000);
    };

    // ======================
    // INITIALIZATION
    // ======================
    const init = () => {
        // Fade in page
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
        
        // Initialize components
        initTypingAnimation();  // Using the perfected typing animation
        initMobileNav();
        initScrollEffects();
        initAnimations();
        initForm();
        initUIEffects();
    };
    //optional neon floating particles effect
    class NeonParticles {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.prepend(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`
      });
    }
    
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < 0) p.y = this.canvas.height;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

new NeonParticles();

    init();
