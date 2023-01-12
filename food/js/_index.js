/*window.addEventListener('DOMContentLoaded', () => {
    /!*const tabsParent = document.querySelector('.tabheader__items');

    // TABS
    // сначала скрываем первично слайды, а после отображаем первый слайд
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            // перебираем все элементы, что бы получить их индексы и сравниваем
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });*!/


    //TIMER
    /!*setClock('.timer', deadline);*!/


    //MODAL WINDOW
    /!*window.addEventListener('scroll', showModalByScroll);*!/


    // MENU CARD
    /!*getResource('http://localhost:3000/menu')
        .then(data => {
            // применяем деструктуризацию
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            });
        });

    // пример на axios заполнения карточек меню
    /!*axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    '.menu .container'
                ).render()
            });
        });*!/!*!/

    // FORMS
/!*    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindPostData(item);
    });*!/



    //SLIDER
    /!*const slides = document.querySelectorAll('.offer__slide');
    const previous = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const widthSlide = window.getComputedStyle(slidesWrapper).width;
    const slider = document.querySelector('.offer__slider');

    let slideIndex = 1;
    let offset = 0;

    //SLIDER v1
    /!*showSlides(slideIndex);
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
    })*!/

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
        /!*if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }*!/
        showCurrentDot(dots, slideIndex);
    });

    previous.addEventListener('click', () => {
        if (offset === 0) {
            offset = +widthSlide.replace(/\D/g, '') * (slides.length-1);
            // старый вариант через срез
            /!*offset = +widthSlide.slice(0, widthSlide.length - 2) * (slides.length - 1);*!/
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
    });*!/

    // мой слайдер
    /!*const offerSlider = document.querySelector('.offer__slider');
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
    });*!/


    // КАЛЬКУЛЯТОР
    /!*const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;


    // устанавливаем стартовые значение по умолчанию в localStorage
    if (localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio',ratio);
    }


    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = `____`;
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }
    // тут вызываем расчет, что бы показало изначальное пустое значение
    calcTotal();

    // делаю функцию тк блоки пол и физическая активность в принципе похожи по своей сущности, только разный текст
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', event => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })

                event.target.classList.add(activeClass);

                // вызываем каждый раз calcTotal(); для того, что бы перерасчеты производились после каждого изменения
                calcTotal();
            });
        });
    }
    // из-за делегирования получается баг, что можно выбрать и пустые пространства, поэтому придется отказаться
    /!*function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        document.querySelector(parentSelector).addEventListener('click', event =>{
            if (event.target.getAttribute('data-ratio')){
                ratio = +event.target.getAttribute('data-ratio');
            } else {
                sex = event.target.getAttribute('id');
            }
            console.log(ratio, sex);

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            })

            event.target.classList.add(activeClass);

            // вызываем каждый раз calcTotal(); для того, что бы перерасчеты произовдились после каждого изменения
            calcTotal();
        });
    }*!/

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () =>{
            // проверка на то что были введены только цифры
            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');*!/


});*/
