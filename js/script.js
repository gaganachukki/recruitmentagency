document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (navbar.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // GSAP Scroll Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Standard Fade/Slide up (replaces simple animate-on-scroll)
        gsap.utils.toArray('.animate-on-scroll, .gsap-fade-up').forEach(el => {
            gsap.fromTo(el, 
                { autoAlpha: 0, y: 30 },
                { 
                    autoAlpha: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Staggered Grids
        gsap.utils.toArray('.gsap-stagger-container').forEach(container => {
            const items = container.querySelectorAll('.gsap-stagger-item, .card, .blog-card, .team-card');
            if (items.length > 0) {
                gsap.fromTo(items,
                    { autoAlpha: 0, y: 30 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%"
                        }
                    }
                );
            }
        });

        // Parallax Images
        gsap.utils.toArray('.gsap-parallax-img').forEach(img => {
            gsap.fromTo(img,
                { y: "-10%", autoAlpha: 1 },
                {
                    y: "10%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });

        // Counter Animations
        gsap.utils.toArray('.counter-box').forEach(box => {
            const counters = box.querySelectorAll('.counter-val');
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                
                ScrollTrigger.create({
                    trigger: box,
                    start: "top 90%",
                    once: true,
                    onEnter: () => {
                        gsap.to({ val: 0 }, {
                            val: target,
                            duration: 2,
                            ease: "power1.out",
                            onUpdate: function() {
                                const val = this.targets()[0].val;
                                counter.innerText = (val % 1 !== 0 && target % 1 !== 0) ? val.toFixed(1) + suffix : Math.ceil(val) + suffix;
                            }
                        });
                    }
                });
            });
        });
    }

    // Form Validation (Basic Frontend)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = 'Success!';
                btn.classList.add('btn-success');
                form.reset();
                
                // Show success message if present
                const successMsg = form.parentElement.querySelector('.success-msg');
                if (successMsg) successMsg.style.display = 'block';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-success');
                    btn.disabled = false;
                    if (successMsg) successMsg.style.display = 'none';
                }, 3000);
            }, 1500);
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Hero Section Background Slider
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const bgImages = [
            'url("assets/hero1.webp")',
            'url("assets/hero2.webp")',
            'url("assets/hero3.webp")'
        ];
        let currentBgIndex = 0;
        
        // Initial background
        heroSection.style.backgroundImage = bgImages[0];
        
        setInterval(() => {
            currentBgIndex = (currentBgIndex + 1) % bgImages.length;
            heroSection.style.backgroundImage = bgImages[currentBgIndex];
        }, 1500); // Loop every 1.5 seconds
    }
});
