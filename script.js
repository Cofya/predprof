let offers = [];
let problems = [];

// вот эти две переменные должны на беке быть и при заходе в cabinet.html оттуда получаться
let subsVuz = []
let activeCheck = [0, 0, 0, 0, 0, 0]

// на крестик жмяк инпут очистился
function inputClear(elem) {
    elem.previousElementSibling.value = ""
}
//анимации 

window.onload = function () {
    lastDoc = localStorage.getItem('lastDoc')
    localStorage.setItem("lastDoc", '')
    newDoc = document.location.pathname // "/reg.html"
    if (newDoc === "/reg.html" || newDoc === "/entry.html" || newDoc == "/vuz-menu.html") {
        return;
    }

    if (lastDoc == "" && newDoc == "/main-menu.html") {
        let button = document.querySelector(".menu-buttons__main");
        button.style.transition = ""
        button.classList.add("active")
        button.style.transition = "0.3s all ease-in";
        return;
    }

    if (lastDoc == "" && newDoc == "/cabinet.html") {
        let button = document.querySelector(".menu-buttons__cabinet");
        button.style.transition = ""
        button.classList.add("active")
        button.style.transition = "0.3s all ease-in";
        let line = document.querySelector(".menu-buttons").querySelector(".line");
        line.style.marginLeft = "8.125rem"
        return;
    }

    let main = document.querySelector(".menu-buttons__main");
    let cabinet = document.querySelector(".menu-buttons__cabinet");
    let line = document.querySelector(".menu-buttons").querySelector(".line");

    if ((lastDoc == "/reg.html" || lastDoc == "/entry.html" || lastDoc == "/vuz-menu.html") && newDoc == "/main-menu.html") {
        line.style.marginLeft = "0.78125rem"
        main.classList.add("active")
        return;
    }
    if (lastDoc == "/cabinet.html" && newDoc == "/main-menu.html") {
        line.style.animationName = "line-main"
        main.classList.add("active")
        cabinet.classList.remove("active")

        setTimeout(() => {
            line.style.marginLeft = "0.78125rem";
            return;
        }, 1190)
    }
    if ((lastDoc == "/reg.html" || lastDoc == "/entry.html" || lastDoc == "/vuz-menu.html") && newDoc == "/cabinet.html") {
        line.style.marginLeft = "8.125rem"
        cabinet.classList.add("active")
        return;
    }
    if (lastDoc == "/main-menu.html" && newDoc == "/cabinet.html") {
        line.style.animationName = "line-cabinet"
        main.classList.remove("active")
        cabinet.classList.add("active")

        setTimeout(() => {
            line.style.marginLeft = "8.125rem"
            return;
        }, 1190)
    }
}

// переходы
function toMain() {
    localStorage.setItem('lastDoc', document.location.pathname)
    document.location = "main-menu.html"
}

function toCabinet() {

    localStorage.setItem('lastDoc', document.location.pathname)// "/reg.html"
    document.location = "cabinet.html"
}

document.querySelectorAll(".menu__go").forEach((elem) => {
    elem.addEventListener("click", () => {
        localStorage.setItem('lastDoc', document.location.pathname)// "/reg.html"
        document.location = "vuz-menu.html"
    })
})

// чекбоксам в личном кабинете онклик поставить
document.querySelectorAll(".disturb-checkbox").forEach((elem) => {
    elem.addEventListener("click", () => {
        elem.classList.toggle("active")

        let cabinetSub = [...document.querySelector(".cabinet__sub-menu").children]
        cabinetSub = cabinetSub.splice(2, 6)
        let item = elem.parentElement.parentElement;

        index = cabinetSub.indexOf(item);

        activeCheck[index] = 1
    })
})


// В личном кабинете Пусто делает другим цветом
document.querySelectorAll(".cabinet__sub-item").forEach((elem) => {
    if (elem.querySelector("button").classList.contains("show")) {
        elem.querySelector("span").style.color = "#7F8CA9"
    }
})

function addToSub(elem) {
    subsVuz.push(document.querySelector(".monitoring__name").innerText);
    let button = document.querySelector(".monitoring__sub");
    button.innerHTML = "ОТПИСАТЬСЯ";
    button.style.backgroundColor = "#ED4546";
    button.onclick = removeFromSub;

    // потом subsVuz идёт на бек и при заходе в кабинет обрабатывается
    // обработка в cabinet.html внизу там
}

