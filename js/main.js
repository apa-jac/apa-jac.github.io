(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    $('#pix-button').on('click', function() {
      navigator.clipboard.writeText('14.483.016/0001-07');
      alert("PIX copiado!");
    })


    if ($('.portfolio-container').length > 0) {
      // Portfolio isotope and filter
      var portfolioIsotope = $('.portfolio-container').isotope({
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function () {
          $("#portfolio-flters li").removeClass('active');
          $(this).addClass('active');

          portfolioIsotope.isotope({filter: $(this).data('filter')});
      });
    }
})(jQuery);

