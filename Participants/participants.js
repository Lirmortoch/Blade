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