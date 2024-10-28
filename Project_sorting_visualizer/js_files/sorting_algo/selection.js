const selectionSortBtn=document.querySelector(".selection_sort");

async function selectionSort() {
    const bars=document.querySelectorAll(".array_bar");
    for(let i=0; i<bars.length; i++){
        bars[i].style.backgroundColor="#00df2c";
        let miniIndex=i;
        for(let j=i+1; j<bars.length ; j++){
            bars[j].style.backgroundColor="#00dcff";
            await waitforme(delay);
            if(parseInt(bars[miniIndex].style.height) > parseInt(bars[j].style.height)){
                if(i!==miniIndex){
                    bars[miniIndex].style.backgroundColor="#fff";
                }
                miniIndex=j;
            }else{
                bars[j].style.backgroundColor="#fff";
            }
        }
        await waitforme(delay);
        swap(bars[miniIndex],bars[i]);
        bars[miniIndex].style.backgroundColor="#fff";
        bars[i].style.backgroundColor="#8e8e8e";
    }
}
selectionSortBtn.addEventListener("click",async function () {
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();
    await selectionSort();
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
})
