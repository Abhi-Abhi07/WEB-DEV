// Get references to the buttons
const sortingButtons = document.querySelectorAll(".algo-btn");
const arraySizeBtn = document.getElementById("arraySize");
const generateArrayBtn = document.getElementById("generateArrayBtn");

// Function to disable sorting algorithm buttons
export function disableSortingAlogBtns() {
    console.log("disableSortingAlogBtns");
    sortingButtons.forEach(button => {
        console.log("button", button);
        button.disabled = true;
    });
}

// Function to enable sorting algorithm buttons
export function enableSortingAlgoBtns() {
    sortingButtons.forEach(button => {
        button.disabled = false;
    });
}

// Function to disable array size button
export function disableArraySizeBtn() {
    arraySizeBtn.disabled = true;
}

// Function to enable array size button
export function enableArraySizeBtn() {
    arraySizeBtn.disabled = false;
}

// Function to disable new array generate button
export function disableNewArrayGenerateBtn() {
    generateArrayBtn.disabled = true;
}

// Function to enable new array generate button
export function enableNewArrayGenerateBtn() {
    generateArrayBtn.disabled = false;
}
