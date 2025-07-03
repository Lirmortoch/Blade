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

// Switch language (Хрень, надо просто как-то обновлять состояние и делать рефреш везде на каждой странице)
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

// Carousel
const carouselItemCount = document.querySelectorAll('.carousel-item').length;

function createPagnitation() {
    const paginationBlock = document.querySelector('.carousel__pagnitation');
    const paginationItem = '<div class=\'carousel-pagnitation__item active\'></div>';

    paginationBlock.innerHTML += paginationItem + paginationItem.replace('active', '').repeat(carouselItemCount-1);
}
createPagnitation();

const carouselWrap = document.querySelector('.carousel__wrap');
let itemCount = 1;

function mainSliderNextSlide(e) {
    const closestElem = e.target.closest('.carousel__right-key');

    if (!closestElem) return;

    if (itemCount < carouselItemCount) itemCount++;

    const slide = document.querySelector(`.carousel-item:nth-child(${itemCount})`);
    const leftButton = document.querySelector('.carousel__left-key');

    let scrollValue;

    if (window.innerWidth >= 1300) {
        scrollValue = carouselWrap.getBoundingClientRect().width + 48;
    }
    if (window.innerWidth > 999 && window.innerWidth < 1300) {
        scrollValue = window.innerWidth;
    }
    if (window.innerWidth <= 999) {
        scrollValue = slide.offsetLeft - carouselWrap.scrollLeft - (carouselWrap.offsetWidth / 2 - slide.offsetWidth / 2);
    }

    carouselWrap.scrollLeft += Math.abs(scrollValue);

    if (itemCount === carouselItemCount) closestElem.classList.add('hidden-carousel-btn');

    leftButton.classList.remove('hidden-carousel-btn');
}
function mainSliderPrevSlide(e) {
    const closestElem = e.target.closest('.carousel__left-key');

    if (!closestElem) return;

    if (itemCount > 0) itemCount--;

    const slide = document.querySelector(`.carousel-item:nth-child(${itemCount})`);
    const rightButton = document.querySelector('.carousel__right-key');

    let scrollValue;

    if (window.innerWidth >= 1300) {
        scrollValue = carouselWrap.getBoundingClientRect().width + 48;
    }
    if (window.innerWidth > 999 && window.innerWidth < 1300) {
        scrollValue = window.innerWidth;
    }
    if (window.innerWidth <= 999) {
        scrollValue = slide.offsetLeft - carouselWrap.scrollLeft - (carouselWrap.clientWidth / 2 - slide.offsetWidth / 2);
    }
    
    carouselWrap.scrollLeft -= Math.abs(scrollValue);
 
    if (itemCount === 1) closestElem.classList.add('hidden-carousel-btn');

    rightButton.classList.remove('hidden-carousel-btn');
}

document.addEventListener('click', mainSliderNextSlide);
document.addEventListener('click', mainSliderPrevSlide);

// For swipe and pagination (не хватает учёта большего свайпа)
function swipeSliderToRight() {
    if (itemCount < carouselItemCount) itemCount++;

    document.querySelector('.carousel-pagnitation__item.active').classList.remove('active');
    document.querySelector(`.carousel-pagnitation__item:nth-child(${itemCount})`).classList.add('active');
}
function swipeSliderToLeft() {
    if (itemCount > 1) itemCount--;

    document.querySelector('.carousel-pagnitation__item.active').classList.remove('active');
    document.querySelector(`.carousel-pagnitation__item:nth-child(${itemCount})`).classList.add('active');
}

let touchStartX = 0;
let touchEndX = 0;

function checkDirection() {
    if (touchEndX < touchStartX) swipeSliderToRight();
    if (touchEndX > touchStartX) swipeSliderToLeft();
}

function touchStartFnc(e) {
    touchStartX = e.changedTouches[0].screenX;
}
function touchEndFnc(e) {
    touchEndX = e.changedTouches[0].screenX;
    checkDirection();
}

carouselWrap.addEventListener('touchstart', touchStartFnc);
carouselWrap.addEventListener('touchend', touchEndFnc);