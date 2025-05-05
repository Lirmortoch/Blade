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

// Switch language 
function switchLanguage(e) {
    let closestElem = e.target.closest('.language-btn:not(.language-btn.current-language)');

    if (!closestElem || e.target.classList.contains('current-language')) return;

    let target = e.target.value ? e.target : closestElem;

    const prevLanguage = document.querySelector('.current-language');
    const buttonLanguage = document.querySelector('.dropdown__button');

    prevLanguage.classList.remove('current-language');
    buttonLanguage.innerHTML = target.value + '<span class="lang-switch-btn__arrow caret caret__rotate"></span>';
    
    target.classList.add('current-language');
}

document.addEventListener('click', switchLanguage);

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

function mobileSwitchLanguage(e) {
    if (!e.target.classList.contains('mobile-lang-switch__button') || e.target.classList.contains('current-language-mobile')) return;

    document.querySelector('.current-language-mobile').classList.remove('current-language-mobile');
    e.target.classList.add('current-language-mobile');
}

document.addEventListener('click', mobileSwitchLanguage);