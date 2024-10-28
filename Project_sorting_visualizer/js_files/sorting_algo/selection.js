// Select the "Selection Sort" button element from the document
const selectionSortBtn = document.querySelector(".selection_sort");

// Function to perform the selection sort algorithm
async function selectionSort() {
    // Select all bars (array elements) in the document
    const bars = document.querySelectorAll(".array_bar");

    // Loop through each bar as the starting element
    for (let i = 0; i < bars.length; i++) {
        // Highlight the current bar being sorted
        bars[i].style.backgroundColor = "#00df2c";
        let miniIndex = i; // Assume the current bar is the minimum

        // Find the minimum element in the remaining array
        for (let j = i + 1; j < bars.length; j++) {
            // Highlight the bar being compared
            bars[j].style.backgroundColor = "#00dcff";
            await waitforme(delay); // Wait for the delay to create a visual effect

            // If the current bar is smaller than the minimum found so far, update miniIndex
            if (parseInt(bars[miniIndex].style.height) > parseInt(bars[j].style.height)) {
                // Reset color of the previously assumed minimum bar
                if (i !== miniIndex) {
                    bars[miniIndex].style.backgroundColor = "#fff";
                }
                miniIndex = j; // Update miniIndex to the new minimum
            } else {
                // Reset color if it is not the new minimum
                bars[j].style.backgroundColor = "#fff";
            }
        }

        // Swap the minimum element found with the current element at index i
        await waitforme(delay);
        swap(bars[miniIndex], bars[i]);

        // Reset the color of the swapped bar and mark the sorted bar
        bars[miniIndex].style.backgroundColor = "#fff";
        bars[i].style.backgroundColor = "#8e8e8e"; // Sorted color
    }
}

// Event listener for the "Selection Sort" button to start the sorting process
selectionSortBtn.addEventListener("click", async function () {
    // Disable buttons and controls during the sorting process
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();

    // Call selectionSort to begin sorting
    await selectionSort();

    // Re-enable buttons and controls after sorting is complete
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
});
