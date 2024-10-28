// Selects the "Merge Sort" button element from the document
const mergeSortBtn = document.querySelector(".merge_sort");

// Helper function to merge two sorted subarrays
async function merge(s, e, bars) {
    // Calculate the middle index for dividing the array
    let mid = ~~((s + e) / 2); // Alternative to Math.floor

    // Create arrays to hold left and right subarrays
    let arr1 = new Array();
    let arr2 = new Array();

    // Fill left subarray (arr1) and change bar color to indicate selection
    for (let i = s; i <= mid; i++) {
        await waitforme(delay);
        bars[i].style.backgroundColor = "#00df2c";
        arr1.push(parseInt(bars[i].style.height));
    }

    // Fill right subarray (arr2) and change bar color to indicate selection
    for (let i = mid + 1; i <= e; i++) {
        await waitforme(delay);
        bars[i].style.backgroundColor = "#00df2c";
        arr2.push(parseInt(bars[i].style.height));
    }

    // Initialize pointers for merging the two arrays
    let k = s; // Index in the main array
    let i = 0; // Index for arr1
    let j = 0; // Index for arr2

    // Define color for merged bars; use final sorted color if merging entire array
    let mainColor = "#00dcff";
    if (s === 0 && e === bars.length - 1) {
        mainColor = "#8e8e8e";
    }

    // Merge elements from both subarrays into the main array
    while (i < arr1.length && j < arr2.length) {
        await waitforme(delay);
        if (arr1[i] < arr2[j]) {
            bars[k].style.height = `${arr1[i++]}%`;
            bars[k].style.backgroundColor = `${mainColor}`;
        } else {
            bars[k].style.height = `${arr2[j++]}%`;
            bars[k].style.backgroundColor = `${mainColor}`;
        }
        k++;
    }

    // Copy any remaining elements from arr1 into the main array
    while (i < arr1.length) {
        await waitforme(delay);
        bars[k].style.backgroundColor = `${mainColor}`;
        bars[k++].style.height = `${arr1[i++]}%`;
    }

    // Copy any remaining elements from arr2 into the main array
    while (j < arr2.length) {
        await waitforme(delay);
        bars[k].style.backgroundColor = `${mainColor}`;
        bars[k++].style.height = `${arr2[j++]}%`;
    }
}

// Main merge sort function to recursively divide and merge subarrays
async function mergeSort(s, e, bars) {
    // Base case: single-element subarray is already sorted
    if (s >= e) {
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
    // Calls mergeSort on the entire array from index 0 to the last index
    await mergeSort(0, bars.length - 1, bars);
}

// Event listener for the "Merge Sort" button to start sorting
mergeSortBtn.addEventListener("click", async function () {
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
