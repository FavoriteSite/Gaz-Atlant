
// Появление меню
let nav = document.querySelector('.icon-menu');

nav.addEventListener('click', function (e) {
  let navList = document.querySelector('.header__contacts');
  navList.classList.toggle('_active');
  nav.classList.toggle('menu-open');
  let bodyElement = document.body;
  bodyElement.classList.toggle('_hidden');
});


//выезд автомобиля
// При достижении скролом объкта у которого есть класс ._anim-items, а именно его 1/4 части (const animStart = 4;) либо 1/4 высоты окна браузера
// если высота обекта больше, чем окно браузера ему добавляется класс  _active


//Если объект, который необходимо анимировать находится в шапке или первой секции, т.е. сразу перед глазами, 
// то эту функцию нужно вызвать сразу animOnScroll()
// или с задержкой 
setTimeout(() => {
  animOnScroll();
}, 500);

// задержку можно сделать и в css в свойстве задержки   transition: all 0.9s ease 0.6s;
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params) {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 5;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      // проверка если анимированный обект больше по высоте, чем окно браузера, то иначе работаем
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      // проверка прокрутки для старта и добавление класса _active
      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      }
      else {
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
  animOnScroll();
}


//tab
const tabLinks = document.querySelectorAll('.volume__meaning-item[data-tab]');
if (tabLinks.length > 0) {
  for (let i = 0; i < tabLinks.length; i++) {
    const tabLink = tabLinks[i];
    tabLink.addEventListener('click', showTab);
  }

  function showTab(e) {

    const tabLinkActive = e.currentTarget;
    if (tabLinkActive.dataset.tab && document.querySelector(tabLinkActive.dataset.tab)) {
      const tabContentActive = document.querySelector(tabLinkActive.dataset.tab);

      const tabActive = document.querySelector('.volume__img._active');
      const LinktabActive = document.querySelector('.volume__meaning-item._active');

      if (tabActive) {
        tabActive.classList.remove('_active');
        tabContentActive.classList.add('_active');
        LinktabActive.classList.remove('_active');
        tabLinkActive.classList.add('_active');
      }
    }
  }
}



// spoller


const spollerTitles = document.querySelectorAll('[data-spoller]');

if (spollerTitles.length > 0) {

  spollerTitles.forEach(spollerTitle => {

    // показан текст у обекта с классом _active иначе скрыт
    if (!spollerTitle.parentElement.classList.contains('_active')) {
      spollerTitle.nextElementSibling.hidden = true;
    }
    spollerTitle.addEventListener('click', function (e) {

      // проверка на атрибут для работы аккардиона
      if (this.parentElement.hasAttribute('data-one-spoller')) {

        // если у нажатой кнопки нет класса актив, то все остальные спойлеры скрыть
        if (!spollerTitle.parentElement.classList.contains('_active')) {

          // получаем активный открытый спойллер
          const titleActive = document.querySelector('[data-one-spoller]._active');

          spollerTitle.parentElement.classList.add('_active');
          slideDown(spollerTitle.nextElementSibling, 500);
          if (titleActive) {
            titleActive.classList.remove('_active');
            slideUp(titleActive.lastElementChild, 500);
          }
        }
        // закрытие активного аккардиона.Кому нужно? (4 строчки - можно удалить)
        else if (spollerTitle.parentElement.classList.contains('_active')) {
          spollerTitle.parentElement.classList.toggle('_active');
          slideToggle(spollerTitle.nextElementSibling, 500);
        }
      } else {
        spollerTitle.parentElement.classList.toggle('_active');
        slideToggle(spollerTitle.nextElementSibling, 500);
      }
    })
  });
}


// скрывает объект
let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

//функция показывает обект
let slideDown = (target, duration = 500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none')
    display = 'block';
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}


let slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration); //показать 
  } else {
    return slideUp(target, duration); //скрыть 
  }
}




