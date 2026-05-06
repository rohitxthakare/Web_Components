const typingText = document.getElementById("typingText");

const typingMessages = [
  "Solving Real Problems",
  "From Ideas to Execution",
  "Full Stack Developer",
  "Crafting Scalable Experiences"
];

// State variables
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Timing configuration (in milliseconds)
const typingSpeed = 100;     // Speed of typing each character
const deletingSpeed = 50;    // Speed of deleting each character
const pauseEnd = 2000;       // How long to wait after finishing a word
const pauseStart = 500;      // How long to wait before starting the next word

function typeEffect() {
  const currentMessage = typingMessages[messageIndex];

  if (isDeleting) {
    // Remove a character
    typingText.textContent = currentMessage.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add a character
    typingText.textContent = currentMessage.substring(0, charIndex + 1);
    charIndex++;
  }

  // Determine the delay for the next frame
  let timeoutSpeed = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentMessage.length) {
    // Word is fully typed out -> Pause, then start deleting
    timeoutSpeed = pauseEnd;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Word is fully deleted -> Move to next word, pause, then start typing
    isDeleting = false;
    messageIndex = (messageIndex + 1) % typingMessages.length; // Loop back to start
    timeoutSpeed = pauseStart;
  }

  // Call the function again after the calculated delay
  setTimeout(typeEffect, timeoutSpeed);
}

// Initialize the animation when the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  typingText.textContent = ""; // Clear the initial "Loading..." text
  setTimeout(typeEffect, pauseStart);
});