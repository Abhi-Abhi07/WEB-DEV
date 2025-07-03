import { resetBars } from './util.js/barColors.js';
import { getCurrentDelay } from './util.js/getDelay.js';
import { updateAlgorithmInfo } from './util.js/algorithmInfo.js';

// Get references to the DOM elements
const generateArrayBtn = document.getElementById("generateArrayBtn"); // Button to generate a new array
const arraySizeBtn = document.getElementById("arraySize"); // Input for selecting the size of the array
const sizeValue = document.getElementById("sizeValue"); // Display for current size value
let size = arraySizeBtn.value; // Initial size of the array based on the input value

const algoSpeedBtn = document.getElementById("algoSpeed"); // Input for selecting the speed of the algorithm
const speedValue = document.getElementById("speedValue"); // Display for current speed value

let arrayContainer = document.getElementById("array_container"); // Container for the array bars

// Function to update speed display
function updateSpeedDisplay() {
    const delay = getCurrentDelay();
    speedValue.textContent = `${delay}ms`;
}

// Function to update size display
function updateSizeDisplay() {
    sizeValue.textContent = arraySizeBtn.value;
}

// Initialize displays
updateSpeedDisplay();
updateSizeDisplay();
updateAlgorithmInfo(); // Initialize with no algorithm selected

// Event listener for speed slider changes
algoSpeedBtn.addEventListener("input", updateSpeedDisplay);

// Event listener for size slider changes
arraySizeBtn.addEventListener("input", () => {
    size = arraySizeBtn.value;
    updateSizeDisplay();
    generateArray(size);
});

// Function to generate a new array of bars based on the specified size
const generateArray = ((size) => {
    arrayContainer.innerHTML = ""; // Clear previous bars
    for (let i = 0; i < size; i++) {
        // Generate a random height for the bars between 5% and 100%
        let barHeight = Math.floor(Math.random() * 95) + 5;
        let bar = document.createElement("div"); // Create a new div for the bar
        bar.classList.add("array_bar"); // Add class for styling
        bar.style.height = `${barHeight}%`; // Set the height of the bar
        bar.setAttribute('data-value', barHeight); // Set the value for tooltip
        arrayContainer.appendChild(bar); // Add the bar to the container
    }
});

// Event listener for when the window loads to generate the initial array
window.addEventListener("load", () => {
    generateArray(size); // Generate the array with the default size
    updateSpeedDisplay(); // Ensure speed display is initialized
    updateSizeDisplay(); // Ensure size display is initialized
    updateAlgorithmInfo(); // Ensure algorithm info is initialized
});

// Event listener for the button to generate a new array
generateArrayBtn.addEventListener("click", () => {
    size = arraySizeBtn.value; // Get the current value from the size input
    generateArray(size); // Generate the array with the new size
});

// Event listener for clicking the logo to reload the page
document.querySelector(".logo").addEventListener("click", () => {
    location.reload(); // Reload the page to reset the application
});
