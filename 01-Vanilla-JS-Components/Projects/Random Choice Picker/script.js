// Concept:
// Convert input into tags
// Store all tags in a list
// Randomly highlight tags repeatedly
// Stop after some time
// Pick one final random tag

const textarea = document.getElementById("textarea");
const btn = document.querySelector(".btn");
const tagContainer = document.querySelector(".tag-container");

textarea.focus(); // focus textarea

// move the caret to the end of input
textarea.setSelectionRange(textarea.value.length, textarea.value.length);
createChoices(textarea.value); // call for default input

textarea.addEventListener('keyup', (e) => {
    createChoices(e.target.value); // call for modified input
    if (e.key === 'Enter') {
        // optional, clear the textarea value
        setTimeout(() => {
            e.target.value = '';
        }, 10);

        const engine = document.querySelector('input[name="engine"]:checked').value;

        // call random select
        runEngine();
    }
})

btn.addEventListener('click', () => {
    createChoices(textarea.value); // call for modified input

    // optional, clear the textarea value
    // setTimeout(() => {
    //     textarea.value = '';
    //     textarea.focus(); // re focus after clear
    // }, 10);

    const engine = document.querySelector('input[name="engine"]:checked').value;

    // call random select
    runEngine();

});

function createChoices(input) {
    const choices = input.split(',').filter(choice => choice.trim() !== '').map(choice => choice.trim())
    tagContainer.innerHTML = ''

    choices.forEach(choice => {
        let tag = document.createElement("span");
        tag.classList.add("tag");
        tag.innerHTML = choice;
        tagContainer.appendChild(tag);
    });
}

// version 1 of random select linear selection
function randomSelect1() {
    const childTags = document.querySelectorAll(".tag");
    const totalPicks = 35; // total highlights
    const delay = 100; // starting speed (in ms)

    let interval = setInterval(() => {
        let randomTag = pickRandomTag(childTags);

        // highlight tag
        if (randomTag !== undefined) {
            highlightTag(randomTag);

            // unhighlightTag
            setTimeout(() => {
                unHighlightTag(randomTag);
            }, delay);

        }
    }, delay);

    setTimeout(() => {
        // clear interval
        clearInterval(interval);

        // final tag
        setTimeout(() => {
            const randomTag = pickRandomTag(childTags);
            if (randomTag !== undefined) {
                finalChoice(randomTag);
            }
        }, delay);

    }, delay * totalPicks);
}


// version 2 of random select slowdown selection gradually
// using asynchronous recursion
function randomSelect2() {
    const childTags = document.querySelectorAll(".tag");
    const totalPicks = 30; // total highlights
    let delay = 100; // starting speed (in ms)
    const slowDown = 1.1; // how much to slow each step (bigger = slower end)

    function nextPick(count) {
        if (count <= 0) {
            const randomTag = pickRandomTag(childTags);
            finalChoice(randomTag);
            return; // no more calls
        }

        const randomTag = pickRandomTag(childTags);
        highlightTag(randomTag);

        setTimeout(() => unHighlightTag(randomTag), delay * 0.8);


        setTimeout(() => nextPick(count - 1), delay);
        delay *= slowDown;
    }

    nextPick(totalPicks);
}

// utility functions

function runEngine() {
    const engine = document.querySelector('input[name="engine"]:checked')?.value;
    if (engine === '1') randomSelect1();
    else if (engine === '2') randomSelect2();
}

function pickRandomTag(childTags) {
    return childTags[Math.floor(Math.random() * childTags.length)];
}

function highlightTag(tag) {
    tag.classList.add("highlight");
}

function unHighlightTag(tag) {
    tag.classList.remove("highlight");
}

function finalChoice(tag) {
    tag.classList.add("final");
}