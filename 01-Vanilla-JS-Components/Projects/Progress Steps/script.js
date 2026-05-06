const steps = document.querySelectorAll(".step");
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const frontLine = document.querySelector(".frontline")

let currentStep = 1;

next.addEventListener('click', () => {
    currentStep++;
    // current step should not be more than steps.lenght
    if (currentStep > steps.length) {
        currentStep = steps.length;
    }
    updateStep();
})

prev.addEventListener('click', () => {
    // current step should not be less than 1
    currentStep--;
    if (currentStep < 1) {
        currentStep = 1;
    }
    updateStep();
})

// Update Steps
function updateStep() {
    steps.forEach((step, index) => {
        if (currentStep > index) {
            const stepName = index === 0 ? "Start" : index === steps.length - 1 ? "Final" : "Step " + index;

            step.classList.add("checked")

            step.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20px" fill="darkgreen"><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>
            <span>${stepName}</span>`;

            // set width dynamically
            frontLine.style.width = ((currentStep - 1) / (steps.length - 1)) * 100 + "%";

        }
        else {
            step.classList.remove("checked")
            step.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20px" fill="lightgrey"><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>`
        }
    })

    // Disable buttons
    if (currentStep === 1) {
        prev.disabled = true;
    } else if (currentStep === steps.length) {
        next.disabled = true;
    }
    else {
        prev.disabled = false;
        next.disabled = false;
    }
}

