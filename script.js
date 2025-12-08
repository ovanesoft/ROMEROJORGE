// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Optimized scroll handler with throttling
let ticking = false;
let lastScrollY = 0;

function handleScroll() {
    lastScrollY = window.scrollY;

    // Navbar background
    const navbar = document.querySelector('.navbar');
    if (lastScrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }

    // Active navigation link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (lastScrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.borderBottomColor = 'transparent';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.borderBottomColor = 'var(--color-accent)';
        }
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
        });
        ticking = true;
    }
}, { passive: true });

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            perfil: document.getElementById('perfil').value,
            mensaje: document.getElementById('mensaje').value
        };

        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formData);

        // Show success message
        alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');

        // Reset form
        contactForm.reset();
    });
}

// Optimized Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    observer.observe(section);
});

// Color Palette Selector
const paletteToggle = document.getElementById('paletteToggle');
const paletteOptions = document.getElementById('paletteOptions');
const paletteButtons = document.querySelectorAll('.palette-option');

// Only run if palette selector exists
if (!paletteToggle || !paletteOptions || paletteButtons.length === 0) {
    console.log('Palette selector not found on this page');
}

// Define color palettes
const palettes = {
    gold: {
        accent: '#c9a961',
        name: 'Dorado clásico'
    },
    emerald: {
        accent: '#2d7d6e',
        name: 'Verde esmeralda'
    },
    sapphire: {
        accent: '#2962a3',
        name: 'Azul zafiro'
    },
    burgundy: {
        accent: '#8b3a3a',
        name: 'Borgoña'
    },
    bronze: {
        accent: '#8b6f47',
        name: 'Bronce oscuro'
    },
    slate: {
        accent: '#647687',
        name: 'Gris pizarra'
    },
    coral: {
        accent: '#ff6b6b',
        name: 'Coral vibrante'
    },
    teal: {
        accent: '#00b8a9',
        name: 'Turquesa eléctrico'
    },
    purple: {
        accent: '#7b2cbf',
        name: 'Púrpura imperial'
    },
    amber: {
        accent: '#f59e0b',
        name: 'Ámbar brillante'
    },
    crimson: {
        accent: '#dc143c',
        name: 'Carmesí intenso'
    },
    lime: {
        accent: '#84cc16',
        name: 'Lima vibrante'
    }
};

// Toggle palette menu
if (paletteToggle) {
    paletteToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        paletteOptions.classList.toggle('active');
    });
}

// Close palette menu when clicking outside
if (paletteOptions) {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.color-palette-selector')) {
            paletteOptions.classList.remove('active');
        }
    });
}

// Load saved palette (always run this to apply saved color)
const savedPalette = localStorage.getItem('colorPalette') || 'gold';
applyPalette(savedPalette);

// Apply palette when clicking buttons
if (paletteButtons.length > 0) {
    paletteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const palette = button.getAttribute('data-palette');
            applyPalette(palette);
            localStorage.setItem('colorPalette', palette);
            if (paletteOptions) {
                paletteOptions.classList.remove('active');
            }
        });
    });
}

// Function to apply palette
function applyPalette(paletteName) {
    const palette = palettes[paletteName];
    if (palette) {
        document.documentElement.style.setProperty('--color-accent', palette.accent);

        // Remove inline styles to let CSS variables work (only if element exists)
        if (paletteToggle) {
            paletteToggle.style.background = '';
            paletteToggle.style.borderColor = '';
        }

        // Update active state on buttons (only if buttons exist)
        if (paletteButtons.length > 0) {
            paletteButtons.forEach(btn => {
                if (btn.getAttribute('data-palette') === paletteName) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }
}
