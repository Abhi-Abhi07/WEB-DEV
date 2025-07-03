import { setComparing, setSorted, setSwapping, removeStates } from '../util.js/barColors.js';
import { swap } from '../util.js/swap.js';
import { waitforme } from '../util.js/wait_forme.js';
import { disableSortingAlogBtns, enableSortingAlgoBtns, disableArraySizeBtn, enableArraySizeBtn, disableNewArrayGenerateBtn, enableNewArrayGenerateBtn } from '../disable_enable_btns/disableEnableBtn.js';
import { updateAlgorithmInfo } from '../util.js/algorithmInfo.js';
import { getCurrentDelay } from '../util.js/getDelay.js';

// Select the "Selection Sort" button element from the document
const selectionSortBtn = document.querySelector(".selection_sort");

// Get the speed slider element
const speedSlider = document.getElementById("algoSpeed");

// Function to perform the selection sort algorithm
async function selectionSort() {
    // Select all bars (array elements) in the document
    const bars = document.querySelectorAll(".array_bar");
    // Loop through each bar as the starting element
    for (let i = 0; i < bars.length; i++) {
        let miniIndex = i; // Assume the current bar is the minimum
        // Find the minimum element in the remaining array
        for (let j = i + 1; j < bars.length; j++) {
            // Wait for delay
            const delay = getCurrentDelay();
            await waitforme(delay);
            // Set comparing state for current pair
            setComparing(bars, [miniIndex, j]);
            // If the current bar is smaller than the minimum found so far, update miniIndex
            if (parseInt(bars[miniIndex].style.height) > parseInt(bars[j].style.height)) {
                miniIndex = j;
            }
            // Remove comparing state
            removeStates(bars, [miniIndex, j]);
        }
        // If we found a different minimum, swap it with the current position
        if (miniIndex !== i) {
            // Set swapping state
            setSwapping(bars, [i, miniIndex]);
            const delay = getCurrentDelay();
            await waitforme(delay);
            swap(bars[miniIndex], bars[i]);
            removeStates(bars, [i, miniIndex]);
        }
        // Set sorted state for the current position
        setSorted(bars, [i]);
    }
}

// Event listener for the "Selection Sort" button to start the sorting process
selectionSortBtn.addEventListener("click", async function () {
    updateAlgorithmInfo('selection_sort');
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
