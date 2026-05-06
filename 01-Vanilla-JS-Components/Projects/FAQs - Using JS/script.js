const faqs = document.querySelector('.faqs');

const queAns = [
    {
        que: "Why did the scarecrow win an award?",
        ans: "Because he was outstanding in his field — literally! All the other crops looked up to him for inspiration."
    },
    {
        que: "Why don't skeletons fight each other?",
        ans: "Because they don't have the guts! Even if they tried, their arguments would just fall apart — bone by bone."
    },
    {
        que: "What did one ocean say to the other ocean?",
        ans: "Nothing, they just waved. But deep down, they both knew they shared the same current feelings."
    },
    {
        que: "Why did the math book look so sad?",
        ans: "Because it had too many problems. No matter how many it solved, new ones just kept adding up!"
    },
    {
        que: "What do you call fake spaghetti?",
        ans: "An impasta! It tried to blend in at the dinner table, but everyone could taste the difference."
    },

];

queAns.forEach(({ que, ans }) => {
    const div = document.createElement('div');
    div.className = 'que-ans';
    div.innerHTML =
        `<div class="que">
                <h1>${que}</h1>
                <button class="btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width=15px><path d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z" /></svg></button>
                </div>
                <p>${ans}</p>`

    faqs.appendChild(div);
});

// Add a single click event listener to the container (event delegation)
faqs.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return; // ignore clicks outside buttons

    const currentFaq = btn.closest('.que-ans');
    document.querySelectorAll('.que-ans').forEach(faq => {
        if (faq !== currentFaq) faq.classList.remove('active');
    });
    currentFaq.classList.toggle('active');
});