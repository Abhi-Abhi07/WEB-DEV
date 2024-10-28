const generateArrayBtn=document.getElementById("generateArrayBtn");
const arraySizeBtn=document.getElementById("arraySize");
let size=arraySizeBtn.value;

const algoSpeedBtn=document.getElementById("algoSpeed");
let MinimumAlgoSpeed=1000; //its 1000 millisec or 1sec
let delay=100;


let arrayContainer=document.getElementById("array_container");

const generateArray=((size)=>{
    arrayContainer.innerHTML="";
    for(let i=0; i<size; i++){
        // console.log(Math.floor(Math.random()*95)+5);
        let barHeight=Math.floor(Math.random()*95)+5;
        let bar=document.createElement("div");
        bar.classList.add("array_bar");
        bar.style.height=`${barHeight}%`;
        arrayContainer.appendChild(bar);
    }
})


window.addEventListener("load",()=>{
    generateArray(size);
})

generateArrayBtn.addEventListener("click",()=>{
    size=arraySizeBtn.value;
    generateArray(size);
})

arraySizeBtn.addEventListener("input",()=>{
    size=arraySizeBtn.value;
    generateArray(size);
    
})

algoSpeedBtn.addEventListener("input",()=>{
    delay=MinimumAlgoSpeed-algoSpeedBtn.value;
    // console.log(delay);
})

document.querySelector(".logo").addEventListener("click",()=>{
    location.reload();
})

