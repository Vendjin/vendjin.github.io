/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span');
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
    /*function getStaticInformation(parentSelector, activeClass) {
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
    }*/

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
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    const menu = document.querySelector('.menu__field');
    const menuItems = menu.querySelectorAll('.menu__item');


    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transfer = 65;
            this.changeToRUB();
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            // проверка если мы не передали классы для дива, будет автоматом подставляться
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
            `;

            this.parentSelector.append(element);
        }
    }


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            // применяем деструктуризацию
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            });
        });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

// мой вариант
/*class MenuCard {
    constructor(parentElem, img, subtitle, description, total) {
        this.parentElem = parentElem;
        this.img = img;
        this.subtitle = subtitle;
        this.description = description;
        this.total = total;
    }

    addMenuCard () {
        // this.parentElem.firstElementChild.style.maxWidth = `1320px`;
        this.parentElem.firstElementChild.style.flexWrap = `wrap`;
        this.parentElem.firstElementChild.style.gap = `20px`;
        this.parentElem.firstElementChild.innerHTML += `
        <div class="menu__item">
                <img src="${this.img}" alt="${this.img.split('/').slice(-1)}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
                </div>
        </div> `;
    }
}

const newMenuCard = new MenuCard(
    menu,
    'img/tabs/hamburger.jpg',
    'Меню Фастфуд',
    'lorem',
    600);

newMenuCard.addMenuCard();*/

// ручная инициализация класса
/*new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд:' +
    ' больше свежих овощей и фруктов. Продукт активных и здоровых людей.' +
    ' Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item'
).render();

new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки,' +
    ' но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное' +
    ' меню без похода в ресторан!',
    13,
    '.menu .container',
    'menu__item'
).render();

new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов' +
    ' животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество' +
    ' белков за счет тофу и импортных вегетарианских стейков.',
    10,
    '.menu .container',
).render();*/

// пример на axios заполнения карточек меню
/*axios.get('http://localhost:3000/menu')
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
    });*/

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector, modalTimerId){
    const messages = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

// первый вариант с FETCH
    /*function bindPostData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const spinner = document.createElement('img');
            spinner.src = messages.loading;
            spinner.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // устанавливаю spinner после элементов, а не в них
            form.insertAdjacentElement('afterend', spinner);

            const formData = new FormData(form);
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(object)
            }).then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(messages.success);
                    spinner.remove();
                }).catch(() => {
                showThanksModal(messages.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }*/

// FORMS сделанные с помощью fetch
    function bindPostData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const spinner = document.createElement('img');
            spinner.src = messages.loading;
            spinner.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // устанавливаю spinner после элементов, а не в них
            form.insertAdjacentElement('afterend', spinner);

            const formData = new FormData(form);
            /*сначала нашу собранную formData превращаем в массив-массивов formData.entries()
            после превращаем в Object, а его превращаем в JSON*/
            const dataJSON = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', dataJSON)
                .then(data => {
                    console.log(data);
                    showThanksModal(messages.success);
                    spinner.remove();
                }).catch(() => {
                showThanksModal(messages.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }

// FORMS сделанные с помощью XMLHttpRequest
    /*function postDataUseXMLHttpRequest(form){
        form.addEventListener('submit', (event) =>{
            event.preventDefault();

            // блок кода для того что бы сообщение об успехе выводилось в эту же фору
            /!*const statusMessageDiv = document.createElement('div');
            statusMessageDiv.classList.add('status');
            statusMessageDiv.textContent = messages.loading;
            form.append(statusMessageDiv);*!/


            const spinner = document.createElement('img');
            spinner.src = messages.loading;
            spinner.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(spinner);
            form.insertAdjacentElement('afterend', spinner);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // при POST заголовок не нужно давать заголовки в обычном формате не JSON
            // request.setRequestHeader('Content-type', 'multipart/form-data');

            // теперь отправляем данные на сервер в формате JSON
            request.setRequestHeader('Content-type', 'application/json');

            // получить все данные из формы
            const formData = new FormData(form);

            // кусок для JSON, если хотим передавать обычный js object то он не нужен
            const object = {};
            formData.forEach(function (value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            // request.send(formData);
            request.send(json);

            request.addEventListener('load', () =>{
                if (request.status === 200){
                    console.log(request.response);
                    showThanksModal(messages.success);
                    // очистка полей формы, после успеха
                    form.reset();
                    // строчка для удаления сообщения из модального окна
                    // statusMessageDiv.remove();
                    spinner.remove();
                } else{
                    showThanksModal(messages.failure);
                }
            });
        });
    }*/

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModalWindow)(formSelector, modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(formSelector).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)(formSelector);
        }, 4000);
    }

    const form = document.querySelectorAll('form');

    form.forEach(item => {
        bindPostData(item);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModalWindow": () => (/* binding */ closeModalWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModalWindow": () => (/* binding */ openModalWindow)
/* harmony export */ });
function openModalWindow(modalNode, modalTimerId) {
    const modalWindow = document.querySelector(modalNode);

    modalWindow.classList.remove('hide');
    modalWindow.classList.add('show');
    // modalWindow.classList.toggle('show')
    // функционал отключения прокрутки
    document.body.style.overflow = 'hidden';
    // если пользователь сам открыл окно, то оно не будет открываться снова и если таймер был передан
    if (modalTimerId){
        clearInterval(modalTimerId);
    }

}

function closeModalWindow(modalNode) {
    const modalWindow = document.querySelector(modalNode);

    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    // modalWindow.classList.toggle('show');
    document.body.style.overflow = '';
}

function modal(buttonNode, modalNode, modalTimerId){
    const modal = document.querySelector(modalNode);
// const modalCloseBtn = document.querySelector('[data-close]');
    const btnContactUs = document.querySelectorAll(buttonNode);



    btnContactUs.forEach(btn => {
        // как было раньше
        // btn.addEventListener('click', openModalWindow);

        // пример вызова без проверки, мы должны передать в обработчик колбек функцию, которая сама вызывается при клике
        // которая уже вызовет нашу функцию openModalWindow
        // btn.addEventListener('click',() => openModalWindow(modalNode, modalTimerId));

        btn.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('btn')) {
                openModalWindow(modalNode);
            }
        })
    });

    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target.getAttribute('data-close') == '' || target === modal) {
            closeModalWindow(modalNode);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow(modalNode);
        }
    });

// делаем всплывающие окно когда страница пролистана до определенного уровня
// мой вариант, но не продуманно как не работать после закрытия окна
    /*function getHeight() {
        let height = window.getComputedStyle(document.body).height;

        return height.split('.')[0];
    }

    console.log(document.documentElement.scrollTop, Math.trunc(getHeight() * 0.7));

    document.addEventListener('scroll', () =>{
        if (document.documentElement.scrollTop  >= Math.trunc(getHeight() * 0.7)) {
            openModalWindow();
        }
    });*/
    // переносим строку ниже в наш script.js
    // const modalTimerId = setTimeout(openModalWindow, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalNode, modalTimerId);
            // удаляем событие прокрутки, после того как оно выполнилось
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// TABS
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    // i = 0 это стандарт ES6 - значение по умолчание
    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    // сначала скрываем первично слайды, а после отобража ем первый слайд
    hideTabContent();
    showTabContent();

    // а после уже навешиваем обработчи событий
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
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);








/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (timerSelector, deadline) {
    // const deadline = '2023-04-16';

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        let days, hours, minutes, seconds;
        // проверка что бы счетчик не считал после того как дата истечет
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            // (1000 * 60 - кол-во мс в 1 мин) * 60 1в часе) * 24 в сутках) - сколько в сутках миллисекунд
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 / 60) % 60));
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            "total": t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        // устанавливаем обновление интервала каждую секунду 1 сек = 1000 мили сек
        const timeInterval = setInterval(updateClock, 1000);

        // что бы время при старте не мигало время
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // если наш total - deadline = 0 наступила дата, то останавливаем наш интервал
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);



/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
// функция с каким то асинхронным кодом используем асинхрон, для того что бы загружать/выгружать данные
const postData = async (url, dataJSON) => {
    // await - ожидает пока вернется результат запроса
    const result = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: dataJSON
    });

    // .json() – декодирует ответ в формате JSON в обычный js object,
    // тоже ждем пока распарсится json и только потом его вернем
    return await result.json();
};


// получить данные из db.json из меню
// const getResource = async (url) => {
async function getResource(url) {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
}







/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








window.addEventListener('DOMContentLoaded', () => {
    // раньше мы просто передавили колбек функцию
    // const modalTimerId = setTimeout(openModalWindow, 50000);
    // но мы изменили сигнатуру функции, теперь что бы передать в нее аргументы, поставим перед ней callback
    const modalTimerId = setTimeout(
        () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModalWindow)('.modal', modalTimerId),
        50000
    );

    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])(
        '[data-modal]',
        '.modal',
        modalTimerId
    );
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
        '.tabheader__item',
        '.tabcontent',
        '.tabheader__items',
        'tabheader__item_active'
    );
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer','2023-04-16');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map