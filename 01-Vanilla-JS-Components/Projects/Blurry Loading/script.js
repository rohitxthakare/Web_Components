// concept: decrease blur every 30ms

const img = document.querySelector(".image");
const loading = document.querySelector(".loading");

let load = 0;

let int = setInterval(filtering, 30);

function filtering() {
    load++;
    if (load === 101) {
        clearInterval(int);
    }
    else {
        loading.innerHTML = `${load}%`;
        // loading.style.filter = `opacity(${scale(load, 0, 100, 1, 0)})`;
        img.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    }
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

// this function converts the value from one range to another range
// 50 in (0 to 100) is 0.5 in (0 to 1)
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}