import tabs from './modules/tabs';
import modal, {openModalWindow} from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener('DOMContentLoaded', () => {
    // раньше мы просто передавили колбек функцию
    // const modalTimerId = setTimeout(openModalWindow, 50000);
    // но мы изменили сигнатуру функции, теперь что бы передать в нее аргументы, поставим перед ней callback
    const modalTimerId = setTimeout(
        () => openModalWindow('.modal', modalTimerId),
        50000
    );

    modal(
        '[data-modal]',
        '.modal',
        modalTimerId
    );
    tabs(
        '.tabheader__item',
        '.tabcontent',
        '.tabheader__items',
        'tabheader__item_active'
    );
    timer('.timer','2023-04-16');
    cards();
    forms('.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
});