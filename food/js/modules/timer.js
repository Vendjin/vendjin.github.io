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

export default timer;

