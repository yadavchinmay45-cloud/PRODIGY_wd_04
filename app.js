/**
 * Portfolio — Chinmay Yadav
 * Smooth scroll, typewriter, stat counter, scroll reveal, and mobile nav
 */

(function () {
    'use strict';

    // ==========================================
    // DOM
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('nav-links');
    const navToggle = document.getElementById('nav-toggle');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const typewriterText = document.getElementById('typewriter-text');
    const statNumbers = document.querySelectorAll('.stat-number');

    // ==========================================
    // Typewriter
    // ==========================================
    const words = [
        'Web Applications',
        'Responsive Designs',
        'Interactive UIs',
        'Modern Websites',
        'Clean Code',
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typewrite() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before next word
        }

        setTimeout(typewrite, typeSpeed);
    }

    typewrite();

    // ==========================================
    // Stat Counter Animation
    // ==========================================
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        statNumbers.forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;

            function count() {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                    return;
                }
                el.textContent = Math.floor(current);
                requestAnimationFrame(count);
            }

            count();
        });
    }

    // ==========================================
    // Scroll: Navbar + Active Link + Reveal
    // ==========================================
    const sections = document.querySelectorAll('.section, .hero');
    const revealElements = document.querySelectorAll(
        '.detail-card, .skill-card, .project-card, .contact-card'
    );

    // Add reveal class
    revealElements.forEach(el => el.classList.add('reveal'));

    function onScroll() {
        const scrollY = window.scrollY;

        // Navbar scroll state
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Active nav link
        let current = 'home';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });

        // Scroll reveal
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });

        // Skill bar fill animation
        const skillCards = document.querySelectorAll('.skill-fill:not(.animate)');
        skillCards.forEach(fill => {
            const rect = fill.getBoundingClientRect();
            if (rect.top < window.innerHeight - 40) {
                fill.classList.add('animate');
            }
        });

        // Trigger stat counter when hero stats are visible
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            const rect = heroStats.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                animateStats();
            }
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on load
    setTimeout(onScroll, 300);

    // ==========================================
    // Mobile Nav Toggle
    // ==========================================
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // ==========================================
    // Smooth scroll for anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

})();
