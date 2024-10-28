// Select the "Quick Sort" button element from the document
const quickSortBtn = document.querySelector(".quick_sort");

// Function to partition the array and return the pivot index
async function partition(s, e, bars) {
    // Set the initial pivot element and mark it with a distinct color
    bars[s].style.backgroundColor = "#00df2c";
    let pivotElem = parseInt(bars[s].style.height);
    let cnt = 0;

    // Count the number of elements less than or equal to the pivot element
    for (let i = s + 1; i <= e; i++) {
        await waitforme(delay);
        if (parseInt(bars[i].style.height) <= pivotElem) {
            bars[i].style.backgroundColor = "#00dcff"; // Temporarily highlight bars less than pivot
            cnt++;
        }
    }

    // Calculate the pivot index and swap the pivot to this position
    let pivotIndex = cnt + s;
    await waitforme(delay);
    bars[pivotIndex].style.backgroundColor = "#00df2c"; // Mark the pivot position
    bars[s].style.backgroundColor = "#00df2c"; // Reset initial pivot color
    swap(bars[pivotIndex], bars[s]); // Place pivot in correct position
    await waitforme(delay);

    // Set color for sorted pivot position
    bars[pivotIndex].style.backgroundColor = "#8e8e8e";
    bars[s].style.backgroundColor = "#00dcff";

    // Initialize left and right pointers for partitioning around pivot
    let i = s;
    let j = e;

    // Sort elements around the pivot by swapping misplaced elements
    while (i < pivotIndex && j > pivotIndex) {
        await waitforme(delay);
        
        // Move left pointer until finding an element greater than pivot
        while (parseInt(bars[i].style.height) <= pivotElem) {
            i++;
        }
        
        // Move right pointer until finding an element less than or equal to pivot
        while (parseInt(bars[j].style.height) > pivotElem) {
            j--;
        }

        // Swap elements on either side of pivot if needed
        if (i < pivotIndex && j > pivotIndex) {
            bars[i].style.backgroundColor = "#000"; // Highlight swapped bars
            bars[j].style.backgroundColor = "#000";
            await waitforme(delay);
            swap(bars[i], bars[j]);
            i++;
            j--;
        }
    }
    await waitforme(delay);

    // Reset color of bars that are not part of the sorted pivot position
    for (let i = s; i <= e; i++) {
        if (bars[i].style.backgroundColor !== "rgb(142, 142, 142)") {
            bars[i].style.backgroundColor = "#fff";
        }
    }

    return pivotIndex; // Return pivot index for recursive sorting
}

// Main quicksort function, recursively sorts around the pivot
async function quickSort(s, e, bars) {
    // Base case: return if subarray has less than two elements
    if (s >= e) {
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
    await quickSort(0, bars.length - 1, bars); // Sort from start to end of array
}

// Event listener for the "Quick Sort" button to start sorting process
quickSortBtn.addEventListener("click", async function () {
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
