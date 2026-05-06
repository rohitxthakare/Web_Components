// concept: add and remove CSS classes dynamically based on user actions

const open = document.querySelector(".open");
const close = document.querySelector(".close");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const content = document.querySelector(".content");

open.addEventListener('click', () => {
    hamburger.classList.add("start");
    nav.classList.add("start");
    content.classList.add("start");
})

close.addEventListener('click', () => {
    hamburger.classList.remove("start");
    nav.classList.remove("start");
    content.classList.remove("start");
})