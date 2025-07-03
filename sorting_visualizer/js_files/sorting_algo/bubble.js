import { setComparing, setSorted, setSwapping, removeStates } from '../util.js/barColors.js';
import { swap } from '../util.js/swap.js';
import { waitforme } from '../util.js/wait_forme.js';
import { getCurrentDelay } from '../util.js/getDelay.js';
import { updateAlgorithmInfo } from '../util.js/algorithmInfo.js';
import { disableSortingAlogBtns, enableSortingAlgoBtns, disableArraySizeBtn, enableArraySizeBtn, disableNewArrayGenerateBtn, enableNewArrayGenerateBtn } from '../disable_enable_btns/disableEnableBtn.js';

// Selects the "Bubble Sort" button element from the document
const bubbleSortBtn = document.querySelector(".bubble_sort");

// Defines the async bubble sort function to visually sort the array bars
async function bubbleSort() {
    try {
        // Selects all elements representing the array bars
        const bars = document.querySelectorAll(".array_bar");
        if (!bars.length) return;

        // Outer loop iterates over each bar, excluding the last sorted bars in each pass
        for (let i = 0; i < bars.length - 1; i++) {
            // Inner loop compares each pair of adjacent bars
            for (let j = 0; j < bars.length - i - 1; j++) {
                // Get current delay and wait
                const currentDelay = getCurrentDelay();
                await waitforme(currentDelay);

                // Set comparing state for current pair
                setComparing(bars, [j, j + 1]);

                // Check if the current bar is taller than the next bar
                if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                    // Set swapping state
                    setSwapping(bars, [j, j + 1]);
                    await waitforme(currentDelay);
                    swap(bars[j], bars[j + 1]);
                }

                // Remove comparing and swapping states
                removeStates(bars, [j, j + 1]);
            }

            // Set sorted state for the last element in this pass
            setSorted(bars, [bars.length - i - 1]);
        }

        // Set sorted state for the first element
        setSorted(bars, [0]);
    } catch (error) {
        console.error('Error in bubble sort:', error);
        // Re-enable controls in case of error
        enableSortingAlgoBtns();
        enableArraySizeBtn();
        enableNewArrayGenerateBtn();
    }
}

// Adds an event listener to the "Bubble Sort" button to start sorting on click
bubbleSortBtn.addEventListener("click", async function () {
    try {
        // Update algorithm information
        updateAlgorithmInfo("bubble_sort");

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
    } catch (error) {
        console.error('Error in bubble sort click handler:', error);
        // Re-enable controls in case of error
        enableSortingAlgoBtns();
        enableArraySizeBtn();
        enableNewArrayGenerateBtn();
    }
});
