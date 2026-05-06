const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const stateDisplay = document.getElementById("status");

const workTime = document.getElementById("work-time");
const breakTime = document.getElementById("break-time");


const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const svg = document.querySelector("svg");
const circle = document.querySelector("circle");

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = 0; // initial offset

let totalTime;
let currentTime = totalTime;
let timer = null;
let isRunning = false;
let state = "work"; // work or break


function updateDisplay() {
    if (currentTime > 99 * 60) return; // condition check

    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;

    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;

    if (state === "work") {
        // increasing offset
        const offset = circumference - (currentTime / totalTime) * circumference; 
        circle.style.strokeDashoffset = offset;
    }
    else {
        // decreasing offset
        const offset = (currentTime / totalTime) * circumference;  // like (50 / 100) * 722.57 = 361.285
        circle.style.strokeDashoffset = offset;
    }

}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        workTime.disabled = true;
        breakTime.disabled = true;

        // Initialize only if totalTime it’s undefined or 0
        if (!totalTime || totalTime <= 0) {
            totalTime = (state === "work" ? (+workTime.value || 25) : (+breakTime.value || 5)) * 60;
            currentTime = totalTime;
        }

        timer = setInterval(() => {
            if (currentTime > 0) {
                currentTime--;
                updateDisplay();

            } else {
                // Switch session automatically
                state = state === "work" ? "break" : "work";
                totalTime = (state === "work" ? (+workTime.value || 25) : (+breakTime.value || 5)) * 60;
                currentTime = totalTime;

                stateDisplay.textContent = state;

                circle.setAttribute("class", state);
                svg.setAttribute("class", state);

                updateDisplay();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    workTime.disabled = false;
    breakTime.disabled = false;

    totalTime = (state === "work" ? (+workTime.value || 25) : (+breakTime.value || 5)) * 60;
    currentTime = totalTime;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);