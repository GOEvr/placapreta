/**
 * Clássicos VR - Script Premium
 * Header inteligente com scroll suave
 */

(function() {
    'use strict';

    // ============================================
    // HEADER PREMIUM - COM SCROLL SUAVE
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
        if (!header) return;
        
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    updateHeader();

    // ============================================
    // SCROLL REVEAL
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
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        fadeElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // CARROSSEL (Swiper)
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
    }

    // ============================================
    // FAQ
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question?.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        faqItems[0]?.classList.add('active');
    }

    // ============================================
    // SMOOTH SCROLL
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
        "image": "imagens/1775179642539.png",
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
