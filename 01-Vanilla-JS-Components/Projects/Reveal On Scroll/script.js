const wrapper = document.querySelector('.wrapper');
const images = document.querySelectorAll('.image');

const wrapperHeight = wrapper.clientHeight;
const triggerPoint = wrapperHeight / 5 * 4  // 75% of wrapper's height

wrapper.addEventListener('scroll', updateImages);
window.addEventListener('load', updateImages); // initial call

function updateImages() {

    images.forEach((image) => {
        const imageTop = image.offsetTop - wrapper.scrollTop; // distance of a image top from a wrapper's top

        if (imageTop <= triggerPoint) image.classList.add('show');
        else image.classList.remove('show');
        console.log(image.offsetParent);
    })
}