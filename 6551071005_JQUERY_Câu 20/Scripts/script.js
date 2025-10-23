$(document).ready(function() {
    // Variables
    const slideContainer = $('.slides');
    const images = $('.slides img');
    const imagesPerView = 5;
    const imageWidth = 160 + 10; // Image width + margin
    let currentIndex = 0;
    let autoPlayInterval;

    // Calculate total number of slides
    const totalSlides = images.length - imagesPerView + 1;

    // Create navigation dots
    for (let i = 0; i < totalSlides; i++) {
        $('.dots-container').append(`<span class="dot" data-index="${i}"></span>`);
    }
    $('.dot').first().addClass('active');

    // Function to update slide position
    function updateSlide(index) {
        currentIndex = index;
        const offset = -index * imageWidth;
        slideContainer.css('transform', `translateX(${offset}px)`);
        
        // Update active dot
        $('.dot').removeClass('active');
        $('.dot').eq(index).addClass('active');
    }

    // Auto play function
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= totalSlides) {
                nextIndex = 0;
            }
            updateSlide(nextIndex);
        }, 3000); // Change slide every 3 seconds
    }

    // Start auto play initially
    startAutoPlay();

    // Previous button click
    $('.prev').click(function() {
        clearInterval(autoPlayInterval);
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = totalSlides - 1;
        }
        updateSlide(newIndex);
        startAutoPlay();
    });

    // Next button click
    $('.next').click(function() {
        clearInterval(autoPlayInterval);
        let newIndex = currentIndex + 1;
        if (newIndex >= totalSlides) {
            newIndex = 0;
        }
        updateSlide(newIndex);
        startAutoPlay();
    });

    // Dot navigation click
    $('.dot').click(function() {
        clearInterval(autoPlayInterval);
        const index = $(this).data('index');
        updateSlide(index);
        startAutoPlay();
    });

    // Pause auto play on hover
    $('.slideshow-container').hover(
        function() {
            clearInterval(autoPlayInterval);
        },
        function() {
            startAutoPlay();
        }
    );
});