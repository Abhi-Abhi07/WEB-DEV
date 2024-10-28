function swap(bar1,bar2){
    const tempHeight=bar1.style.height;
    bar1.style.height=bar2.style.height;
    bar2.style.height=tempHeight;
}