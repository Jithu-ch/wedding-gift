// Wedding Love Story Website JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header background on scroll
    const navbar = document.querySelector('.navbar');
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;

            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeGalleryModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
    }

    function closeGalleryModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Typing animation for hero subtitle (optional enhancement)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing animation after a delay
        setTimeout(typeWriter, 1500);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Add floating hearts animation
    function createFloatingHearts() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.classList.add('floating-heart');
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 3 + 's';
            hero.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 2000);
    }

    createFloatingHearts();

    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const journeyItems = document.querySelectorAll('.journey-item');

    function animateTimeline() {
        const scrollTop = window.pageYOffset;

        timelineItems.forEach((item, index) => {
            const offset = item.offsetTop - window.innerHeight + 100;

            if (scrollTop > offset) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });

        journeyItems.forEach((item, index) => {
            const offset = item.offsetTop - window.innerHeight + 100;

            if (scrollTop > offset) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }
        });
    }

    window.addEventListener('scroll', animateTimeline);

    // Initialize timeline items as hidden
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    journeyItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.8)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Add some initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
        });
    }, 500);

    // Year update in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add click effect to cards
    document.querySelectorAll('.meeting-card, .journey-card, .future-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeGalleryModal();
        }
    });

    // Preload images for better performance
    const imageSources = [
        'images/bride-childhood.jpg',
        'images/groom-childhood.jpg',
        'images/college-1.jpg',
        'images/college-2.jpg',
        'images/travel-1.jpg',
        'images/recent-1.jpg'
    ];

    imageSources.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Video Player Functionality
    const video = document.getElementById('loveStoryVideo');
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.getElementById('videoOverlay');
    const videoLoading = document.getElementById('videoLoading');
    const muteButton = document.getElementById('muteButton');
    const watchStoryButton = document.getElementById('watchStory');

    // Enhanced mobile video support
    if (video && playButton) {
        // Detect mobile devices for better touch handling
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                        (window.innerWidth <= 768 && window.innerHeight <= 1024);

        if (isMobile) {
            // Optimize video for mobile
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');

            // Prevent default touch behaviors that might interfere
            videoOverlay.addEventListener('touchstart', function(e) {
                e.preventDefault();
            });

            playButton.addEventListener('touchstart', function(e) {
                e.preventDefault();
            });

            // Add mobile-specific loading message
            video.addEventListener('loadstart', function() {
                videoLoading.innerHTML = '<div class="loading-spinner"></div><p>Loading your love story...</p>';
            });

            // Handle mobile video loading
            video.addEventListener('canplay', function() {
                console.log('Video ready for mobile playback');
            });

            // Handle mobile video errors
            video.addEventListener('error', function() {
                const errorMsg = isMobile ?
                    '<p>Video not loading on mobile. Please check your internet connection or try on desktop.</p>' :
                    '<p>Video not found. Please add "our-love-story.mp4" to the videos folder.</p>';
                videoLoading.innerHTML = errorMsg;
            });
        }

        // Show loading initially
        videoLoading.style.display = 'flex';

        // Handle video loading
        video.addEventListener('loadedmetadata', function() {
            videoLoading.style.display = 'none';
            videoOverlay.style.display = 'none';
            console.log('Video loaded, duration:', video.duration);
        });

        video.addEventListener('error', function() {
            const errorMsg = isMobile ?
                '<p>Video not loading on mobile. Please check your internet connection or try on desktop.</p>' :
                '<p>Video not found. Please add "our-love-story.mp4" to the videos folder.</p>';
            videoLoading.innerHTML = errorMsg;
            console.log('Video failed to load');
        });

        // Play button functionality
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
                playButton.style.background = 'rgba(255, 107, 157, 1)';
            } else {
                video.pause();
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.style.background = 'rgba(255, 107, 157, 0.9)';
            }
        });

        // Video overlay click to play
        videoOverlay.addEventListener('click', function() {
            video.play();
            videoOverlay.style.display = 'none';
        });

        // Video end handler
        video.addEventListener('ended', function() {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.style.background = 'rgba(255, 107, 157, 0.9)';
            videoOverlay.style.display = 'flex';
        });

        // Video pause handler
        video.addEventListener('pause', function() {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.style.background = 'rgba(255, 107, 157, 0.9)';
        });

        // Video play handler
        video.addEventListener('play', function() {
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            playButton.style.background = 'rgba(255, 107, 157, 1)';
        });
    }

    // Mute button functionality
    if (muteButton && video) {
        muteButton.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                muteButton.innerHTML = '<i class="fas fa-volume-up"></i><span>Unmute</span>';
            } else {
                video.muted = true;
                muteButton.innerHTML = '<i class="fas fa-volume-mute"></i><span>Mute</span>';
            }
        });
    }

    // Watch story button
    if (watchStoryButton && video) {
        watchStoryButton.addEventListener('click', function() {
            video.play();
            videoOverlay.style.display = 'none';
        });
    }

    console.log('💕 Wedding Love Story video functionality loaded!');
});
