// Get references to the DOM elements
const generateArrayBtn = document.getElementById("generateArrayBtn"); // Button to generate a new array
const arraySizeBtn = document.getElementById("arraySize"); // Input for selecting the size of the array
let size = arraySizeBtn.value; // Initial size of the array based on the input value

const algoSpeedBtn = document.getElementById("algoSpeed"); // Input for selecting the speed of the algorithm
let MinimumAlgoSpeed = 1000; // Minimum speed of the algorithm in milliseconds (1 second)
let delay = 100; // Initial delay for the sorting algorithms

let arrayContainer = document.getElementById("array_container"); // Container for the array bars

// Function to generate a new array of bars based on the specified size
const generateArray = ((size) => {
    arrayContainer.innerHTML = ""; // Clear previous bars
    for (let i = 0; i < size; i++) {
        // Generate a random height for the bars between 5% and 100%
        let barHeight = Math.floor(Math.random() * 95) + 5;
        let bar = document.createElement("div"); // Create a new div for the bar
        bar.classList.add("array_bar"); // Add class for styling
        bar.style.height = `${barHeight}%`; // Set the height of the bar
        arrayContainer.appendChild(bar); // Add the bar to the container
    }
});

// Event listener for when the window loads to generate the initial array
window.addEventListener("load", () => {
    generateArray(size); // Generate the array with the default size
});

// Event listener for the button to generate a new array
generateArrayBtn.addEventListener("click", () => {
    size = arraySizeBtn.value; // Get the current value from the size input
    generateArray(size); // Generate the array with the new size
});

// Event listener for input changes in the array size slider
arraySizeBtn.addEventListener("input", () => {
    size = arraySizeBtn.value; // Update size based on the slider value
    generateArray(size); // Regenerate the array with the new size
});

// Event listener for input changes in the algorithm speed slider
algoSpeedBtn.addEventListener("input", () => {
    // Calculate the delay based on the selected speed
    delay = MinimumAlgoSpeed - algoSpeedBtn.value; 
    // console.log(delay); // Optional: log the delay for debugging
});

// Event listener for clicking the logo to reload the page
document.querySelector(".logo").addEventListener("click", () => {
    location.reload(); // Reload the page to reset the application
});
