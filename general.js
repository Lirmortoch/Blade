function keepOpenDropMenu(e){const isDropDownButton=e.target.matches('[data-dropdown-button], [data-dropdown-button] > *');if(!isDropDownButton&&e.target.closest('[data-dropdown]')!==null)return;let currentDropDown;if(isDropDownButton){currentDropDown=e.target.closest('[data-dropdown]');currentDropDown.classList.toggle('active');currentDropDown.querySelector('.caret').classList.toggle('caret__rotate')}
document.querySelectorAll('[data-dropdown].active').forEach(dropDown=>{if(dropDown===currentDropDown)return;dropDown.classList.remove('active');dropDown.querySelector('.caret').classList.toggle('caret__rotate')})}
document.addEventListener('click',keepOpenDropMenu);function switchLanguage(e){const closestElem=e.target.closest('.language-btn:not(.language-btn.current-language)');if(!closestElem||e.target.classList.contains('current-language'))return;const targetElems=document.querySelectorAll('.language-btn:not(.language-btn.current-language)');const prevLangElems=document.querySelectorAll('.language-btn.current-language');const target=e.target.value?e.target:closestElem;const buttonLanguage=document.querySelector('.dropdown__button');targetElems.forEach((item,i)=>{item.classList.toggle('current-language');prevLangElems[i].classList.toggle('current-language');item.classList.toggle(`current-language-${item.className.match(/desk|mobile/m)[0]}`);prevLangElems[i].classList.toggle(`current-language-${prevLangElems[i].className.match(/desk|mobile/m)[0]}`)});if(target.parentElement.className.match(/desk|mobile/m)[0]==='mobile'){buttonLanguage.innerHTML=target.value+'<span class="desk-lang-switch-btn__arrow caret"></span>'}else{buttonLanguage.innerHTML=target.value+'<span class="desk-lang-switch-btn__arrow caret caret__rotate"></span>'}
buttonLanguage.value=target.value}
document.addEventListener('click',switchLanguage);function toggleMobileMenu(e){const closestElem=e.target.closest('.menu__toggler');if(!closestElem)return;const nav=document.querySelector('.header__menu');const navIcon=closestElem.tagName==='BUTTON'?closestElem:closestElem.parentElement;const mobileHeaderBack=document.querySelector('.menu__mobile-back');const mobLangSwitch=document.querySelector('.mobile-lang-switch');nav.classList.toggle('active-mobile');navIcon.classList.toggle('active-mobile');mobileHeaderBack.classList.toggle('active-mobile');mobLangSwitch.classList.toggle('active-mobile');document.querySelector('body').classList.toggle('mobile-lock')}
document.addEventListener('click',toggleMobileMenu);const carouselItemCount=document.querySelectorAll('.carousel-item').length;function createPagination(){const paginationBlock=document.querySelector('.carousel__pagnitation');const paginationItem='<div class=\'carousel-pagnitation__item active\'></div>';paginationBlock?.insertAdjacentHTML('beforeend',paginationItem+paginationItem.replace('active','').repeat(carouselItemCount-1))}
createPagination();const carouselWrap=document.querySelector('.carousel__wrap.big-carousel__wrap');let itemCount=1;function mainSliderNextSlide(e){const closestElem=e.target.closest('.carousel__right-key');if(!closestElem)return;if(itemCount<carouselItemCount)itemCount++;const slide=document.querySelector(`.carousel-item:nth-child(${itemCount})`);const leftButton=document.querySelector('.carousel__left-key');let scrollValue;if(window.innerWidth>=1300){scrollValue=carouselWrap.getBoundingClientRect().width+48}
if(window.innerWidth>999&&window.innerWidth<1300){scrollValue=window.innerWidth}
if(window.innerWidth<=999){scrollValue=slide.offsetLeft-carouselWrap.scrollLeft-(carouselWrap.offsetWidth/2-slide.offsetWidth/2)}
carouselWrap.scrollLeft+=Math.abs(scrollValue);if(itemCount===carouselItemCount)closestElem.classList.add('hidden-carousel-btn');leftButton.classList.remove('hidden-carousel-btn')}
function mainSliderPrevSlide(e){const closestElem=e.target.closest('.carousel__left-key');if(!closestElem)return;if(itemCount>0)itemCount--;const slide=document.querySelector(`.carousel-item:nth-child(${itemCount})`);const rightButton=document.querySelector('.carousel__right-key');let scrollValue;if(window.innerWidth>=1300){scrollValue=carouselWrap.getBoundingClientRect().width+48}
if(window.innerWidth>999&&window.innerWidth<1300){scrollValue=window.innerWidth}
if(window.innerWidth<=999){scrollValue=slide.offsetLeft-carouselWrap.scrollLeft-(carouselWrap.clientWidth/2-slide.offsetWidth/2)}
carouselWrap.scrollLeft-=Math.abs(scrollValue);if(itemCount===1)closestElem.classList.add('hidden-carousel-btn');rightButton.classList.remove('hidden-carousel-btn')}
document.addEventListener('click',mainSliderNextSlide);document.addEventListener('click',mainSliderPrevSlide);function smallSliderNextSlide(e){const closestElem=e.target.closest('.small-carousel__right-key');if(!closestElem)return;const carouselWrap=closestElem.parentElement.parentElement.querySelector('.carousel__wrap.small-carousel__wrap');carouselWrap.scrollLeft+=carouselWrap.clientWidth}
function smallSliderPrevSlide(e){const closestElem=e.target.closest('.small-carousel__left-key');if(!closestElem)return;const carouselWrap=closestElem.parentElement.parentElement.querySelector('.carousel__wrap.small-carousel__wrap');carouselWrap.scrollLeft-=carouselWrap.clientWidth}
document.addEventListener('click',smallSliderNextSlide);document.addEventListener('click',smallSliderPrevSlide);function swipeSliderToRight(){if(itemCount<carouselItemCount)itemCount++;document.querySelector('.carousel-pagnitation__item.active').classList.remove('active');document.querySelector(`.carousel-pagnitation__item:nth-child(${itemCount})`).classList.add('active')}
function swipeSliderToLeft(){if(itemCount>1)itemCount--;document.querySelector('.carousel-pagnitation__item.active').classList.remove('active');document.querySelector(`.carousel-pagnitation__item:nth-child(${itemCount})`).classList.add('active')}
let touchStartX=0;let touchEndX=0;function checkDirection(){if(touchEndX<touchStartX)swipeSliderToRight();if(touchEndX>touchStartX)swipeSliderToLeft();}
function touchStartFnc(e){touchStartX=e.changedTouches[0].screenX}
function touchEndFnc(e){touchEndX=e.changedTouches[0].screenX;checkDirection()}
carouselWrap?.addEventListener('touchstart',touchStartFnc);carouselWrap?.addEventListener('touchend',touchEndFnc);Element.prototype.clearHTMLElement=function(){this.innerHTML='';return this}
Element.prototype.appendElement=function(elem){if(/(^<.+>[\n\s+.]+<\/.+>|.+$)/gmi.test(elem))this.insertAdjacentHTML('afterbegin',elem);else this.textContent=elem}
function showWrongInputMsg(e){const wrongInputMsg=e.target.parentElement.querySelector('.form__wrong-input-message');e.preventDefault();if(wrongInputMsg){wrongInputMsg.classList.add('awake');setTimeout(()=>wrongInputMsg.classList.remove('awake'),1500)}else{e.target.parentElement.insertAdjacentHTML('beforeend',`<p class='form__wrong-input-message'>Недопустимое значение поля. Пожалуйста, повторите ввод.</p>`)}}
function hideWrongInputMsg(e){e.target.parentElement.querySelector('.form__wrong-input-message')?.remove()}
function addCustomWrongInputMessage(){document.querySelectorAll('.form__input').forEach(item=>{item.addEventListener('invalid',showWrongInputMsg);item.addEventListener('focus',hideWrongInputMsg)})}
function hidePopUp(e){const btn=e.target.closest('.pop-up__close-btn');if(!btn)return;document.querySelector('.pop-up__title').classList.remove('title-check-mark');document.querySelector('.pop-up').classList.remove('active');document.body.classList.remove('pop-up-lock');document.querySelector('.pop-up__main-part').classList.remove('pop-up-okay')}
function showPopUpContent(e){const btn=e.target.closest('.open-modal-btn');if(!btn)return;const btnText=(btn.closest('.open-modal-btn-text')||btn.querySelector('.open-modal-btn-text')).textContent.toLowerCase();const popUp=document.querySelector('.pop-up');const title=popUp.querySelector('.pop-up__title');const form=btn.parentElement.parentElement.querySelector('.form');const mainPartOfPopUp=popUp.querySelector('.pop-up__main-part');let elem,titleContent;if(btnText==='купить'){elem=`
                <form class='pop-up__form pop-up-form form tickets-form' action='#' onsubmit="return false" method="post">
                        <fieldset class='form__group'>
                            <label class='form__label' for='input-name'>Имя</label>
                            <input class='form__input' type='text' name='input-name' id='input-name' placeholder='Введите имя' required>
                        </fieldset>
                        <fieldset class='form__group'>
                            <label class='form__label' for='input-email'>Email</label>
                            <input class='form__input' type='email' name='input-email' id='input-email' placeholder='Введите e-mail' required>
                        </fieldset>
                        <fieldset class='form__group'>
                            <legend class='form__label'>Статус билета</legend>
                
                            <div class="form__radio-group">
                                <label class='form__radio-label'>
                                    <input class='form__input-radio' type='radio' name='pop-up-input-radio' id='input-radio-viewer' value='viewer' checked>
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
            `;titleContent='Чтобы приобрести билет, заполните форму ниже. Мы свяжемся с вами по вопросу оплаты.';popUp.classList.add('active');title.clearHTMLElement().appendElement(titleContent);mainPartOfPopUp.innerHTML=elem}else if(/(бронь билета)|(отправить)/.test(btnText)&&form?.checkValidity()){elem=`
                <p class='pop-up__text pop-up-text'>
                    ${btnText === 'отправить' ? 'Спасибо за ваш вопрос! Ваша заявка в работе. Мы ответим в течение дня обязательно, будьте на связи! ' : 'Спасибо за интерес к Blade Fashion Week 2019! Мы уже готовим ваше персональное приглашение. Скоро сообщим о всех деталях.'}
                </p> 
                <button class='pop-up__close-btn pop-up-button common-button-1 uppercase'>Понятно</button>
            `;titleContent=`
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5242 2.84518L10.8988 4.51251L6.0237 9.51152C5.73022 9.81387 5.32363 10 4.87512 10C4.42661 10 4.02003 9.81387 3.72557 9.51152L0.475812 6.17885C0.181355 5.87749 0 5.4609 0 5C0 4.07918 0.727368 3.33366 1.62439 3.33366C2.07388 3.33366 2.47949 3.5198 2.77394 3.82214L4.87512 5.97597L8.60069 2.15482L10.2261 0.488477C10.5195 0.187118 10.9261 0 11.3746 0C12.2726 0 13 0.746504 13 1.66634C13 2.12724 12.8186 2.54382 12.5242 2.84518Z" fill="currentColor"/></svg>
        `;title.classList.add('title-check-mark');if(btnText==='отправить')mainPartOfPopUp.classList.add('pop-up-okay');popUp.classList.add('active');title.clearHTMLElement().appendElement(titleContent);mainPartOfPopUp.innerHTML=elem}else if(btnText==='задать вопрос'){elem=`
                <form action="#" class="main__contact-form form contacts-form" onsubmit="return false" method="post">
                    <fieldset class="form__group">
                        <label for="input-name" class="form__label">Имя</label>
                        <input type="text" name="input-name" id="input-name" class="form__input" placeholder="Введите имя" required>
                    </fieldset>

                    <fieldset class="form__group">
                        <label for="input-email" class="form__label">Email</label>
                        <input type="email" name="input-email" id="input-email" class="form__input" placeholder="Введите e-mail" required>
                    </fieldset>

                    <fieldset class="form__group">
                        <label for="input-msg" class="form__label">Сообщение</label>
                        <textarea name="input-msg" id="input-msg" class="form__input" placeholder="Задайте любой вопрос" required></textarea>
                    </fieldset>

                    <button type="submit" class="form__submit-btn common-button-1 uppercase open-modal-btn open-modal-btn-text">Отправить</button>
                </form>
            `;titleContent='Остались вопросы? Спросите нас! Мы ответим!';popUp.classList.add('active');title.clearHTMLElement().appendElement(titleContent);mainPartOfPopUp.innerHTML=elem}
if(window.innerWidth<1400){document.body.classList.add('pop-up-lock');window.scrollTo(0,0)}
addCustomWrongInputMessage()}
function createPopUp(){document.body.insertAdjacentHTML('beforeend',`<div class='pop-up pop-up-background'>
            <div class="pop-up__block">
                <div class='pop-up__wrap'>
                    <div class='pop-up__header'>
                        <div class="pop-header__wrap">
                            <div class="header__logo pop-up__logo">
                                <img src="../img/logos/blade.svg" alt="site logo" class="header__logo">
                            </div>
                            <button class='pop-up__close-btn header-close-btn'>
                                <div class='header-close-btn__wrap'></div>
                            </button>
                        </div>
                        <h2 class='pop-up__title pop-up-title pop-up-text'>
                            
                        </h2>
                    </div>
                    <div class='pop-up__main-part'>
                        
                    </div>
                </div>
            </div>
        </div>`)}
createPopUp();document.addEventListener('click',showPopUpContent);document.addEventListener('click',hidePopUp)