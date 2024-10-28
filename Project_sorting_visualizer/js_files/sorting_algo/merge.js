const mergeSortBtn=document.querySelector(".merge_sort");

async function merge(s,e,bars){
    let mid=~~((s+e)/2);//here you can also use Math.floor()
    let arr1=new Array();
    let arr2=new Array();

    for(let i=s; i<=mid; i++){
        await waitforme(delay);
        bars[i].style.backgroundColor="#00df2c";
        arr1.push(parseInt(bars[i].style.height));
    }
    for(let i=mid+1; i<=e; i++){
        await waitforme(delay);
        bars[i].style.backgroundColor="#00df2c";
        arr2.push(parseInt(bars[i].style.height));
    }

    let k=s;
    let i=0;
    let j=0;

    let mainColor="#00dcff";
    if(s===0 && e===bars.length-1){
        mainColor="#8e8e8e";
    }
    while(i<arr1.length && j<arr2.length){
        await waitforme(delay);
        if(arr1[i] < arr2[j]){
            bars[k].style.height=`${arr1[i++]}%`;
            bars[k].style.backgroundColor=`${mainColor}`;
        }else{
            bars[k].style.height=`${arr2[j++]}%`;
            bars[k].style.backgroundColor=`${mainColor}`;
        }
        k++;
    }

    while(i<arr1.length){
        await waitforme(delay);
        bars[k].style.backgroundColor=`${mainColor}`;
        bars[k++].style.height=`${arr1[i++]}%`;
    }

    while(j<arr2.length){
        await waitforme(delay);
        bars[k].style.backgroundColor=`${mainColor}`;
        bars[k++].style.height=`${arr2[j++]}%`;
    }

}

async function mergeSort(s, e, bars) {
    if(s>=e){
        return;
    }
    
    let mid=Math.floor((s+e)/2); //here you can also use ~~
    await mergeSort(s,mid,bars);
    await mergeSort(mid+1,e,bars);

    await merge(s,e,bars);
}

async function solveMerge(){
    const bars=document.querySelectorAll(".array_bar");
    // console.log(bars);
    await mergeSort(0,bars.length-1,bars);
}
mergeSortBtn.addEventListener("click",async function () {
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();
    await solveMerge();
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
})
