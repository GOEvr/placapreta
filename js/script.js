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
