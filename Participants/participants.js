function setTopForStyles() {
    document.querySelectorAll('.participant-item__style').forEach(item => {
        item.style.top = `${(item.clientWidth + 2) / 2}px`;
    });
}

setTopForStyles();

// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     // код для мобильных устройств
// } 
// else {
//     // код для обычных устройств
// }

const participantItemCount = document.querySelectorAll('.participant-item').length;

function createPagnitation() {
    const paginationBlock = document.querySelector('.carousel__pagnitation');
    const paginationItem = '<div class=\'carousel-pagnitation__item active\'></div>';

    paginationBlock.innerHTML += paginationItem + paginationItem.replace('active', '').repeat(participantItemCount-1);
}

createPagnitation();

let itemCount = 1;

function mainSliderNextSlide(e) {
    const closestElem = e.target.closest('.carousel__right-key');

    if (!closestElem) return;

    if (itemCount < participantItemCount) itemCount++;

    const carouselWrap = document.querySelector('.carousel__wrap');
    const slide = document.querySelector(`.carousel-item:nth-child(${itemCount})`);
    const leftButton = document.querySelector('.carousel__left-key');

    let scrollValue;

    if (window.innerWidth >= 1920) {
        scrollValue = carouselWrap.getBoundingClientRect().width + (48 * 2);
    }
    if (window.innerWidth >= 1300 && window.innerWidth < 1920) {
        scrollValue = carouselWrap.getBoundingClientRect().width + 48;
    }
    if (window.innerWidth > 999 && window.innerWidth < 1300) {
        scrollValue = window.innerWidth;
    }
    if (window.innerWidth <= 999) {
        scrollValue = slide.offsetLeft - carouselWrap.scrollLeft - (carouselWrap.offsetWidth / 2 - slide.offsetWidth / 2);
    }

    carouselWrap.scrollLeft += Math.abs(scrollValue);

    if (itemCount === participantItemCount) closestElem.classList.add('hidden-carousel-btn');

    leftButton.classList.remove('hidden-carousel-btn');
}
function mainSliderPrevSlide(e) {
    const closestElem = e.target.closest('.carousel__left-key');

    if (!closestElem) return;

    if (itemCount > 0) itemCount--;

    const carouselWrap = document.querySelector('.carousel__wrap');
    const slide = document.querySelector(`.carousel-item:nth-child(${itemCount})`);
    const rightButton = document.querySelector('.carousel__right-key');

    let scrollValue;

    if (window.innerWidth >= 1920) {
        scrollValue = carouselWrap.getBoundingClientRect().width + (48 * 2);
    }
    if (window.innerWidth >= 1300 && window.innerWidth < 1920) {
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

function smallSliderNextSlide(e) {
    const closestElem = e.target.closest('.participant-carousel__right-key');

    if (!closestElem) return;

    const carouselWrap = closestElem.parentElement.parentElement.querySelector('.participant-item__carousel');

    carouselWrap.scrollLeft += carouselWrap.clientWidth;
}
function smallSliderPrevSlide(e) {
    const closestElem = e.target.closest('.participant-carousel__left-key');

    if (!closestElem) return;

    const carouselWrap = closestElem.parentElement.parentElement.querySelector('.participant-item__carousel');

    carouselWrap.scrollLeft -= carouselWrap.clientWidth;
}

document.addEventListener('click', smallSliderNextSlide);
document.addEventListener('click', smallSliderPrevSlide);