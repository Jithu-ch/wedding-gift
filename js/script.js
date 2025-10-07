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

    // Smooth scrolling for navigation links - Simplified
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

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

    // Gallery functionality - Better approach for different image sizes
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            if (img) {
                // Create a simple overlay instead of modal
                createImageOverlay(img.src, img.alt);
            }
        });

        // Add hover effects for better UX
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

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

// Wedding Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2025-10-11T23:32:00+05:30').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
}

// Love Calculator - Simplified
function calculateLove() {
    const name1 = document.getElementById('partner1Name');
    const name2 = document.getElementById('partner2Name');

    if (name1 && name2) {
        const partner1Name = name1.value.trim();
        const partner2Name = name2.value.trim();

        if (partner1Name && partner2Name) {
            // Simple calculation
            let loveScore = (partner1Name.length + partner2Name.length) * 7 % 101;

            // Special case for wedding couple
            if ((partner1Name.toLowerCase().includes('veera') && partner2Name.toLowerCase().includes('jyothsna')) ||
                (partner1Name.toLowerCase().includes('jyothsna') && partner2Name.toLowerCase().includes('veera'))) {
                loveScore = 100;
            }

            const result = document.getElementById('loveResult');
            const percentage = document.getElementById('lovePercentage');
            const message = document.getElementById('loveMessage');

            if (result && percentage && message) {
                percentage.textContent = loveScore + '%';
                message.textContent = loveScore >= 80 ? '💕 Perfect Match!' : '💖 Beautiful Love!';
                result.style.display = 'block';
            }
        } else {
            alert('Please enter both names!');
        }
    }
}

// Guestbook functionality - Simplified
const guestbookForm = document.getElementById('guestbookForm');
if (guestbookForm) {
    guestbookForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const guestName = document.getElementById('guestName');
        const guestMessage = document.getElementById('guestMessage');

        if (guestName && guestMessage) {
            const name = guestName.value.trim();
            const message = guestMessage.value.trim();

            if (name && message) {
                // Add message to page
                addGuestMessage(name, message);

                // Clear form
                guestbookForm.reset();

                // Show success
                alert('Thank you for your beautiful message! 💕');
            } else {
                alert('Please fill in all fields!');
            }
        }
    });
}

// Add guest message to the page
function addGuestMessage(name, message) {
    const messagesContainer = document.getElementById('guestbookMessages');
    const messageElement = document.createElement('div');
    messageElement.className = 'guest-message';

    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    messageElement.innerHTML = `
        <div class="message-header">
            <div class="message-author">${name}</div>
            <div class="message-date">${dateStr}</div>
        </div>
        <div class="message-content">${message}</div>
    `;

    messagesContainer.appendChild(messageElement);

    // Animate the new message
    messageElement.style.animation = 'messageSlideIn 0.6s ease-out';
}

// Particle Effects
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 1000);
    }

    setInterval(createParticle, 3000);
}

function createParticle() {
    const particlesContainer = document.getElementById('particles');
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position and animation delay
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';

    particlesContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 25000);
}

