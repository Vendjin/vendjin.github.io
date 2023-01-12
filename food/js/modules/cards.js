import {getResource} from "../services/services";

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


    getResource('http://localhost:3000/menu')
        .then(data => {
            // применяем деструктуризацию
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            });
        });

}

export default cards;

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