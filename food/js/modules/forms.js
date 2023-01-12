import {openModalWindow} from "./modal";
import {closeModalWindow} from "./modal";
import {postData} from "../services/services";

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

            postData('http://localhost:3000/requests', dataJSON)
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
        openModalWindow(formSelector, modalTimerId);

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
            closeModalWindow(formSelector);
        }, 4000);
    }

    const form = document.querySelectorAll('form');

    form.forEach(item => {
        bindPostData(item);
    });
}

export default forms;
