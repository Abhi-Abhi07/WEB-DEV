import { setComparing, setSorted, setSwapping, removeStates } from '../util.js/barColors.js';
import { swap } from '../util.js/swap.js';
import { waitforme } from '../util.js/wait_forme.js';
import { disableSortingAlogBtns, enableSortingAlgoBtns, disableArraySizeBtn, enableArraySizeBtn, disableNewArrayGenerateBtn, enableNewArrayGenerateBtn } from '../disable_enable_btns/disableEnableBtn.js';
import { updateAlgorithmInfo } from '../util.js/algorithmInfo.js';
import { getCurrentDelay } from '../util.js/getDelay.js';

// Selects the "Insertion Sort" button element from the document
const insertionSortBth = document.querySelector(".insertion_sort");

// Get the speed slider element
const speedSlider = document.getElementById("algoSpeed");

// Defines the async insertion sort function to visually sort the array bars
async function insertionSort() {
    // Selects all elements representing the array bars
    const bars = document.querySelectorAll(".array_bar");
    // Mark first element as sorted
    setSorted(bars, [0]);
    // Outer loop starts from the second bar, as the first bar is considered sorted
    for (let i = 1; i < bars.length; i++) {
        // Stores the height of the current bar being inserted
        let temp = parseInt(bars[i].style.height);
        let j = i - 1;
        // Inner loop to find the correct position for the current bar in the sorted part
        while (j >= 0) {
            // Wait for delay
            const delay = getCurrentDelay();
            await waitforme(delay);
            // Set comparing state
            setComparing(bars, [j, j + 1]);
            // Check if the current bar in sorted section is greater than the one being inserted
            if (parseInt(bars[j].style.height) > temp) {
                // Set swapping state
                setSwapping(bars, [j, j + 1]);
                const delay = getCurrentDelay();
                await waitforme(delay);
                // Shift the current bar in sorted section to the right
                bars[j + 1].style.height = bars[j].style.height;
                bars[j + 1].setAttribute('data-value', parseInt(bars[j].style.height));
                removeStates(bars, [j, j + 1]);
            } else {
                removeStates(bars, [j, j + 1]);
                break;
            }
            j--;
        }
        // Place the current element in its correct position
        const delay = getCurrentDelay();
        await waitforme(delay);
        bars[j + 1].style.height = `${temp}%`;
        bars[j + 1].setAttribute('data-value', temp);
        setSorted(bars, [j + 1]);
    }
}

// Adds an event listener to the "Insertion Sort" button to start sorting on click
insertionSortBth.addEventListener("click", async function () {
    updateAlgorithmInfo('insertion_sort');
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
