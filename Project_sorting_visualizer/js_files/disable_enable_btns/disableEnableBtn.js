// Disables all sorting algorithm buttons to prevent user interaction during sorting
function disableSortingAlogBtns() {
    document.querySelector(".bubble_sort").disabled = true;
    document.querySelector(".selection_sort").disabled = true;
    document.querySelector(".insertion_sort").disabled = true;
    document.querySelector(".merge_sort").disabled = true;
    document.querySelector(".quick_sort").disabled = true;
}

// Enables all sorting algorithm buttons after sorting is complete
function enableSortingAlgoBtns() {
    document.querySelector(".bubble_sort").disabled = false;
    document.querySelector(".selection_sort").disabled = false;
    document.querySelector(".insertion_sort").disabled = false;
    document.querySelector(".merge_sort").disabled = false;
    document.querySelector(".quick_sort").disabled = false;
}

// Disables the "Generate New Array" button to prevent new array generation during sorting
function disableNewArrayGenerateBtn() {
    document.getElementById("generateArrayBtn").disabled = true;
}

// Enables the "Generate New Array" button after sorting is complete
function enableNewArrayGenerateBtn() {
    document.getElementById("generateArrayBtn").disabled = false;
}

// Disables the "Array Size" slider to prevent resizing the array during sorting
function disableArraySizeBtn() {
    document.getElementById("arraySize").disabled = true;
}

// Enables the "Array Size" slider after sorting is complete
function enableArraySizeBtn() {
    document.getElementById("arraySize").disabled = false;
}
