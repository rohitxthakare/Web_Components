const wrapper = document.querySelector('.wrapper');

const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');

const timeTxt = document.querySelector('.time');
const dayMonthTxt = document.querySelector('.day-month');

const btn = document.querySelector('.btn');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let themeNo = 0;
const themes = ["", "theme-image", "theme-light", "theme-dark"];


function updateHands() {
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

    // Rotate each clock hand based on the current time
    hourHand.style.transform = `rotate(${30 * h + m / 2}deg)`; // 360° / 12 = 30° per hour + offset by minutes
    minuteHand.style.transform = `rotate(${6 * m}deg)`; // 360° / 60 = 6° per minute
    secondHand.style.transform = `rotate(${6 * s}deg)`;  // 360° / 60 = 6° per second

    // Convert 24-hour format to 12-hour with AM/PM
    const hour12 = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";

    // Update time, day, month, and date display
    timeTxt.textContent = `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
    dayMonthTxt.innerHTML = `${days[now.getDay()]}, ${months[now.getMonth()]} <span class="date">${now.getDate()}</span>`;
}

// Call updateHands every second to keep time running
setInterval(updateHands, 1000);


btn.addEventListener('click', changeStyle)

function changeStyle() {
    if (themeNo >= themes.length - 1) themeNo = 0;
    else themeNo++;

    // Apply the selected theme class to the wrapper
    wrapper.className = `wrapper ${themes[themeNo]}`;
}
