// первый слайдер Owl Carousel
// $(document).ready(function () {
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrow_left_icon.svg" alt="left_arrow"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="../icons/arrow_right_icon.svg" alt="right_arrow"></button>',
//         responsive: [
//             {
//                 breakpoint: 769,
//                 settings: {
//                     dots: true,
//                     arrows: false,
//                 },
//             },
//         ],
//     });
// });


const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    // autoplay: true,
    // стрелки из коробки
    // controlsText: [
    //     '<img src="../icons/arrow_left_icon.svg" alt="left_arrow">',
    //     '<img src="../icons/arrow_right_icon.svg" alt="right_arrow">'
    // ]
    // убираем стандартные стрелки
    controls: false,
    // убираем точки
    // nav: false,
});

document.querySelector('.slick-prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.slick-next').addEventListener('click', function () {
    slider.goTo('next');
});

$(document).ready(function () {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings()
            .removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content')
            .removeClass('catalog__content_active').eq($(this).index())
            .addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__front').eq(i).toggleClass('catalog-item__front_active');
                $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
            })
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function (){
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function (){
        $('.overlay, #consultation, #order, #thanks ').fadeOut();
    })

    $('.button_mini').each(function (i){
        $(this).on('click', function () {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    })

    $(window).scroll(function () {
       if ($(this).scrollTop() > 1000) {
           $('.pageup').fadeIn();
        }else {
           $('.pageup').fadeOut();
       }
    });
});
