import { setComparing, setSorted, setSwapping, removeStates } from '../util.js/barColors.js';
import { swap } from '../util.js/swap.js';
import { waitforme } from '../util.js/wait_forme.js';
import { disableSortingAlogBtns, enableSortingAlgoBtns, disableArraySizeBtn, enableArraySizeBtn, disableNewArrayGenerateBtn, enableNewArrayGenerateBtn } from '../disable_enable_btns/disableEnableBtn.js';
import { updateAlgorithmInfo } from '../util.js/algorithmInfo.js';
import { getCurrentDelay } from '../util.js/getDelay.js';

// Selects the "Merge Sort" button element from the document
const mergeSortBtn = document.querySelector(".merge_sort");

// Get the speed slider element
const speedSlider = document.getElementById("algoSpeed");

// Helper function to merge two sorted subarrays
async function merge(s, e, bars) {
    // Calculate the middle index for dividing the array
    let mid = ~~((s + e) / 2); // Alternative to Math.floor

    // Create arrays to hold left and right subarrays
    let arr1 = new Array();
    let arr2 = new Array();

    // Fill left subarray (arr1)
    for (let i = s; i <= mid; i++) {
        const delay = getCurrentDelay();
        await waitforme(delay);
        setComparing(bars, [i]);
        arr1.push(parseInt(bars[i].style.height));
        removeStates(bars, [i]);
    }

    // Fill right subarray (arr2)
    for (let i = mid + 1; i <= e; i++) {
        const delay = getCurrentDelay();
        await waitforme(delay);
        setComparing(bars, [i]);
        arr2.push(parseInt(bars[i].style.height));
        removeStates(bars, [i]);
    }

    // Initialize pointers for merging the two arrays
    let k = s; // Index in the main array
    let i = 0; // Index for arr1
    let j = 0; // Index for arr2

    // Merge elements from both subarrays into the main array
    while (i < arr1.length && j < arr2.length) {
        const delay = getCurrentDelay();
        await waitforme(delay);
        setComparing(bars, [k]);
        
        if (arr1[i] < arr2[j]) {
            bars[k].style.height = `${arr1[i]}%`;
            bars[k].setAttribute('data-value', arr1[i]);
            i++;
        } else {
            bars[k].style.height = `${arr2[j]}%`;
            bars[k].setAttribute('data-value', arr2[j]);
            j++;
        }
        
        setSorted(bars, [k]);
        k++;
    }

    // Copy any remaining elements from arr1 into the main array
    while (i < arr1.length) {
        const delay = getCurrentDelay();
        await waitforme(delay);
        setComparing(bars, [k]);
        bars[k].style.height = `${arr1[i]}%`;
        bars[k].setAttribute('data-value', arr1[i]);
        i++;
        setSorted(bars, [k]);
        k++;
    }

    // Copy any remaining elements from arr2 into the main array
    while (j < arr2.length) {
        const delay = getCurrentDelay();
        await waitforme(delay);
        setComparing(bars, [k]);
        bars[k].style.height = `${arr2[j]}%`;
        bars[k].setAttribute('data-value', arr2[j]);
        j++;
        setSorted(bars, [k]);
        k++;
    }
}

// Main merge sort function to recursively divide and merge subarrays
async function mergeSort(s, e, bars) {
    // Base case: single-element subarray is already sorted
    if (s >= e) {
        if (s === e) {
            setSorted(bars, [s]);
        }
        return;
    }

    // Calculate the middle index for dividing the array
    let mid = Math.floor((s + e) / 2);

    // Recursively sort the left half
    await mergeSort(s, mid, bars);

    // Recursively sort the right half
    await mergeSort(mid + 1, e, bars);

    // Merge the two sorted halves
    await merge(s, e, bars);
}

// Function to start merge sort on the entire array
async function solveMerge() {
    const bars = document.querySelectorAll(".array_bar");
    await mergeSort(0, bars.length - 1, bars);
}

// Event listener for the "Merge Sort" button to start sorting
mergeSortBtn.addEventListener("click", async function () {
    updateAlgorithmInfo('merge_sort');
    // Disables buttons and controls during sorting to prevent interference
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();

    // Calls the solveMerge function to begin merge sort
    await solveMerge();

    // Enables buttons and controls after sorting is complete
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
});
