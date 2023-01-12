function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const previous = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const widthSlide = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    //SLIDER v1
    /*showSlides(slideIndex);
        if (slides.length < 10){
            total.textContent = `0${slides.length}`;
        }else{
            total.textContent = `${slides.length}`;
        }
    function showSlides(slideIndex){
        if (slideIndex > slides.length){
            slideIndex = 1;
        }

        if (slideIndex < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = `${slideIndex}`;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    previous.addEventListener('click', () =>{
        plusSlides(-1);
        console.log(slideIndex)
    })

    next.addEventListener('click', () => {
        plusSlides(1);
        console.log(slideIndex)
    })*/

    //SLIDER v2
    // помещаем все наши слайдеры в slidesField для этого надо рассчитать его ширину
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = `${slides.length}`;
        current.textContent = `${slideIndex}`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    // ограничиваем количество показываемых слайдов
    // overflow = 'hidden' - не показывает объекты, которые не попадают в размеры
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = widthSlide;
    });

    // делаем точечки под слайдером
    const indicators = document.createElement('ol');
    const dots = [];
    slider.style.position = 'relative';

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let iter = 0; iter < slides.length; iter++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', iter + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (iter === 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function showNumberSlide(slides, slideIndex, currentPosition) {
        if (slides.length < 10) {
            currentPosition.textContent = `0${slideIndex}`;
        } else {
            currentPosition.textContent = `${slideIndex}`;
        }
    }

    function showCurrentDot(dots, slideIndex) {
        // ставим всем точкам прозрачность по умолчанию
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    next.addEventListener('click', () => {
        // если у нас последний слайд, а это (4слайда * 650) = 2600, то последний слайд получается 2600 - 650
        // а мы работаем с пикселями, те, если мы достигли отметки в 1950px, то отматываем назад
        if (offset === +widthSlide.slice(0, widthSlide.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +widthSlide.slice(0, widthSlide.length - 2);
            console.log(offset)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        showNumberSlide(slides, slideIndex, current);
        /*if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }*/
        showCurrentDot(dots, slideIndex);
    });

    previous.addEventListener('click', () => {
        if (offset === 0) {
            offset = +widthSlide.replace(/\D/g, '') * (slides.length-1);
            // старый вариант через срез
            /*offset = +widthSlide.slice(0, widthSlide.length - 2) * (slides.length - 1);*/
        } else {
            offset -= +widthSlide.slice(0, widthSlide.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showNumberSlide(slides, slideIndex, current);

        showCurrentDot(dots, slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', event => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +widthSlide.slice(0, widthSlide.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            showNumberSlide(slides, slideIndex, current);
            showCurrentDot(dots, slideIndex);
        });
    });

    // мой слайдер
    /*const offerSlider = document.querySelector('.offer__slider');
    const current = document.getElementById('current');
    const total = document.getElementById('total');
    const slide = offerSlider.querySelectorAll('.offer__slide');


    function showOfferSlide(i = 0) {
        slide[i].classList.add('show');
        slide[i].classList.remove('hide');

        current.innerText = `0${i+1}`;
        total.innerText = `0${slide.length}`;
    }

    function hideOfferSlide() {
        slide.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
    }

    hideOfferSlide();
    showOfferSlide();

    function sliderCounter(elem) {
        let counter = 0;
        return function (way) {
            if (way === 'next'){
                if (counter >= elem.length - 1) {
                    counter = -1
                }
                return ++counter;
            } else if (way === 'prev'){
                if (counter <= 0) {
                    counter = elem.length
                }
                return --counter;
            }
        };
    }

    const iterator = sliderCounter(slide);

    offerSlider.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains('offer__slider-prev') || target.getAttribute("alt") === 'prev') {
            hideOfferSlide();
            showOfferSlide(iterator('prev'));
        } else if (target && target.classList.contains('offer__slider-next') || target.getAttribute("alt") === 'next') {
            hideOfferSlide();
            showOfferSlide(iterator('next'));
        }
    });*/
}

export default slider;