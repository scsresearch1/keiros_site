// ==========================================
// KEIROS Website - JavaScript
// ==========================================

// Navigation
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect - throttled for performance
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

// Throttled nav link activation for performance
let navLinkTicking = false;

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
    
    navLinkTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navLinkTicking) {
        window.requestAnimationFrame(activateNavLink);
        navLinkTicking = true;
    }
}, { passive: true });

// Intersection Observer for scroll animations - optimized thresholds
const observerOptions = {
    threshold: [0, 0.1, 0.25],
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger connector animations when ecosystem items become visible
            if (entry.target.classList.contains('ecosystem-item')) {
                const connectors = entry.target.parentElement.querySelectorAll('.ecosystem-connector');
                connectors.forEach((connector, index) => {
                    const prevItem = connector.previousElementSibling;
                    const nextItem = connector.nextElementSibling;
                    if (prevItem && prevItem.classList.contains('ecosystem-item') && 
                        prevItem.classList.contains('visible') &&
                        nextItem && nextItem.classList.contains('ecosystem-item') &&
                        nextItem.classList.contains('visible')) {
                        setTimeout(() => {
                            connector.classList.add('visible');
                        }, 300);
                    }
                });
            }
        }
    });
}, observerOptions);

// Number counting animation for metrics
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        let current = start + (end - start) * easeOutQuart;
        
        if (suffix === '%') {
            element.textContent = current.toFixed(2) + suffix;
        } else if (end >= 1000) {
            if (end >= 100000) {
                element.textContent = (current / 1000).toFixed(1) + 'K';
            } else {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Ensure final value is set correctly
            if (suffix === '%') {
                element.textContent = end.toFixed(2) + suffix;
            } else if (end >= 100000) {
                element.textContent = (end / 1000).toFixed(1) + 'K';
            } else if (end >= 1000) {
                element.textContent = Math.floor(end).toLocaleString() + suffix;
            } else {
                element.textContent = Math.floor(end) + suffix;
            }
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize metric animations - optimized observer
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const metricValue = entry.target.querySelector('.metric-value-animated');
            if (metricValue) {
                const target = parseFloat(metricValue.getAttribute('data-target'));
                const suffix = metricValue.getAttribute('data-suffix') || '';
                const delay = parseInt(entry.target.getAttribute('data-metric')) * 200;
                setTimeout(() => {
                    animateValue(metricValue, 0, target, 2000, suffix);
                }, delay);
            }
            // Unobserve after animation starts
            metricObserver.unobserve(entry.target);
        }
    });
}, { threshold: [0, 0.3, 0.5] });

// Observe all metric cards
document.querySelectorAll('.platform-metric-card').forEach(card => {
    metricObserver.observe(card);
});

// Observe all animatable elements
const animatableElements = document.querySelectorAll([
    '.section-title',
    '.section-subtitle',
    '.ecosystem-item',
    '.ecosystem-connector',
    '.flow-step',
    '.case-card',
    '.device-video-container',
    '.app-photo-container',
    '.device-component-card',
    '.feature-card',
    '.firmware-feature',
    '.metric-card',
    '.chart-bar',
    '.table-row',
    '.erp-feature'
].join(','));

animatableElements.forEach(el => {
    observer.observe(el);
});

// Enhanced observer for elements that need animated class - optimized
const animatedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            animatedObserver.unobserve(entry.target);
        }
    });
}, { threshold: [0, 0.15], rootMargin: '0px 0px -100px 0px' });

// Elements that need 'animated' class
const animatedElements = document.querySelectorAll([
    '.device-component-card',
    '.feature-card',
    '.firmware-feature',
    '.metric-card',
    '.chart-bar',
    '.table-row',
    '.erp-feature'
].join(','));

animatedElements.forEach(el => {
    animatedObserver.observe(el);
});

// Special observer for connectors
const connectorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

const connectors = document.querySelectorAll('.ecosystem-connector');
connectors.forEach(connector => {
    connectorObserver.observe(connector);
    // Also trigger animation when adjacent items are visible
    const nextItem = connector.nextElementSibling;
    const prevItem = connector.previousElementSibling;
    if (nextItem && nextItem.classList.contains('ecosystem-item') && nextItem.classList.contains('visible')) {
        connector.classList.add('visible');
    }
    if (prevItem && prevItem.classList.contains('ecosystem-item') && prevItem.classList.contains('visible')) {
        connector.classList.add('visible');
    }
});

// Device 3D Rotation (simplified without Three.js)
const deviceModel = document.querySelector('.device-model');
if (deviceModel) {
    let rotation = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotation = 0;
    
    deviceModel.addEventListener('mousemove', (e) => {
        const rect = deviceModel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX = (e.clientX - centerX) / rect.width;
        mouseY = (e.clientY - centerY) / rect.height;
        
        targetRotation = mouseX * 30;
    });
    
    deviceModel.addEventListener('mouseleave', () => {
        targetRotation = 0;
    });
    
    function animateRotation() {
        rotation += (targetRotation - rotation) * 0.1;
        deviceModel.style.transform = `rotateY(${rotation}deg)`;
        requestAnimationFrame(animateRotation);
    }
    
    animateRotation();
}

