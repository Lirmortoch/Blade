function closePopUp(e) {

}
function createPopUpContent() {
    const btnText = document.querySelector('.pop-up-open-btn-text');
    
    if (btnText.toLowerCase() === 'купить') {

    }
    else if (btnText.toLowerCase() === 'бронь билета') {
        
    }
    else if (btnText.toLowerCase() === 'отправить') {
        
    }
}
function createPopUp(e) {
    if (!e.target.classList.contains('pop-up-open-btn')) return;

    const popUp = 
    `<div class='pop-up pop-up-background'>
        <div class="pop-up__block">
            <div class='pop-up__wrap'>
                <div class='pop-up__header'>
                    <h2 class='pop-up__title'>
                        
                    </h2>
                    <button class='pop-up__close-btn'></button>
                </div>
                <div class='pop-up__main-part'>
                    <p class='pop-up__text'>
                        
                    </p>
                    <button class='pop-up__close-btn'></button>

                    <form class='pop-up__form pop-up-form'>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>`;
}