// Selects the "Bubble Sort" button element from the document
const bubbleSortBtn = document.querySelector(".bubble_sort");

// Defines the async bubble sort function to visually sort the array bars
async function bubbleSort() {
    // Selects all elements representing the array bars
    const bars = document.querySelectorAll(".array_bar");

    // Outer loop iterates over each bar, excluding the last sorted bars in each pass
    for (let i = 0; i < bars.length - 1; i++) {

        // Inner loop compares each pair of adjacent bars
        for (let j = 0; j < bars.length - i - 1; j++) {
            // Waits for a specific delay before the next action (creates a visual effect)
            await waitforme(delay);

            // Highlights the bars being compared by changing their color
            bars[j].style.backgroundColor = "#00df2c";
            bars[j + 1].style.backgroundColor = "#00df2c";

            // Checks if the current bar is taller than the next bar
            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                // Waits and swaps the bars if they are out of order
                await waitforme(delay);
                swap(bars[j], bars[j + 1]);
            }

            // Resets the color of bars after comparison
            bars[j].style.backgroundColor = "#00dcff";
            bars[j + 1].style.backgroundColor = "#00dcff";
        }

        // Sets the color of the sorted bar to indicate its position is fixed
        bars[bars.length - i - 1].style.backgroundColor = "#8e8e8e";
    }

    // Colors the first bar after the entire array is sorted
    bars[0].style.backgroundColor = "#8e8e8e";
}

// Adds an event listener to the "Bubble Sort" button to start sorting on click
bubbleSortBtn.addEventListener("click", async function () {
    // Disables buttons and controls during sorting to prevent interference
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();

    // Calls the bubble sort function and waits for it to complete
    await bubbleSort();

    // Enables buttons and controls after sorting is complete
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
});
