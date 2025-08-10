function setTopForStyles() {    
    document.querySelectorAll('.participant-item__style').forEach(item => {
        if (window.innerWidth > 599) item.style.top = `${(item.clientWidth + 2) / 2}px`;
        if (window.innerWidth < 600 && item.clientWidth > 250) {
            item.style.width = 'fit-content';
            item.style.left = '-18px';
        }
    });
}

setTopForStyles();

function smallSliderNextSlide(e) {
    const closestElem = e.target.closest('.participant-carousel__right-key');

    if (!closestElem) return;

    const carouselWrap = closestElem.parentElement.parentElement.querySelector('.carousel__wrap.small-carousel__wrap');

    carouselWrap.scrollLeft += carouselWrap.clientWidth;
}
function smallSliderPrevSlide(e) {
    const closestElem = e.target.closest('.participant-carousel__left-key');

    if (!closestElem) return;

    const carouselWrap = closestElem.parentElement.parentElement.querySelector('.carousel__wrap.small-carousel__wrap');

    carouselWrap.scrollLeft -= carouselWrap.clientWidth;
}

document.addEventListener('click', smallSliderNextSlide);
document.addEventListener('click', smallSliderPrevSlide);