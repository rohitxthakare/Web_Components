// dragover --> To allow dropping by preventing default behavior
// drop --> To handle what happens when dropped
// dragstart --> To store which item is being dragged

const leftItems = document.querySelector(".left-items");
const rightItems = document.querySelector(".right-items");

let draggedItem = null;

document.querySelectorAll('li').forEach(li => {
    li.draggable = true;
})

// ---------------------------------

leftItems.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'LI') {
        draggedItem = e.target;
    }
})

rightItems.addEventListener('dragover', (e) => {
    e.preventDefault(); // default behaviour does not allow dragging over
})

rightItems.addEventListener('drop', (e) => {
    if (draggedItem) {
        rightItems.appendChild(draggedItem);
    }
})

// ----------------------------------

rightItems.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'LI') {
        draggedItem = e.target;
    }
})

leftItems.addEventListener('dragover', (e) => {
    e.preventDefault();
})

leftItems.addEventListener('drop', (e) => {
    if (draggedItem) {
        leftItems.appendChild(draggedItem);
    }
})

// ----------------------------------

const imgContainer = document.querySelector('.img-container');
const imgInput = document.getElementById('img-input');

imgInput.addEventListener('change', uploadImage);

function uploadImage() {
    const file = imgInput.files[0];
    if (!file || !file.type.startsWith('image/')) return; // validate
    const imgLink = URL.createObjectURL(file);
    imgContainer.style.backgroundImage = `url(${imgLink})`;
    imgContainer.textContent = '';
}

imgContainer.addEventListener('dragover', (e) => e.preventDefault());
imgContainer.addEventListener('drop', (e) => {
    e.preventDefault(); // prevent opening image in new tab
    imgInput.files = e.dataTransfer.files;
    uploadImage();
})