function removeFromSub() {
    let button = document.querySelector(".monitoring__sub");
    button.innerHTML = "ПОДПИСАТЬСЯ";
    button.style.backgroundColor = "#3BA55C";
    button.onclick = addToSub;
    let name = document.querySelector(".monitoring__name").innerText
    for (let i = 0; i < subsVuz.length; i++) {
        if (subsVuz[i] === name) {
            subsVuz.splice(i, 1)
        }
    }

    //после этого subsVuz тоже идёт на бек
}
// для выставления оценок
function markDrop() {
    document.getElementById("dropdown__mark").classList.toggle("show");
    document.querySelector(".dropbtn-wrapper").querySelector("img").classList.toggle("active");
}

function setMark(mark) {
    let word = ["звезда", "звезды", "звезды", "звезды", "звёзд"];
    let input = document.querySelector(".dropbtn");
    input.value = `${mark} ${word[+mark - 1]}`
    input.style.color = "#EEF8FB"
}

// связанное с менюшками на main-menu и vuz-menu
function sentOffer(elem) {
    let inputs = elem.parentElement.parentElement.querySelectorAll("input");

    let name = inputs[0].value;
    inputs[0].value = "";
    let href = inputs[1].value;
    inputs[1].value = "";
    let region = inputs[2].value;
    inputs[2].value = ""

    offers.push(createOffer(name, href, region))
}

function sentProblem(elem) {
    let textarea = elem.parentElement.parentElement.querySelector("textarea");
    let problem = textarea.value;
    textarea.value = "";
    problems.push(createProblem(problem)) //сюда надо ещё аву и ник пользователя
}

function toggleOfferSite() {
    let offer = document.querySelector(".offer-site");
    offer.classList.toggle("show");
    toggleDarkBg(offer.classList.contains("show"))
}

function toggleOfferProblems() {
    let offer = document.querySelector(".offer-problems");
    offer.classList.toggle("show");
    toggleDarkBg(offer.classList.contains("show"))
}

function denyOffer(elem) {
    let menuItem = elem.parentElement.parentElement;
    let menuList = menuItem.parentElement;
    index = [...menuList.children].indexOf(menuItem)
    elem.parentElement.parentElement.parentElement.removeChild(elem.parentElement.parentElement);

    offers.splice(index, 1)
}

function denyProblem(elem) {
    let menuItem = elem.parentElement.parentElement;
    let menuList = menuItem.parentElement;
    index = [...menuList.children].indexOf(menuItem)
    problems.splice(index, 1);
    elem.parentElement.parentElement.parentElement.removeChild(elem.parentElement.parentElement);
}

function toggleModerationSites() {
    let modMenu = document.querySelector(".moderation-menu");
    modMenu.classList.toggle("show");
    if (document.location.pathname == "/main-menu.html") {
        modMenu.querySelector(".moderation-menu__list").innerHTML = offers;
    } else {
        modMenu.querySelector(".moderation-menu__list").innerHTML = problems;
    }
    toggleDarkBg(modMenu.classList.contains("show"));
}

function addVuz(elem, bool = false) {
    let inputs = elem.parentElement.parentElement.querySelectorAll("input");

    let name = inputs[0].value;
    inputs[0].value = "";
    let href = inputs[1].value;
    inputs[1].value = "";
    let region = inputs[2].value;
    inputs[2].value = "";

    let item = createVuzItem(name, href, region);
    let swiperContainer = document.querySelector('swiper-container');
    swipChildren = swiperContainer.querySelectorAll("swiper-slide");

    if ((swipChildren[swipChildren.length - 1]).children.length == 2) {

        let swiper = swiperContainer.swiper;
        swiper.appendSlide(
            `<swiper-slide> ${item} </swiper-slide>`
        );

        let slides = document.querySelectorAll("swiper-slide");
        slides[slides.length - 1].classList.add("menu__list");
    } else {
        let div = document.createElement("div")
        div.innerHTML = item
        swipChildren[swipChildren.length - 1].append(div);
    }

    if (bool) { // в админке после добавления убирает item
        denyOffer(elem)
    }
}

function toggleDarkBg(bool) {
    let darkBg = document.querySelector(".dark-bg")
    if (bool) {
        darkBg.style.width = ""
        darkBg.style.height = ""
    } else {
        darkBg.style.width = "100%"
        darkBg.style.height = `${document.querySelector("body").clientHeight}px`;
    }
}

