const insertionSortBth=document.querySelector(".insertion_sort");

async function insertionSort() {
    const bars=document.querySelectorAll(".array_bar");
    for(let i=1; i<bars.length; i++){
        let temp=parseInt(bars[i].style.height);
        bars[i].style.backgroundColor="#00df2c";
        let j=i-1;
        while(j>=0){
            await waitforme(delay);
            if(parseInt(bars[j].style.height) > temp){
                if(j+1 !== i){
                    bars[j+1].style.backgroundColor="#00dcff";
                }
                bars[j].style.backgroundColor="#00dcff";
                await waitforme(delay);
                bars[j+1].style.height=bars[j].style.height;
                if(j+1 !== i){
                    bars[j+1].style.backgroundColor="#fff";
                }
            }else{
                break;
            }
            j--;
        }
        await waitforme(delay);
        bars[j+1].style.height=`${temp}%`;
        bars[j+1].style.backgroundColor="#fff";
    }
    bars[bars.length-1].style.backgroundColor="#fff";
    for(let i=bars.length-1; i>=0; i--){
        await waitforme(delay);
        bars[i].style.backgroundColor="#8e8e8e";
    }
}
insertionSortBth.addEventListener("click",async function () {
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();
    await insertionSort();
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
})
