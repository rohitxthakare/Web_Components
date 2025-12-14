const card = document.getElementById('card');

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('success');
        }, 3500);
    });
}

getData().then(() => {
    card.innerHTML = `
        <div class="card-img">
            <img src="images-icons/nature.jpeg" alt="nature">
        </div>

        <div class="card-title">
            <h2>Nature is the eternal masterpiece where life paints itself onto the canvas of existence.</h2>
        </div>

        <div class="card-desc">
            <p>Nature is the gentle whisper of the wind and the fierce roar of the ocean, a constant, beautiful
                cycle of life, death, and resurrection.</p>
        </div>

        <div class="profile">
            <div class="profile-img">
                <img src="images-icons/profile.jpeg" alt="profile">
            </div>
            <div class="user">
                <h3 class="profile-name">Rohit</h3>
                <small class="profile-date">Dec 07, 2025</small>
            </div>
        </div>
    `;
});
