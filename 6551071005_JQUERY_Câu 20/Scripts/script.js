$(document).ready(function() {
    const slideContainer = $('.slides');
    const images = $('.slides img');
    const imagesPerView = 5;
    const imageWidth = 160 + 10; // Image width + margin
    let currentIndex = 0;
    let autoPlayInterval;

    const totalSlides = images.length - imagesPerView + 1;

    for (let i = 0; i < totalSlides; i++) {
        $('.dots-container').append(`<span class="dot" data-index="${i}"></span>`);
    }
    $('.dot').first().addClass('active');

    function updateSlide(index) {
        currentIndex = index;
        const offset = -index * imageWidth;
        slideContainer.css('transform', `translateX(${offset}px)`);
        
        $('.dot').removeClass('active');
        $('.dot').eq(index).addClass('active');
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= totalSlides) {
                nextIndex = 0;
            }
            updateSlide(nextIndex);
        }, 3000); 
    }

    startAutoPlay();

    $('.prev').click(function() {
        clearInterval(autoPlayInterval);
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = totalSlides - 1;
        }
        updateSlide(newIndex);
        startAutoPlay();
    });

    $('.next').click(function() {
        clearInterval(autoPlayInterval);
        let newIndex = currentIndex + 1;
        if (newIndex >= totalSlides) {
            newIndex = 0;
        }
        updateSlide(newIndex);
        startAutoPlay();
    });

    $('.dot').click(function() {
        clearInterval(autoPlayInterval);
        const index = $(this).data('index');
        updateSlide(index);
        startAutoPlay();
    });

    $('.slideshow-container').hover(
        function() {
            clearInterval(autoPlayInterval);
        },
        function() {
            startAutoPlay();
        }
    );

});