// Create image overlay for gallery
function createImageOverlay(src, alt) {
    // Remove existing overlay if any
    const existingOverlay = document.querySelector('.image-overlay-view');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay-view';
    overlay.innerHTML = `
        <div class="image-overlay-backdrop"></div>
        <div class="image-overlay-content">
            <img src="${src}" alt="${alt}" class="overlay-image">
            <button class="overlay-close">&times;</button>
        </div>
    `;

    // Add styles
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Close on click outside or close button
    overlay.querySelector('.image-overlay-backdrop').addEventListener('click', closeImageOverlay);
    overlay.querySelector('.overlay-close').addEventListener('click', closeImageOverlay);

    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeImageOverlay();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeImageOverlay() {
    const overlay = document.querySelector('.image-overlay-view');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Music Player
let currentTrack = 0;
const tracks = [
    { title: 'Love Theme', artist: 'prabhas', src: 'audio/darlingpraba.mp3' }
];

let audio = null;

function initMusicPlayer() {
    // Create audio element if it doesn't exist
    if (!audio) {
        audio = new Audio();
        audio.volume = 0.2; // Reduced to 20% for calm, peaceful background music
        audio.loop = true; // Enable looping for continuous peaceful ambiance

        // Handle track end
        audio.addEventListener('ended', function() {
            playNextTrack();
        });

        // Update progress
        audio.addEventListener('timeupdate', updateMusicProgress);

        // Add fade-in effect when music starts
        audio.addEventListener('play', function() {
            this.volume = 0;
            let fadeIn = setInterval(() => {
                if (this.volume < 0.2) {
                    this.volume = Math.min(this.volume + 0.05, 0.2);
                } else {
                    clearInterval(fadeIn);
                }
            }, 200);
        });

        // Add fade-out effect when music pauses
        audio.addEventListener('pause', function() {
            let fadeOut = setInterval(() => {
                if (this.volume > 0.05) {
                    this.volume = Math.max(this.volume - 0.05, 0);
                } else {
                    clearInterval(fadeOut);
                }
            }, 100);
        });
    }

    loadTrack(currentTrack);
}

function loadTrack(index) {
    if (tracks[index]) {
        audio.src = tracks[index].src;
        document.getElementById('musicTitle').textContent = tracks[index].title;
        document.getElementById('musicArtist').textContent = tracks[index].artist;
    }
}

function playMusic() {
    if (!audio) initMusicPlayer();

    if (audio.paused) {
        audio.play();
        document.getElementById('playMusic').innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        document.getElementById('playMusic').innerHTML = '<i class="fas fa-play"></i>';
    }
}

function playNextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    if (!audio.paused) {
        audio.play();
    }
}

function updateMusicProgress() {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('musicProgress').style.width = progress + '%';
    }
}

// Page Transitions
function showPageTransition() {
    const transition = document.getElementById('pageTransition');
    if (transition) {
        transition.classList.add('active');
    }
}

function hidePageTransition() {
    const transition = document.getElementById('pageTransition');
    if (transition) {
        transition.classList.remove('active');
    }
}

// Smooth scrolling with transition
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        showPageTransition();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                setTimeout(hidePageTransition, 500);
            }, 200);
        }
    });
});

// Confetti Effect
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ff6b9d', '#ffd54f', '#ff8a80', '#e1bee7', '#f8bbd9'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti animation to CSS dynamically
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
@keyframes confettiFall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
`;
document.head.appendChild(confettiStyle);

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '2rem';
    notification.style.right = '2rem';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336, #ef5350)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ff6b9d, #ff8a80)';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize particle effects
    createParticles();

    // Initialize music player
    initMusicPlayer();

    // Add sparkle effects to interactive elements
    document.querySelectorAll('.btn, .nav-link, .meeting-card, .journey-card, .future-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            createSparkle(this);
        });
    });

    // Add 3D card effects
    document.querySelectorAll('.meeting-card, .journey-card, .future-card').forEach(card => {
        card.classList.add('card-3d');
    });

    // Music Player event listeners
    document.getElementById('playMusic').addEventListener('click', playMusic);
    document.getElementById('nextTrack').addEventListener('click', playNextTrack);
    document.getElementById('toggleMusicPlayer').addEventListener('click', function() {
        const player = document.getElementById('musicPlayer');
        if (player) {
            player.style.display = player.style.display === 'none' ? '' : 'none';
        }
    });

    // Add click effects to all interactive elements
    document.querySelectorAll('.interactive-element, .btn, .highlight-item').forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    console.log('💕 Enhanced Wedding Love Story website loaded with magic!');
});

// Enhanced scroll animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Animate timeline items
    document.querySelectorAll('.timeline-item, .journey-item').forEach((item, index) => {
        const offset = item.offsetTop - window.innerHeight + 100;

        if (scrolled > offset) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
});

// Love counter animation
function animateLoveCounter() {
    const counter = document.querySelector('.love-counter');
    if (counter) {
        counter.style.animation = 'lovePulse 2s ease-in-out infinite';
    }
}

setInterval(animateLoveCounter, 2000);
