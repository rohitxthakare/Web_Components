const wrapper = document.querySelector(".wrapper");
const slides = document.querySelectorAll(".slide");
const rightBtn = document.querySelector(".right");
const leftBtn = document.querySelector(".left");

const markerContainer = document.querySelector(".marker-container");
let markers;

let activeSlide = 0;

rightBtn.addEventListener('click', () => {
    nextSlide();
    frontImgUpdate();
    backImgUpdate();
    highlightMarker(activeSlide);
})

leftBtn.addEventListener('click', () => {
    prevSlide();
    frontImgUpdate();
    backImgUpdate();
    highlightMarker(activeSlide);
})

// auto change slides
let interval = setInterval(() => {
    nextSlide();
    frontImgUpdate();
    backImgUpdate();
    highlightMarker(activeSlide);
}, 3000);

function nextSlide() {
    activeSlide++;

    if (activeSlide > slides.length - 1) {
        activeSlide = 0;
    }
}

function prevSlide() {
    activeSlide--;

    if (activeSlide < 0) {
        activeSlide = slides.length - 1;
    }
}

function frontImgUpdate() {
    slides.forEach((slide) => slide.classList.remove("active-slide"));
    slides[activeSlide].classList.add("active-slide");
}

function backImgUpdate() {
    wrapper.style.backgroundImage = slides[activeSlide].style.backgroundImage;
}

// create marker for each slide
function createMarkers() {
    markerContainer.innerHTML = '';
    slides.forEach((slide, slideIndex) => {
        let marker = document.createElement("li");
        markerContainer.appendChild(marker);

        // make markers clickable
        marker.addEventListener('click', () => {
            activeSlide = slideIndex;
            frontImgUpdate();
            backImgUpdate();
            highlightMarker(activeSlide);
        })
    })
    markers = document.querySelectorAll(".marker-container>li");
    highlightMarker(activeSlide); // highlight first marker on page load
}

function highlightMarker(currMarker) {
    markers.forEach((maker) => maker.classList.remove("active-marker"));
    markers[currMarker].classList.add("active-marker");
}

createMarkers(); // init call
