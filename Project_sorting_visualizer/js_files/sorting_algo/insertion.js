// Selects the "Insertion Sort" button element from the document
const insertionSortBth = document.querySelector(".insertion_sort");

// Defines the async insertion sort function to visually sort the array bars
async function insertionSort() {
    // Selects all elements representing the array bars
    const bars = document.querySelectorAll(".array_bar");

    // Outer loop starts from the second bar, as the first bar is considered sorted
    for (let i = 1; i < bars.length; i++) {
        // Stores the height of the current bar being inserted
        let temp = parseInt(bars[i].style.height);

        // Highlights the bar being inserted
        bars[i].style.backgroundColor = "#00df2c";

        // Inner loop to find the correct position for the current bar in the sorted part
        let j = i - 1;
        while (j >= 0) {
            // Waits for a specific delay to create the visual effect
            await waitforme(delay);

            // Checks if the current bar in sorted section is greater than the one being inserted
            if (parseInt(bars[j].style.height) > temp) {
                // Resets color of the next bar if it's not the bar being inserted
                if (j + 1 !== i) {
                    bars[j + 1].style.backgroundColor = "#00dcff";
                }

                // Highlights the current bar being compared
                bars[j].style.backgroundColor = "#00dcff";

                // Waits for a delay to visualize the comparison
                await waitforme(delay);

                // Shifts the current bar in sorted section to the right
                bars[j + 1].style.height = bars[j].style.height;

                // Resets color of the moved bar if it's not the bar being inserted
                if (j + 1 !== i) {
                    bars[j + 1].style.backgroundColor = "#fff";
                }
            } else {
                // Breaks out of the loop if correct position is found
                break;
            }
            j--;
        }

        // Waits and sets the height of the current bar to its correct position
        await waitforme(delay);
        bars[j + 1].style.height = `${temp}%`;
        bars[j + 1].style.backgroundColor = "#fff";
    }

    // Ensures the last bar color is reset after sorting
    bars[bars.length - 1].style.backgroundColor = "#fff";

    // Loops backward to set the color of each bar as sorted
    for (let i = bars.length - 1; i >= 0; i--) {
        await waitforme(delay);
        bars[i].style.backgroundColor = "#8e8e8e";
    }
}

// Adds an event listener to the "Insertion Sort" button to start sorting on click
insertionSortBth.addEventListener("click", async function () {
    // Disables buttons and controls during sorting to prevent interference
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();

    // Calls the insertion sort function and waits for it to complete
    await insertionSort();

    // Enables buttons and controls after sorting is complete
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
});
