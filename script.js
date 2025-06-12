document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');

    // Preloader 
    const preLoader = document.querySelector('.pre-loader');
    const circleReveal = document.querySelector('.circle-reveal');
    const copyElement = document.querySelector('.copy');

    function startLoader() {
        console.log('Starting loader');
        
        // Start the circle reveal animation
        setTimeout(() => {
            circleReveal.style.clipPath = 'circle(100% at 50% 50%)';
        }, 100);

        // Fade out loader after animation completes
        setTimeout(fadeOutLoader, 2500);
    }

    function fadeOutLoader() {
        console.log('Fading out loader');
        
        if (copyElement) {
            copyElement.style.transition = 'opacity 0.5s';
            copyElement.style.opacity = 0;
        }

        if (preLoader) {
            preLoader.style.transition = 'opacity 1.5s';
            preLoader.style.opacity = 0;

            setTimeout(() => {
                preLoader.remove();
                console.log('Preloader removed from DOM');
            }, 1500);
        } else {
            console.error('Preloader element not found');
        }
    }

    // Start the loader
    if (preLoader) {
        startLoader();
    } else {
        console.error('Preloader not found, skipping loader start');
    }

    // IMAGE ZOOM-IN
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentImages = [];
    let currentImageIndex = 0;

    function showImage(index) {
        currentImageIndex = index;
        modalImg.src = currentImages[index].src;
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
            setTimeout(() => modalImg.classList.add('show'), 50);
        }, 10);
    }

    function closeModal() {
        modalImg.classList.remove('show');
        setTimeout(() => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }, 200);
    }

    function setupGallery(gridClass) {
        const images = document.querySelectorAll(`.${gridClass} img`);
        images.forEach((img, index) => {
            img.onclick = function() {
                currentImages = Array.from(images);
                showImage(index);
            }
        });
    }

    // Setup galleries for all showcase grids
    setupGallery('showcase-grid-ts');
    setupGallery('showcase-grid-gl');
    setupGallery('showcase-grid-sg');

    if (closeBtn) closeBtn.onclick = closeModal;
    if (prevBtn) prevBtn.onclick = () => showImage((currentImageIndex - 1 + currentImages.length) % currentImages.length);
    if (nextBtn) nextBtn.onclick = () => showImage((currentImageIndex + 1) % currentImages.length);

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('show')) {
            if (e.key === "ArrowLeft") {
                prevBtn.click();
            } else if (e.key === "ArrowRight") {
                nextBtn.click();
            } else if (e.key === "Escape") {
                closeModal();
            }
        }
    });

     // SCROLL ANIMATION
     function handleScrollAnimation() {
        const workBoxes = document.querySelectorAll('.work-box, .work-container, .info, .showcase-grid-gl, .showcase-grid-sg, .showcase-grid-ts');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        workBoxes.forEach(box => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(50px)';
            box.style.transition = 'opacity 1.5s ease, transform 1.5s ease'; // Increased from 0.5s to 1.5s
            observer.observe(box);
        });
    }

    // Call the function to set up scroll animation
    handleScrollAnimation();
});