// There are different ways: 1) top 2) translateY() 3) top or translateY() with offsetTop/clientHeight 4) scrollTo/scrollBy 5) append & prepend and more... 

const infoSlides = document.querySelectorAll(".info-slide");
const imageSlides = document.querySelectorAll(".image-slide");

const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");

const upBtn = document.querySelector(".up-btn");
const downBtn = document.querySelector(".down-btn");

let activeSlide = 0;
const lastImageSlideIndex = imageSlides.length - 1;
const lastInfoSlideIndex = infoSlides.length - 1;

rightSide.style.top = `-${(lastImageSlideIndex) * 100}%` // set a last slide as a first slide

upBtn.addEventListener('click', () => setActiveSlide('up'));
downBtn.addEventListener('click', () => setActiveSlide('down'));

function setActiveSlide(direction) {
    if (direction === 'up') {
        activeSlide++;
        if (activeSlide > lastInfoSlideIndex) activeSlide = 0;
    }
    else {
        activeSlide--;
        if (activeSlide < 0) activeSlide = lastInfoSlideIndex;
    }
    
    updateSlides1();
    // updateSlides2();
}

// ---------------------------- Method 1 ------------------------------ 
function updateSlides1() {
    leftSide.style.top = -100 * activeSlide + '%';
    rightSide.style.top = -100 * (lastImageSlideIndex - activeSlide) + "%";
}


// ---------------------------- Method 2 ------------------------------ 
// function updateSlides2() {
//         // const heightOfLeft = leftSide.offsetHeight;
//         // const heightOfRight = rightSide.offsetHeight;
    
//         // leftSide.style.transform = `translateY(${-heightOfLeft * activeSlide}px)`;
//         // rightSide.style.transform = `translateY(${heightOfRight * activeSlide}px)`;
    
//         // ------------------------------ OR --------------------------------------

//     const slidesContainer = document.querySelector(".container");
//     const heightOfContainer = slidesContainer.clientHeight;

//     leftSide.style.transform = `translateY(${-heightOfContainer * activeSlide}px)`;
//     rightSide.style.transform = `translateY(${heightOfContainer * activeSlide}px)`;
// }


// ---------------------------- Method 3 ------------------------------ 
// it has no transition 

// let infoSlides = document.querySelector('.left-side');
// let imageSlides = document.querySelector('.right-side');

// imageSlides.prepend(imageSlides.lastElementChild); // initially set a last slide as a first slide

// function moveUp() {
//   infoSlides.appendChild(infoSlides.firstElementChild);
//   imageSlides.prepend(imageSlides.lastElementChild);
// }

// function moveDown() {
//   infoSlides.prepend(infoSlides.lastElementChild);
//   imageSlides.appendChild(imageSlides.firstElementChild);
// }

// document.querySelector('.up-btn').addEventListener('click', moveUp);
// document.querySelector('.down-btn').addEventListener('click', moveDown);