// коментарка-создавалка
function addComent(elem) {
    let all = elem.parentElement.parentElement;

    let text = all.querySelector("textarea").value;
    all.querySelector("textarea").value = "";

    all.querySelector("input").value = "Введите оценку";
    all.querySelector("input").style.color = "rgba(246, 251, 253, 0.35)";
    let star = all.querySelector("input").value[0];
    let com = createCom(text, star)
    let div = document.createElement("div")
    div.innerHTML = com
    document.querySelector(".comment__comment").prepend(div)
}

// создавалки дивов (реакт на мнималках)
function createCom(text, star) {
    return `<div class="comment__user">
        <div class="comment__user-avatar">
            <img src="/images/icon.png" alt="">
        </div>
        <div class="comment__user-info">
            <div class="comment__user-name">
                <span>Гоба</span>
            </div>
            <div class="comment__user-mark">
                <span>Оценка:</span>
                <span>${star}</span>
            </div>
        </div>
    </div>
    <div class="comment__user-text">
        <span>${text}</span>
    </div>`
}

function createVuzItem(name, href, region) {
    return `
    <div class = "menu__item">
        <div class="menu__item-info">
            <div>
                <div class="menu__name">
                    <span>${name}</span> <br>
                    <a href=">${href}">${href}</a>
                </div>
                <div class="menu__rate">
                    <span>Рейтинг:</span>
                    <span>4.8</span>
                </div>
                <div class="menu__region">
                    <span>Регион:</span>
                    <span>${region}</span>
                </div>
                <div class="menu__ping">
                    <span>Последний пинг:</span>
                    <span>1 мин.</span>
                </div>
            </div>
            <img class="vuz-logo" src="" alt="картиночка"></img>
        </div>
        <div class="ping-bar">
            <div class="ping-bar__state">
            </div>
            <div class="line"></div>
            <div class="uptime">
                <span>uptime:</span>
                <span>100%</span>
            </div>
        </div>
        <div class="menu__buttons">
            <button>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 6H10.45V3H7.55V6H5L9 10L13 6ZM16 0H1.99C0.88 0 0 0.9 0 2V16C0 17.1 0.88 18 1.99 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V13H5.56C6.25 14.19 7.53 15 9.01 15C10.49 15 11.76 14.19 12.46 13H16V16ZM16 11H11.01C11.01 12.1 10.11 13 9.01 13C7.91 13 7.01 12.1 7.01 11H2L1.99 2H16V11Z"
                        fill="white" />
                </svg>
    
            </button>
            <button class="menu__go">ПЕРЕЙТИ</button>
            <button>
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 0L0 4V10C0 15.55 3.84 20.74 9 22C14.16 20.74 18 15.55 18 10V4L9 0ZM9 10.99H16C15.47 15.11 12.72 18.78 9 19.93V11H2V5.3L9 2.19V10.99Z"
                        fill="white" />
                </svg>
    
            </button>
        </div>
    </div>`
}

function createOffer(name, href, region) {
    return `<div class="moderation-menu__item">
        <div class="moderation-menu__inputs">
            <div>
                <div class="input-headline">Название вуза</div>
                <div class="input-wrapper">
                    <input type="text" value= ${name}>
                </div>
            </div>
            <div>
                <div class="input-headline">Ccылка</div>
                <div class="input-wrapper">
                    <input type="text" value= ${href}>
                </div>
            </div>
            <div>
                <div class="input-headline">Регион</div>
                <div class="input-wrapper">
                    <input type="text" value= ${region}>
                </div>
            </div>
        </div>
        <div class="moderation-menu__buttons">
            <button class="button-add" onclick="addVuz(this,true)">ДОБАВИТЬ</button>
            <button class="button-close" onclick="denyOffer(this)">ОТКЛОНИТЬ</button>
        </div>
    </div>`
}

function createProblem(text) { //звучит круто
    return `
    <div class="moderation-menu__item">
        <div class="avatar">
            <div class="avatar-icon">
                <img src="images/icon.png" alt="ава" width="64" height="64">
            </div>
            <div class="avatar-name">Стукач</div>
        </div>
        <div class="textarea-wrapper">
            <textarea class="textarea-write">${text}</textarea>
        </div>
        <div class="moderation-menu__buttons">
            <button class="button-add" onclick="denyProblem(this)">ДОБАВИТЬ</button> 
            <button class="button-close" onclick="denyProblem(this)">ОТКЛОНИТЬ</button>
        </div>
    </div>`
    //denyProblem в button-add временная затычка, потом обсудим че с принятой жалобой делать
}