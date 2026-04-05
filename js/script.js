/**
 * Clássicos VR - Script Principal
 * Funcionalidades: Header scroll, scroll reveal, FAQ toggle
 */

(function() {
    'use strict';

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // SCROLL REVEAL (Intersection Observer)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-up');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px' 
        });
        
        fadeElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionDiv = item.querySelector('.faq-question');
            if (questionDiv) {
                questionDiv.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(i => i.classList.remove('active'));
                    if (!isActive) item.classList.add('active');
                });
            }
        });
        
        // Abrir o primeiro FAQ por padrão
        faqItems[0].classList.add('active');
    }

    // ============================================
    // SMOOTH SCROLL PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // LAZY LOADING OTIMIZADO
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        console.log(`Lazy loading nativo ativado para ${images.length} imagens`);
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    console.log('Clássicos VR - Site carregado com sucesso!');
})();
