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

export default modal;
export {closeModalWindow};
export {openModalWindow};
