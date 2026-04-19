/**
 * Clássicos VR - Script Otimizado
 */

(function() {
    'use strict';

    // ============================================
    // HEADER SCROLL OTIMIZADO
    // ============================================
    const header = document.getElementById('header');
    let ticking = false;

    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }

    if (header) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // ============================================
    // SCROLL REVEAL
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-up');

    if (fadeElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // FAQ MELHORADO
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question?.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach(i => i.classList.remove('active'));

                if (!isActive) item.classList.add('active');
            });
        });

        // abrir primeiro
        faqItems[0]?.classList.add('active');
    }

    // ============================================
    // SMOOTH SCROLL SEGURO
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === "#" || href.length <= 1) return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // LAZY LOADING LIMPO
    // ============================================
    if (!('loading' in HTMLImageElement.prototype)) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

})();
