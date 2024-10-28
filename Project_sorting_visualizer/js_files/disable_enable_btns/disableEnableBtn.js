function disableSortingAlogBtns(){
    document.querySelector(".bubble_sort").disabled=true;
    document.querySelector(".selection_sort").disabled=true;
    document.querySelector(".insertion_sort").disabled=true;
    document.querySelector(".merge_sort").disabled=true;
    document.querySelector(".quick_sort").disabled=true;
}

function enableSortingAlgoBtns(){
    document.querySelector(".bubble_sort").disabled=false;
    document.querySelector(".selection_sort").disabled=false;
    document.querySelector(".insertion_sort").disabled=false;
    document.querySelector(".merge_sort").disabled=false;
    document.querySelector(".quick_sort").disabled=false;
}

function disableNewArrayGenerateBtn(){
    document.getElementById("generateArrayBtn").disabled=true;
}

function enableNewArrayGenerateBtn(){
    document.getElementById("generateArrayBtn").disabled=false;
}

function disableArraySizeBtn(){
    document.getElementById("arraySize").disabled=true;
}

function enableArraySizeBtn(){
    document.getElementById("arraySize").disabled=false;
}