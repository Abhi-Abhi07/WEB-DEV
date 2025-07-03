import { setComparing, setSorted, setSwapping, removeStates } from '../util.js/barColors.js';
import { swap } from '../util.js/swap.js';
import { waitforme } from '../util.js/wait_forme.js';
import { disableSortingAlogBtns, enableSortingAlgoBtns, disableArraySizeBtn, enableArraySizeBtn, disableNewArrayGenerateBtn, enableNewArrayGenerateBtn } from '../disable_enable_btns/disableEnableBtn.js';
import { updateAlgorithmInfo } from '../util.js/algorithmInfo.js';
import { getCurrentDelay } from '../util.js/getDelay.js';

// Select the "Quick Sort" button element from the document
const quickSortBtn = document.querySelector(".quick_sort");

// Get the speed slider element
const speedSlider = document.getElementById("algoSpeed");

// Function to partition the array and return the pivot index
async function partition(s, e, bars) {
    // Set the initial pivot element
    let pivotElem = parseInt(bars[s].style.height);
    let cnt = 0;
    // Count the number of elements less than or equal to the pivot element
    for (let i = s + 1; i <= e; i++) {
        const delay = getCurrentDelay();
        await waitforme(delay);
        setComparing(bars, [s, i]);
        if (parseInt(bars[i].style.height) <= pivotElem) {
            cnt++;
        }
        removeStates(bars, [s, i]);
    }
    // Calculate the pivot index and swap the pivot to this position
    let pivotIndex = cnt + s;
    const delay = getCurrentDelay();
    await waitforme(delay);
    setSwapping(bars, [s, pivotIndex]);
    swap(bars[pivotIndex], bars[s]);
    removeStates(bars, [s, pivotIndex]);
    // Initialize left and right pointers for partitioning around pivot
    let i = s;
    let j = e;
    // Sort elements around the pivot by swapping misplaced elements
    while (i < pivotIndex && j > pivotIndex) {
        const delay = getCurrentDelay();
        await waitforme(delay);
        // Move left pointer until finding an element greater than pivot
        while (i < pivotIndex && parseInt(bars[i].style.height) <= pivotElem) {
            i++;
        }
        // Move right pointer until finding an element less than or equal to pivot
        while (j > pivotIndex && parseInt(bars[j].style.height) > pivotElem) {
            j--;
        }
        // Swap elements on either side of pivot if needed
        if (i < pivotIndex && j > pivotIndex) {
            setSwapping(bars, [i, j]);
            const delay = getCurrentDelay();
            await waitforme(delay);
            swap(bars[i], bars[j]);
            removeStates(bars, [i, j]);
            i++;
            j--;
        }
    }
    // Mark pivot as sorted
    setSorted(bars, [pivotIndex]);
    return pivotIndex;
}

// Main quicksort function, recursively sorts around the pivot
async function quickSort(s, e, bars) {
    // Base case: return if subarray has less than two elements
    if (s >= e) {
        if (s === e) {
            setSorted(bars, [s]);
        }
        return;
    }

    // Get the pivot index after partitioning
    let p = await partition(s, e, bars);

    // Recursively apply quicksort on the left and right subarrays
    await quickSort(s, p - 1, bars);
    await quickSort(p + 1, e, bars);
}

// Function to initialize quicksort on the entire array
async function solveQuick() {
    const bars = document.querySelectorAll(".array_bar");
    await quickSort(0, bars.length - 1, bars);
}

// Event listener for the "Quick Sort" button to start sorting process
quickSortBtn.addEventListener("click", async function () {
    updateAlgorithmInfo('quick_sort');
    // Disable buttons and controls to prevent interaction during sorting
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();

    // Call solveQuick to begin sorting
    await solveQuick();

    // Re-enable buttons and controls after sorting is complete
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
});
