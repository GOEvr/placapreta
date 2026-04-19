/**
 * Clássicos VR - Script Ultra-Otimizado
 * Performance, UX, SEO e Carrossel
 */

(function() {
    'use strict';

    // ============================================
    // HEADER SCROLL (otimizado com requestAnimationFrame)
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
        }, { passive: true });
    }

    // ============================================
    // SCROLL REVEAL (configurável)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-up');
    const ANIMATE_ONCE = true;

    if (fadeElements.length) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    if (ANIMATE_ONCE) {
                        observer.unobserve(entry.target);
                    }
                } else if (!ANIMATE_ONCE) {
                    entry.target.classList.remove('revealed');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        fadeElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // CARROSSEL (Swiper) - CORRIGIDO
    // ============================================
    if (typeof Swiper !== 'undefined') {
        const gallerySwiper = new Swiper('.gallery-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            effect: 'slide',
            speed: 800,
        });
    } else {
        console.warn('Swiper não foi carregado. Verifique o link do CDN.');
    }

    // ============================================
    // FAQ MELHORADO (com ícone animado e tecla ESC)
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length) {
        // Fechar FAQ com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                faqItems.forEach(i => i.classList.remove('active'));
            }
        });

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question?.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fecha todos os outros
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Abre o atual se não estava ativo
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // Abrir primeiro FAQ
        faqItems[0]?.classList.add('active');
    }

    // ============================================
    // SMOOTH SCROLL SEGURO
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#' || href.length <= 1) return;
            
            const target = document.querySelector(href);
            
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
    // LAZY LOADING (fallback)
    // ============================================
    if (!('loading' in HTMLImageElement.prototype)) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        script.async = true;
        document.body.appendChild(script);
    }

    // ============================================
    // SCHEMA.ORG PARA SEO
    // ============================================
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Clássicos VR",
        "description": "Certificação Placa Preta para veículos antigos",
        "telephone": "+5524999595228",
        "image": "https://goevr.github.io/placapreta/imagens/1775179642539.png",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rio de Janeiro",
            "addressRegion": "RJ",
            "addressCountry": "BR"
        }
    });
    document.head.appendChild(schemaScript);

})();
