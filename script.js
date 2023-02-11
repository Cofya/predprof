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