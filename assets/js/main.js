
/*---------------------------
      Table of Contents
    --------------------
    01- Pre Loading
    02- Mobile Menu
    03- Sticky Navbar
    04- Scroll Top Button
    05- Close Topbar
    06- Set Background-img to section 
    07- Add active class to accordions
    08- Contact Form validation
    09- Slick Carousel
    10- Popup Video
    11- Progress bars
    12- NiceSelect Plugin
    13- Range Slider
     
 ----------------------------*/

$(function () {

    "use strict";

    // Global variables
    var $win = $(window);

    /*==========  Pre Loading   ==========*/
    setTimeout(function () {
        $(".preloader").remove();
    }, 2000);

    /*==========   Mobile Menu   ==========*/
    $('.navbar-toggler').on('click', function () {
        $('.navbar-collapse').addClass('menu-opened');
    })

    $('.close-mobile-menu').on('click', function (e) {
        $('.navbar-collapse').removeClass('menu-opened');
    });

    /*==========   Sticky Navbar   ==========*/
    $win.on('scroll', function () {
        if ($win.width() >= 992) {
            var $stickyNavbar = $('.sticky-navbar'),
                $secondaryNavbar = $('.secondary-nav');
            if ($win.scrollTop() > 150) {
                $stickyNavbar.addClass('is-sticky');
            } else {
                $stickyNavbar.removeClass('is-sticky');
            }
            if ($secondaryNavbar.length) {
                if ($win.scrollTop() > $secondaryNavbar.offset().top - 100) {
                    $secondaryNavbar.addClass('secondary-nav-sticky');
                } else {
                    $secondaryNavbar.removeClass('secondary-nav-sticky');
                }
            }
        }
    });

    /*==========   Scroll Top Button   ==========*/
    var $scrollTopBtn = $('#scrollTopBtn');
    // Show Scroll Top Button
    $win.on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $scrollTopBtn.addClass('actived');
        } else {
            $scrollTopBtn.removeClass('actived');
        }
    });
    // Animate Body after Clicking on Scroll Top Button
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /*==========   Set Background-img to section   ==========*/
    $('.bg-img').each(function () {
        var imgSrc = $(this).children('img').attr('src');
        $(this).parent().css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover',
            'background-position': 'center',
        });
        $(this).parent().addClass('bg-img');
        if ($(this).hasClass('background-size-auto')) {
            $(this).parent().addClass('background-size-auto');
        }
        $(this).remove();
    });

    /*==========   Add active class to accordions   ==========*/
    $('.accordion-item__header').on('click', function () {
        $(this).parent('.accordion-item').addClass('opened');
        $(this).parent('.accordion-item').siblings().removeClass('opened');
    })
    $('.accordion-item__title').on('click', function (e) {
        e.preventDefault()
    });

    /*==========  Open and Close Popup   ==========*/
    // open Mini Popup
    function openMiniPopup(popupTriggerBtn, popup, cssClass) {
        $(popupTriggerBtn).on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass(cssClass);
            $(popup).toggleClass(cssClass);
        });
    }
    // open Popup
    function openPopup(popupTriggerBtn, popup, addedClass, removedClass) {
        $(popupTriggerBtn).on('click', function (e) {
            e.preventDefault();
            $(popup).toggleClass(addedClass, removedClass).removeClass(removedClass);
        });
    }
    // Close Popup
    function closePopup(closeBtn, popup, addedClass, removedClass) {
        $(closeBtn).on('click', function () {
            $(popup).removeClass(addedClass).addClass(removedClass);
        });
    }
    // close popup when clicking on an other place on the Document
    function closePopupFromOutside(popup, stopPropogationElement, popupTriggerBtn, removedClass, addedClass) {
        $(document).on('mouseup', function (e) {
            if (!$(stopPropogationElement).is(e.target) && !$(popupTriggerBtn).is(e.target) && $(stopPropogationElement).has(e.target).length === 0 && $(popup).has(e.target).length === 0) {
                $(popup).removeClass(removedClass).addClass(addedClass);
            }
        });
    }
    openMiniPopup('.miniPopup-emergency-trigger', '#miniPopup-emergency', 'active') // Open miniPopup-emergency
    openMiniPopup('#miniPopup-departments-trigger-icon', '#miniPopup-departments', 'active') // Open miniPopup-emergency

    openPopup('.action__btn-search', '.search-popup', 'active', 'inActive') // Open sidenav popup
    closePopup('.search-popup__close', '.search-popup', 'active', 'inActive') // Close sidenav popup
    openPopup('.action__btn-cart', '.cart-minipopup', 'active', 'inActive') // Open Search popup
    closePopupFromOutside('.cart-minipopup', '.cart-minipopup', '.action__btn-cart', 'active');  // close popup when clicking on an other place on the Document

    // Close topbar
    $('#close-topbar').on('click', function () {
        $('#header-topbar').fadeOut();
    });

    /*==========   Increase and Decrease Input Value   ==========*/
    // Increase Value
    $('.increase-qty').on('click', function () {
        var $qty = $(this).parent().find('.input-number');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });
    // Decrease Value
    $('.decrease-qty').on('click', function () {
        var $qty = $(this).parent().find('.input-number');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });

    /*==========  Contact Form validation  ==========*/
    var contactForm = $("#contactForm"),
        contactResult = $('.contact-result');
    contactForm.validate({
        debug: false,
        submitHandler: function (contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/contact.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function (msg) {
                    $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });

    /*==========   Slick Carousel ==========*/
    $('.slick-carousel').slick();

    /*==========  Popup Video  ==========*/
    $('.popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });
    $('.popup-gallery-item').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    /*==========  NiceSelect Plugin  ==========*/
    $('select').niceSelect();

    /*==========   Range Slider  ==========*/
    var $rangeSlider = $("#rangeSlider"),
        $rangeSliderResult = $("#rangeSliderResult");
    $rangeSlider.slider({
        range: true,
        min: 0,
        max: 300,
        values: [50, 200],
        slide: function (event, ui) {
            $rangeSliderResult.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $rangeSliderResult.val("$" + $rangeSlider.slider("values", 0) + " - $" + $rangeSlider.slider("values", 1));

    /*==========   portfolio Filtering and Sorting  ==========*/
    $("#filtered-items-wrap").mixItUp();
    $(".portfolio-filter li a").on("click", function (e) {
        e.preventDefault();
    });

    /*==========   Load More Items  ==========*/
    function loadMore(loadMoreBtn, loadedItem) {
        $(loadMoreBtn).on('click', function (e) {
            e.preventDefault();
            $(this).fadeOut();
            $(loadedItem).fadeIn();
        })
    }
    loadMore('.loadMoreportfolio', '.portfolio-hidden > .portfolio-item');
    loadMore('.loadMoreGallery', '.gallery-hidden > .gallery-img');
});