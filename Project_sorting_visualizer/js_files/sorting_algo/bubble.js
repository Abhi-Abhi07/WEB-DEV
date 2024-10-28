const bubbleSortBtn=document.querySelector(".bubble_sort");

async function bubbleSort() {
    const bars=document.querySelectorAll(".array_bar");
    // console.log(bars);
    // console.log(bars.length);
    for (let i = 0; i < bars.length -1; i++) {
        for (let j = 0; j < bars.length -i -1; j++) {
            await waitforme(delay);
            bars[j].style.backgroundColor="#00df2c";
            bars[j+1].style.backgroundColor="#00df2c";
            if(parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)){
                await waitforme(delay);
                swap(bars[j],bars[j+1]);
            }       
            bars[j].style.backgroundColor="#00dcff";
            bars[j+1].style.backgroundColor="#00dcff";
        }
        bars[bars.length-i-1].style.backgroundColor="#8e8e8e";
    }
    bars[0].style.backgroundColor="#8e8e8e";
}
bubbleSortBtn.addEventListener("click",async function () {
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();
    await bubbleSort();
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
})

