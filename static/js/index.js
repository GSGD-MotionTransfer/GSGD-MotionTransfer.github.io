window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 4500,
        pagination: false,
        navigation: true,
        navigationSwipe: true,
        breakpoints: [],
        effect: 'translate',
        duration: 400,
        timing: 'ease',
        centerMode: true,
        centerPadding: '0px'
    };

    var carousels = bulmaCarousel.attach('#method-carousel', options);

    function updateCarouselHeight(carousel) {
        try {
            var current = carousel.slides[carousel.state.index];
            if (!current) return;
            var h = current.getBoundingClientRect().height || current.offsetHeight || current.scrollHeight;
            if (h && h > 0) {
                carousel.container.style.height = h + 'px';
            }
        } catch (e) {
            // no-op
        }
    }

    carousels.forEach(carousel => {
        const node = carousel.wrapper;

        // Autoplay only while hovering ("spinning")
        node.addEventListener('mouseenter', () => {
            carousel.options.autoplay = true;
            carousel.start();
        });
        node.addEventListener('mouseleave', () => {
            carousel.stop();
            carousel.options.autoplay = false;
        });

        // Ensure proper height once images are loaded and on slide changes
        const imgs = carousel.element.querySelectorAll('img');
        imgs.forEach(img => {
            if (img.complete) {
                setTimeout(() => updateCarouselHeight(carousel), 0);
            } else {
                img.addEventListener('load', () => updateCarouselHeight(carousel));
            }
        });

        carousel.on('before:show', () => updateCarouselHeight(carousel));
        window.addEventListener('resize', () => updateCarouselHeight(carousel));

        // Initial height pass
        setTimeout(() => updateCarouselHeight(carousel), 0);
    });

    bulmaSlider.attach();
});