// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
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

// ===== SCROLL ANIMATIONS - Optimisé pour éviter les conflits =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Utiliser requestAnimationFrame pour éviter les conflits
            requestAnimationFrame(() => {
                entry.target.classList.add('visible');
            });
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width + '%';
            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== PARALLAX EFFECT - Désactivé pour éviter les problèmes de scroll =====
// L'effet de parallaxe a été désactivé pour une meilleure stabilité visuelle

// ===== TYPING EFFECT FOR HERO TITLE (Optional Enhancement) =====
const heroTitle = document.querySelector('.hero-title .gradient-text');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ===== CURSOR TRAIL EFFECT (Optional) =====
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
    
    // Remove old trail points
    cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 1000);
});

// ===== PROJECT CARDS HOVER EFFECT - Simplifié pour éviter les conflits =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ===== EXPERIENCE CARDS STAGGER ANIMATION =====
const experienceCards = document.querySelectorAll('.experience-card');

const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            });
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

experienceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    experienceObserver.observe(card);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('.section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== COUNTER ANIMATION FOR STATS (if needed) =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ===== PARTICLE EFFECT (Optional Enhancement) =====
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${5 + Math.random() * 5}s infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
};

// Uncomment to enable particles
// createParticles();

// ===== FORM VALIDATION (if contact form is added later) =====
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

if (contactForm) {
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Field validation
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMsg = formGroup.querySelector('.error-message');
        let isValid = true;
        let errorText = '';

        // Remove previous error state
        formGroup.classList.remove('error');

        // Check if field is empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorText = 'Ce champ est requis';
        }
        // Email validation
        else if (field.type === 'email' && field.value.trim()) {
            if (!validateEmail(field.value.trim())) {
                isValid = false;
                errorText = 'Veuillez entrer une adresse email valide';
            }
        }
        // Name validation (minimum 2 characters)
        else if (field.id === 'name' && field.value.trim().length < 2) {
            isValid = false;
            errorText = 'Le nom doit contenir au moins 2 caractères';
        }
        // Message validation (minimum 10 characters)
        else if (field.id === 'message' && field.value.trim().length < 10) {
            isValid = false;
            errorText = 'Le message doit contenir au moins 10 caractères';
        }

        // Show/hide error
        if (!isValid) {
            formGroup.classList.add('error');
            errorMsg.textContent = errorText;
        } else {
            formGroup.classList.remove('error');
            errorMsg.textContent = '';
        }

        return isValid;
    }

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Hide previous messages
        successMessage.classList.remove('show');
        errorMessage.classList.remove('show');

        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            // Focus on first error field
            const firstError = contactForm.querySelector('.form-group.error input, .form-group.error textarea');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS n\'est pas chargé. Vérifiez que le script est bien inclus dans le HTML.');
            }

            // Check if config is loaded
            if (typeof EMAILJS_CONFIG === 'undefined') {
                throw new Error('Configuration EmailJS non trouvée. Vérifiez que emailjs-config.js est chargé.');
            }

            // Ensure EmailJS is initialized
            if (!emailjs.init) {
                throw new Error('EmailJS n\'est pas correctement chargé.');
            }
            
            // Initialize if not already done
            try {
                emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            } catch (initError) {
                // Already initialized, that's fine
                console.log('EmailJS déjà initialisé');
            }

            // Send email using EmailJS
            const result = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                }
            );

            console.log('Email envoyé avec succès:', result);

            // Show success message
            successMessage.classList.add('show');
            contactForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

        } catch (error) {
            console.error('Erreur EmailJS:', error);
            console.error('Détails:', {
                message: error.message,
                text: error.text,
                status: error.status
            });
            
            // Show detailed error in console for debugging
            if (error.text) {
                console.error('Erreur détaillée:', error.text);
            }
            
            // Show error message
            errorMessage.classList.add('show');
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

}

// ===== SCROLL TO TOP BUTTON (Optional) =====
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
};

createScrollToTop();

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;

const optimizedScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', optimizedScroll, { passive: true });

// ===== CV DOWNLOAD HANDLER =====
const cvLinks = document.querySelectorAll('a[href*="YOUNES-EL-AZHADI-CV .pdf"], #downloadCV, #downloadCV2');
cvLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const url = this.getAttribute('href');
        const fileName = this.getAttribute('download') || 'YOUNES-EL-AZHADI-CV.pdf';
        
        // Try to fetch and download the file
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fichier non trouvé');
                }
                return response.blob();
            })
            .then(blob => {
                // Create a blob URL
                const blobUrl = window.URL.createObjectURL(blob);
                
                // Create a temporary anchor element
                const tempLink = document.createElement('a');
                tempLink.href = blobUrl;
                tempLink.download = fileName;
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(tempLink);
                    window.URL.revokeObjectURL(blobUrl);
                }, 100);
            })
            .catch(error => {
                console.error('Erreur lors du téléchargement:', error);
                // Fallback: try direct download
                const tempLink = document.createElement('a');
                tempLink.href = url;
                tempLink.download = fileName;
                tempLink.target = '_blank';
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                setTimeout(() => {
                    document.body.removeChild(tempLink);
                }, 100);
            });
    });
});

// ===== INITIALIZE EMAILJS ON PAGE LOAD =====
window.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS initialisé avec succès');
    } else {
        console.warn('⚠️ EmailJS ou configuration non trouvée');
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Bienvenue sur mon portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cVous êtes un recruteur? Contactez-moi à younes.azhadi@gmail.com', 'color: #8b5cf6; font-size: 14px;');

