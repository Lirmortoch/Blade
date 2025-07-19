Element.prototype.clearHTMLElement = function() {
    this.innerHTML = '';
    return this;
}
Element.prototype.appendElement = function(elem) {
    if (/(^<.+>[\n\s+.]+<\/.+>|.+$)/gmi.test(elem)) this.insertAdjacentHTML('afterbegin', elem);
    else this.textContent = elem;
}
function hidePopUp(e) {
    const btn = e.target.closest('.pop-up__close-btn');

    if (!btn) return;

    const title = document.querySelector('.pop-up__title');

    if (title.innerHTML.includes('svg')) title.classList.remove('title-check-mark');
    document.querySelector('.pop-up').classList.remove('active');

    document.body.classList.remove('pop-up-lock');
}
function showPopUpContent(e) {
    const btn = e.target.closest('.open-modal-btn');

    if (!btn) return;

    const btnText = (btn.closest('.open-modal-btn-text') || btn.querySelector('.open-modal-btn-text')).textContent.toLowerCase();
    const title = document.querySelector('.pop-up__title');
    const popUp = document.querySelector('.pop-up');

    let elem, titleContent;

    e.preventDefault();

    if (btnText === 'купить') {
        elem = 
            `
                <form class='pop-up__form pop-up-form form tickets-form' action='#' method='POST'>
                        <fieldset class='form__group'>
                            <label class='form__label' for='input-name'>Имя</label>
                            <input class='form__input' type='text' name='input-name' id='input-name' placeholder='Введите имя'>
                        </fieldset>
                        <fieldset class='form__group'>
                            <label class='form__label' for='input-email'>Email</label>
                            <input class='form__input' type='email' name='input-email' id='input-email' placeholder='Введите e-mail'>
                        </fieldset>
                        <fieldset class='form__group'>
                            <legend class='form__label'>Статус билета</legend>
                
                            <div class="form__radio-group">
                                <label class='form__radio-label'>
                                    <input class='form__input-radio' type='radio' name='pop-up-input-radio' id='input-radio-viewer' value='viewer'>
                                    Зритель
                                </label>
                                
                                <label class='form__radio-label'>
                                    <input class='form__input-radio' type='radio' name='pop-up-input-radio' id='input-radio-optimum' value='optimum'>
                                    Оптимум
                                </label>
                                
                                <label class='form__radio-label'>
                                    <input class='form__input-radio' type='radio' name='pop-up-input-radio' id='input-radio-vip' value='vip'>
                                    VIP
                                </label>
                            </div>
                        </fieldset>

                        <button type='submit' class="pop-up__tickets-btn buy-tickets-btn open-modal-btn uppercase">
                            <span class="buy-tickets-btn__text open-modal-btn-text">Бронь билета</span>
                            <span class="buy-tickets-btn__arrow">
                                <img src="../img/icons/arrow.svg" alt="links arrow">
                            </span>
                        </button>
                </form>
            `;


        titleContent = 'Чтобы приобрести билет, заполните форму ниже. Мы свяжемся с вами по вопросу оплаты.';
    }
    else if (/(бронь билета)|(отправить)/.test(btnText)) {
        elem = 
            `
                <p class='pop-up__text pop-up-text'>
                    ${btnText === 'отправить' ? 'Спасибо за ваш вопрос! Ваша заявка в работе. Мы ответим в течение дня обязательно, будьте на связи! ' : 'Спасибо за интерес к Blade Fashion Week 2019! Мы уже готовим ваше персональное приглашение. Скоро сообщим о всех деталях.'}
                </p> 
                <button class='pop-up__close-btn pop-up-button common-button-1 uppercase'>Понятно</button>
            `;
        
        titleContent = '<svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5242 2.84518L10.8988 4.51251L6.0237 9.51152C5.73022 9.81387 5.32363 10 4.87512 10C4.42661 10 4.02003 9.81387 3.72557 9.51152L0.475812 6.17885C0.181355 5.87749 0 5.4609 0 5C0 4.07918 0.727368 3.33366 1.62439 3.33366C2.07388 3.33366 2.47949 3.5198 2.77394 3.82214L4.87512 5.97597L8.60069 2.15482L10.2261 0.488477C10.5195 0.187118 10.9261 0 11.3746 0C12.2726 0 13 0.746504 13 1.66634C13 2.12724 12.8186 2.54382 12.5242 2.84518Z" fill="currentColor"/></svg>';
    }
    else if (btnText === 'задать вопрос') {
        elem = 
            `
                <form class='pop-up__form pop-up-form' action='#' method='POST'>
                        <fieldset class='pop-up-form__group'>
                            <label class='pop-up-form__label' for=''>Имя</label>
                            <input class='pop-up-form__input' type='text' name='input-name' id='input-name' placeholder='Введите имя' required>
                        </fieldset>
                        <fieldset class='pop-up-form__group'>
                            <label class='pop-up-form__label' for='input-email'>Email</label>
                            <input class='pop-up-form__input' type='email' name='input-email' id='input-email' placeholder='Введите e-mail' required>
                        </fieldset>
                        <fieldset class='pop-up-form__group'>             
                            <label for='input-question'>Зритель</label>
                            <input class='pop-up-form__input' type='text' name='input-question' id='input-question'>
                        </fieldset>

                        <button type='submit' class='pop-up-form__submit-btn open-modal-btn-text common-button-1 uppercase'>Отправить</button>
                </form>
            `;

        titleContent = 'Остались вопросы? Спросите нас! Мы ответим!';
    }

    title.clearHTMLElement().appendElement(titleContent);
    document.querySelector('.pop-up__main-part').innerHTML = elem;

    if (titleContent.includes('svg')) title.classList.add('title-check-mark');

    if (window.innerWidth < 1400) {
        document.body.classList.add('pop-up-lock');
        window.scrollTo(0, 0);
    }
    popUp.classList.add('active');

    document.querySelectorAll('.form__input').forEach(item => {
        item.addEventListener('invalid', e => {
            e.preventDefault();
            e.target.parentElement.insertAdjacentHTML('beforeend', `<p class='form__wrong-input-message'>Недопустимое значение поля. Пожалуйста, повторите ввод.</p>`);
        });

        item.addEventListener('focus', e => {
            e.target.parentElement.querySelector('.form__wrong-input-message')?.remove();
        });
    });
}
function createPopUp() {
    document.body.insertAdjacentHTML(
        'beforeend', 
        `<div class='pop-up pop-up-background'>
            <div class="pop-up__block">
                <div class='pop-up__wrap'>
                    <div class='pop-up__header'>
                        <h2 class='pop-up__title pop-up-title pop-up-text'>
                            
                        </h2>
                        <button class='pop-up__close-btn header-close-btn'>
                            <div class='header-close-btn__wrap'></div>
                        </button>
                    </div>
                    <div class='pop-up__main-part'>
                        
                    </div>
                </div>
            </div>
        </div>`
    );
}

createPopUp();

document.addEventListener('click', showPopUpContent);
document.addEventListener('click', hidePopUp);