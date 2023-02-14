function switchReg() {
    let reg = document.querySelector(".reg-menu__registration");
    let entry = document.querySelector(".reg-menu__entry");
    reg.classList.toggle("show");
    entry.classList.toggle("show");
}

document.querySelectorAll(".disturb-checkbox").forEach((elem) => {
    elem.addEventListener("click", () => {
        elem.classList.toggle("active")
    })
})

document.querySelectorAll(".cabinet__sub-item").forEach((elem) => {
    if (elem.querySelector("button").classList.contains("show")) {
        elem.querySelector("span").style.color = "#7F8CA9"
    }
})

document.querySelectorAll(".menu__go").forEach((elem) => {
    elem.addEventListener("click", toMonitoring)
})

document.querySelector(".dropbtn-wrapper").querySelector("img").addEventListener("click", markDrop)

window.onclick = function (event) {
    if (!event.target.matches(".dropbtn") && !event.target.matches(".dropbtn-image")) {
        document.querySelector(".dropdown-content").classList.add("show");
        document.querySelector(".dropbtn-wrapper").querySelector("img").classList.remove("active");
    }

    if (event.target.matches(".dropbtn-image")) {
        markDrop();
    }
}


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


function deactiveMenuButtons() {
    document.querySelector(".menu-buttons__cabinet").classList.remove("active")
    document.querySelector(".menu-buttons__main").classList.remove("active")

    let line = document.querySelector(".menu-buttons").querySelector(".line");
    line.style.opacity = 0;
}
function toReg() {
    document.querySelector("main").classList.add("show");
    document.querySelector(".reg-menu").classList.remove("show");
    document.querySelector(".reg-menu__entry").classList.add("show");
    document.querySelector(".reg-menu__registration").classList.remove("show");

    deactiveMenuButtons()
}

function toEntry() {
    document.querySelector("main").classList.add("show");
    document.querySelector(".reg-menu").classList.remove("show");
    document.querySelector(".reg-menu__registration").classList.add("show");
    document.querySelector(".reg-menu__entry").classList.remove("show");

    deactiveMenuButtons()
}

function toMain() {
    document.querySelector(".reg-menu").classList.add("show")
    document.querySelector("main").classList.remove("show")
    document.querySelector(".vuz-all-info").classList.add("show");
    document.querySelector(".cabinet").classList.add("show")
    document.querySelector(".menu").classList.remove("show");
    document.querySelector(".recommendation").classList.remove("show");

    document.querySelector(".menu-buttons__cabinet").classList.remove("active")
    document.querySelector(".menu-buttons__main").classList.add("active")

    let line = document.querySelector(".menu-buttons").querySelector(".line");

    if (line.style.opacity === "0") {
        line.style.marginLeft = "0.78125rem"
        line.style.opacity = 1
        return;
    }
    line.style.animationName = "line-main"

    setTimeout(() => {
        line.style.marginLeft = "0.78125rem"
    }, 1190)
}

function toCabinet() {
    document.querySelector(".reg-menu").classList.add("show")
    document.querySelector("main").classList.remove("show")
    document.querySelector(".menu").classList.add("show");
    document.querySelector(".vuz-all-info").classList.add("show");
    document.querySelector(".recommendation").classList.add("show");
    document.querySelector(".cabinet").classList.remove("show")

    document.querySelector(".menu-buttons__main").classList.remove("active")
    document.querySelector(".menu-buttons__cabinet").classList.add("active")

    let line = document.querySelector(".menu-buttons").querySelector(".line")

    if (line.style.opacity === "0") {
        line.style.marginLeft = "8.125rem"
        line.style.opacity = 1
        return;
    }
    line.style.animationName = "line-cabinet"

    setTimeout(() => {
        line.style.marginLeft = "8.125rem"
    }, 1190)
}

function toMonitoring() {
    document.querySelector(".reg-menu").classList.add("show")
    document.querySelector(".cabinet").classList.add("show")
    document.querySelector(".menu").classList.add("show");
    document.querySelector(".recommendation").classList.add("show");
    document.querySelector(".vuz-all-info").classList.remove("show");

    deactiveMenuButtons()

    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
}