// получаем все поля с дата атрибутом data-focus
const focus = document.querySelectorAll('.form-block__input-item[data-focus]');
if (focus.length > 0) {
  for (let i = 0; i < focus.length; i++) {
    const inputNum = focus[i];
    const inputPlasceholder = inputNum.placeholder;
    inputNum.addEventListener('focus', function (e) {
      inputNum.placeholder = "";
    });
    inputNum.addEventListener('blur', function (e) {
      inputNum.placeholder = inputPlasceholder;
    });
  };
}

// 4 Изменение первого числа 8 - на +7
let inputPhoneOneValue = document.querySelectorAll('[data-phone]');
if (inputPhoneOneValue.length > 0) {
  for (let i = 0; i < inputPhoneOneValue.length; i++) {
    const inputPhoneOneValueItem = inputPhoneOneValue[i];
    inputPhoneOneValueItem.addEventListener('input', replacementNum);
    function replacementNum() {
      let val = this.value;
      if (val[0] == 8) {
        inputPhoneOneValueItem.value = "+7" + val.slice(2);
      }
    }
  }
}



// проверка формы
// получаем форму по имени
const mainForm = document.forms.main;
const inputText = mainForm.inputName;
const inputTextarea = mainForm.inputTextarea;
const inputPhone = mainForm.inputPhone;


mainForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let inputTextValue = inputText.value;
  let inputPhoneValue = inputPhone.value;
  let inputPhoneTest = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){1})/g;

  if (inputTextValue == "") {
    inputText.value = "Ошибка";
    inputText.classList.add('_error');
  }
  if (!inputPhoneTest.test(inputPhoneValue)) {
    inputPhone.value = "Ошибка";
    inputPhone.classList.add('_error');
  }
  const inputs = document.querySelectorAll('.form-block__input-item[data-check]');
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.classList.contains("_error")) {
        input.addEventListener('focus', inputUpdete)
      }
    };
  }
  function inputUpdete(e) {
    const inputItem = e.target;
    if (inputItem.value == "Ошибка") {
      inputItem.value = "";
    }
    inputItem.classList.remove('_error');
  }
});



//форма в попапе
// проверка формы
// получаем форму по имени
const mainFormPopup = document.forms.mainPopup;

const inputTextPopup = mainFormPopup.inputName;
const inputPhonePopup = mainFormPopup.inputPhone;


mainFormPopup.addEventListener('submit', function (event) {
  event.preventDefault();
  let inputTextPopupValue = inputTextPopup.value;
  let inputPhonePopupValue = inputPhonePopup.value;
  let inputPhoneTest = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){1})/g;

  if (inputTextPopupValue == "") {
    inputTextPopup.value = "Ошибка";
    inputTextPopup.classList.add('_error');
  }
  if (!inputPhoneTest.test(inputPhonePopupValue)) {
    inputPhonePopup.value = "Ошибка";
    inputPhonePopup.classList.add('_error');
  }
  const inputs = document.querySelectorAll('.form-block__input-item[data-check]');
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.classList.contains("_error")) {
        input.addEventListener('focus', inputUpdete)
      }
    };
  }
  function inputUpdete(e) {
    const inputItem = e.target;
    if (inputItem.value == "Ошибка") {
      inputItem.value = "";
    }
    inputItem.classList.remove('_error');
  }
});




//popup
// ссылки при нажатии на которые открывается попап с таким классом
const popupLinks = document.querySelectorAll('.popup-link');
//  тег body для блокировки скролла при открытом попапе
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];
    el.addEventListener("click", function (e) {
      popupCloseIcon(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

// получаем открытый попап и если он существует, его закрываем и у боди блокируем скролл
// далее попап, который передали (curentPopup) открываем и вешаем собитие при клике, чтобы закрылся попап только на темную область
//   if (!e.target.closest('.popup__content')) - если при клике на что-то у родителя нет такого класса т.е. это оболочка
// при клике на которую он заркывается 
// если я нажму на обект у которого есть родитель с клаасом .popup__content, то он не закроется, потому что стоит !знак НЕ
//  то есть закроется при нажатие на блоки с классами .popup__body и  .popup
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

// высчитывание ширины скролла, чтобы его скрывать при открытии попапа
function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  console.log(lockPaddingValue);
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

//  закрытие по esc
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});