// Device Component Tooltips
const deviceComponents = document.querySelectorAll('.device-component');
deviceComponents.forEach(component => {
    component.addEventListener('mouseenter', function() {
        const tooltip = this.querySelector('.component-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
        }
    });
    
    component.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.component-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    });
});

// OTA Animation - Simulate firmware upload
const otaNodes = document.querySelectorAll('.ota-node');
let currentNodeIndex = 0;

function animateOTAUpdate() {
    otaNodes.forEach((node, index) => {
        node.classList.remove('active');
    });
    
    if (currentNodeIndex < otaNodes.length) {
        otaNodes[currentNodeIndex].classList.add('active');
        currentNodeIndex++;
    } else {
        currentNodeIndex = 0;
    }
}

// Start OTA animation
if (otaNodes.length > 0) {
    setInterval(animateOTAUpdate, 1500);
}

// Dashboard Metrics Counter Animation
const metricCards = document.querySelectorAll('.metric-card');
const metricValues = {
    devices: { target: 1247, duration: 2000 },
    uptime: { target: 99.97, duration: 2000 },
    data: { target: 85234, duration: 2000 },
    locations: { target: 485, duration: 2000 }
};

function animateCounter(element, target, suffix = '') {
    const start = 0;
    const startTime = Date.now();
    const duration = 2000;
    
    function updateCounter() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function (easeOutCubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOutCubic;
        
        if (suffix === '%') {
            element.textContent = current.toFixed(2) + suffix;
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

// Observe metric cards and animate when visible
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metricCard = entry.target;
            const metricType = metricCard.getAttribute('data-metric');
            const metricValue = metricCard.querySelector('.metric-value');
            
            if (metricValue && metricValues[metricType]) {
                const target = metricValues[metricType].target;
                const suffix = metricType === 'uptime' ? '%' : '';
                
                if (!metricCard.classList.contains('animated')) {
                    metricCard.classList.add('animated');
                    setTimeout(() => animateCounter(metricValue, target, suffix), 300);
                }
            }
        }
    });
}, { threshold: 0.3 });

metricCards.forEach(card => metricsObserver.observe(card));

// Animate table rows when dashboard is visible
const dashboardTable = document.querySelector('.dashboard-table');
if (dashboardTable) {
    const tableObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rows = entry.target.querySelectorAll('.table-row');
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    tableObserver.observe(dashboardTable);
}

// Chart Bar Animation
const chartBars = document.querySelectorAll('.chart-bar');
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const value = bar.getAttribute('data-value');
            bar.style.setProperty('--bar-height', `${value}%`);
            bar.classList.add('animated');
        }
    });
}, { threshold: 0.3 });

chartBars.forEach(bar => barObserver.observe(bar));

// Flow Diagram Animation
const flowSteps = document.querySelectorAll('.flow-step');
flowSteps.forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.1}s`;
});

// Specifications Tabs
const specTabs = document.querySelectorAll('.spec-tab');
const specTables = document.querySelectorAll('.spec-table');

specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and tables
        specTabs.forEach(t => t.classList.remove('active'));
        specTables.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding table
        tab.classList.add('active');
        const targetTable = document.querySelector(`.spec-table[data-tab="${targetTab}"]`);
        if (targetTable) {
            targetTable.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // For a static site, use mailto link
        // In production, this would be replaced with an API call
        const subject = encodeURIComponent(`Contact from ${formData.name} - Keiros Inquiry`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Company: ${formData.company || 'N/A'}\n\n` +
            `Message:\n${formData.message}`
        );
        
        window.location.href = `mailto:info@keiros.com?subject=${subject}&body=${body}`;
        
        // Show success message
        alert('Thank you for your inquiry! Your email client should open shortly.');
    });
}

// Smooth scrolling for anchor links
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

// Parallax effect for hero section
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Flow Diagram Pulse Animation
const flowPulses = document.querySelectorAll('.flow-pulse');
setInterval(() => {
    flowPulses.forEach(pulse => {
        pulse.style.opacity = '0.3';
        setTimeout(() => {
            pulse.style.opacity = '1';
        }, 200);
    });
}, 2000);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations for hero section
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.title-line, .hero-subtitle, .hero-description, .hero-cta');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
    
    // Animate device component cards on load
    const deviceComponentCards = document.querySelectorAll('.device-component-card');
    setTimeout(() => {
        deviceComponentCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
                card.classList.add('visible');
            }, index * 150);
        });
    }, 800);
    
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    setTimeout(() => {
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
                card.classList.add('visible');
            }, index * 120);
        });
    }, 1000);
    
    // Initialize scroll-based animations
    activateNavLink();
});

// Performance optimization: Lazy load animations
const lazyElements = document.querySelectorAll('.case-visual, .device-component, .ecosystem-icon');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '100px' });

lazyElements.forEach(el => lazyObserver.observe(el));

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.body.classList.add('reduced-motion');
    // Disable all animations
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Console message for developers
console.log('%cKeiros IoT Ecosystem', 'color: #00BFFF; font-size: 24px; font-weight: bold;');
console.log('%cPrecision IoT for Scalable Field Intelligence', 'color: #8AEFFF; font-size: 14px;');
console.log('%cFor inquiries: info@keiros.com', 'color: #CCCCCC; font-size: 12px;');

