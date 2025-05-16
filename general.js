// for dropdowns
function keepOpenDropMenu(e) {
    const isDropDownButton = e.target.matches('[data-dropdown-button], [data-dropdown-button] > *');

    if (!isDropDownButton && e.target.closest('[data-dropdown]') !== null) return;

    let currentDropDown;

    if (isDropDownButton) {
        currentDropDown = e.target.closest('[data-dropdown]');
        currentDropDown.classList.toggle('active');
        currentDropDown.querySelector('.caret').classList.toggle('caret__rotate'); 
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropDown => {
       if (dropDown === currentDropDown) return;
       
       dropDown.classList.remove('active');
       dropDown.querySelector('.caret').classList.toggle('caret__rotate');
    });
}

document.addEventListener('click', keepOpenDropMenu);

// Switch language (Хрень, надо просто как-то обновлять состояние)
function switchLanguage(e) {
    const closestElem = e.target.closest('.language-btn:not(.language-btn.current-language)');

    if (!closestElem || e.target.classList.contains('current-language')) return;

    const targetElems = document.querySelectorAll('.language-btn:not(.language-btn.current-language)');
    const prevLangElems = document.querySelectorAll('.language-btn.current-language');

    const target = e.target.value ? e.target : closestElem;
    const buttonLanguage = document.querySelector('.dropdown__button');

    targetElems.forEach((item, i) => {
        item.classList.toggle('current-language');
        prevLangElems[i].classList.toggle('current-language');

        item.classList.toggle(`current-language-${item.className.match(/desk|mobile/m)[0]}`);
        prevLangElems[i].classList.toggle(`current-language-${prevLangElems[i].className.match(/desk|mobile/m)[0]}`);
    });

    if (target.parentElement.className.match(/desk|mobile/m)[0] === 'mobile') {
        buttonLanguage.innerHTML = target.value + '<span class="desk-lang-switch-btn__arrow caret"></span>';
    }
    else {
        buttonLanguage.innerHTML = target.value + '<span class="desk-lang-switch-btn__arrow caret caret__rotate"></span>';
    }

    buttonLanguage.value = target.value;
}

document.addEventListener('click', switchLanguage);

// Mobile menu
function toggleMobileMenu(e) {
    const closestElem = e.target.closest('.menu__toggler');

    if (!closestElem) return;

    const nav = document.querySelector('.header__menu');
    const navIcon = closestElem.tagName === 'BUTTON' ? closestElem : closestElem.parentElement;
    const mobileHeaderBack = document.querySelector('.menu__mobile-back');
    const mobLangSwitch = document.querySelector('.mobile-lang-switch');

    nav.classList.toggle('active-mobile');
    navIcon.classList.toggle('active-mobile');
    mobileHeaderBack.classList.toggle('active-mobile');
    mobLangSwitch.classList.toggle('active-mobile');
    
    document.querySelector('body').classList.toggle('mobile-lock');
}

document.addEventListener('click', toggleMobileMenu);