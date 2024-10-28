const quickSortBtn=document.querySelector(".quick_sort");

async function partition(s,e,bars){
    bars[s].style.backgroundColor="#00df2c";
    let pivatElem=parseInt(bars[s].style.height);
    let cnt=0;
    for(let i=s+1; i<=e; i++){
        await waitforme(delay);
        if(parseInt(bars[i].style.height) <= pivatElem){
            bars[i].style.backgroundColor="#00dcff";
            cnt++;
        }
    }
    let pivatIndex=cnt+s;
    await waitforme(delay);
    bars[pivatIndex].style.backgroundColor="#00df2c";
    bars[s].style.backgroundColor="#00df2c";
    swap(bars[pivatIndex],bars[s]);
    await waitforme(delay);
    bars[pivatIndex].style.backgroundColor="#8e8e8e";
    // console.log(bars[pivatIndex].style.backgroundColor);
    bars[s].style.backgroundColor="#00dcff";
    let i=s;
    let j=e;
    
    while(i<pivatIndex && j>pivatIndex){
        await waitforme(delay);
        while(parseInt(bars[i].style.height) <= pivatElem){
            i++;
        }
        while(parseInt(bars[j].style.height) > pivatElem){
            j--;
        }
        if(i<pivatIndex && j>pivatIndex){
            bars[i].style.backgroundColor="#000";
            bars[j].style.backgroundColor="#000";
            await waitforme(delay);
            swap(bars[i],bars[j]);
            i++;
            j--;
        }
    }
    await waitforme(delay);
    
    for(let i=s; i<=e; i++){
        if(bars[i].style.backgroundColor !== "rgb(142, 142, 142)"){
            // console.log(bars[i].style.backgroundColor);
            bars[i].style.backgroundColor="#fff";
        }
    }

    // for(let i=0; i<=e; i++){
    //     await waitforme(delay);
    //     bars[i].style.backgroundColor="#fff";
    // }

    return pivatIndex;
}

async function quickSort(s,e,bars){
    if(s>=e){
        return;
    }
    let p=await partition(s,e,bars);

    await quickSort(s,p-1,bars);
    await quickSort(p+1,e,bars);
}

async function solveQuick() {
    const bars=document.querySelectorAll(".array_bar");
    await quickSort(0,bars.length-1,bars);
}
quickSortBtn.addEventListener("click",async function () {
    disableSortingAlogBtns();
    disableArraySizeBtn();
    disableNewArrayGenerateBtn();
    await solveQuick();
    enableSortingAlgoBtns();
    enableArraySizeBtn();
    enableNewArrayGenerateBtn();
})




