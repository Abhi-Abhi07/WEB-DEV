const processTableBody = document.querySelector(".process-table--body");
const rowButton = document.getElementById("addRowButton");
const deleteButton = document.getElementById("deleteRowButton");
const generateDataButton = document.getElementById("generateDataButton");
const startButton = document.getElementById("startButton");

let rowValue = 0;

const statusTableBody = document.querySelector(".status-table--body");
const statAWT = document.querySelector(".stat-awt");
const statATAT = document.querySelector(".stat-atat");
const statExecutionTime = document.querySelector(".stat-execution-time");
const statEfficiency = document.querySelector(".stat-efficiency");
const statAlgo = document.querySelector(".stat-algorithm");
const statusCPU = document.querySelector(".stat-cpu");

const selectElement = document.getElementById('algorithmSelect');

const readyQueueContainer = document.querySelector(".ready-queue"); // Ready queue container
const ganttChartContainer = document.querySelector(".gantt-chart"); // Gantt chart container

const algoSpeed=document.getElementById("algoSpeed");
let algoSpeedValue =Number(algoSpeed.value)
document.getElementById("algoSpeed").addEventListener("input",()=>{
    algoSpeedValue=Number(algoSpeed.value);
    // console.log(100-algoSpeedValue);
})

let selectedValue = selectElement.value;

const contextSwitch=document.getElementById("contextSwitch");
let contextSwitchValue= Number(contextSwitch.value)
document.getElementById("contextSwitch").addEventListener("input",()=>{
    contextSwitchValue=Number(contextSwitch.value);
    if(contextSwitchValue>1 || contextSwitchValue<0){
        contextSwitchValue=0.5;
        contextSwitch.value=0.5;
    }
    // console.log(contextSwitchValue);
})

function disableButtons(){
    rowButton.disabled=true;
    deleteButton.disabled=true;
    generateDataButton.disabled=true;
    startButton.disabled=true;
    selectElement.disabled=true;
    contextSwitch.disabled=true;
}

function disableTimeQuantumButton(){
    document.getElementById("timeQuantumInput").disabled=true;
}

function enableButtons(){
    rowButton.disabled=false;
    deleteButton.disabled=false;
    generateDataButton.disabled=false;
    startButton.disabled=false;
    selectElement.disabled=false;
    contextSwitch.disabled=false;
}

function enableTimeQuantumButton(){
    document.getElementById("timeQuantumInput").disabled=false;
}

rowButton.addEventListener("click", () => {
  if (rowValue < 10) {
    if(rowValue>0){
        refreshPreData();
    }
    rowValue += 1;
    addRowInProcessTable();
    addRowInStatusTable();
  }
});

deleteButton.addEventListener("click", () => {
  if (rowValue > 0) {
    refreshPreData();
    rowValue -= 1;
    deleteRowInProcessTable();
    deleteRowInStatusTable();
  }
});

generateDataButton.addEventListener("click",()=>{
    if(rowValue>0){
        refreshPreData();
        fillRandomData();
    }
})

function enableEditInPriorityCol() {
    const rows = processTableBody.querySelectorAll("tr"); // Select all rows in the table body
    rows.forEach((row) => {
        const priorityCell = row.cells[0]; //the priority column is the first column (index 0)
        if (priorityCell) {
            priorityCell.contentEditable = "true"; // Set contenteditable to true
            // console.log(priorityCell);
        }
    });
}

function disableEditInPriorityCol() {
    const rows = processTableBody.querySelectorAll("tr"); // Select all rows in the table body
    rows.forEach((row) => {
        const priorityCell = row.cells[0]; //the priority column is the first column (index 0)
        if (priorityCell) {
            priorityCell.contentEditable = "false"; // Set contenteditable to false
            // console.log(priorityCell);
        }
    });
}


// let selectedValue = selectElement.value;
selectElement.addEventListener("input",()=>{
    selectedValue=selectElement.value;
    if(rowValue>0){
        refreshPreData();
    }
    if(selectedValue === "RR"){
        document.querySelector(".time-quantum").innerHTML=
        `<label for="timeQuantumInput">Time Quantum : </label>
        <input type="number" min="1" max="5" value="2" id="timeQuantumInput">`
    }else{
        document.querySelector(".time-quantum").innerHTML="";
    }
    
    if(selectedValue==="Priority" || selectedValue==="P-Priority"){
        enableEditInPriorityCol();
    }else{
        disableEditInPriorityCol();
    }

    if(selectedValue==="RR" || selectedValue==="FCFS" || selectedValue==="SJF" || selectedValue==="SRTF"){
        for(let row=1; row<=rowValue; row++){
            processTableBody.childNodes[row].childNodes[1].textContent=`${1}`;
        }
    }
    // console.log(selectedValue);
    // console.log(typeof selectedValue);
})

startButton.addEventListener("click", async() => {
    statAlgo.textContent=selectedValue;
    if(rowValue>=1){
        refreshPreData();
        disableButtons();
        
        switch (selectedValue) {
            case "FCFS":
                await runFCFS();
                break;

            case "RR":
                disableTimeQuantumButton();
                await runRR();
                enableTimeQuantumButton();
                break;

            case "SJF":
                await runSJF();
                break;

            case "SRTF":
                await runSRTF();
                break;

            case "Priority":
                await runPriority();
                break;

            case "P-Priority":
                await runPreemptivePriority();
                break;
        
            default:
                break;
        }

        enableButtons();
    }
});

// Event listener for clicking the logo to reload the page
document.querySelector(".logo").addEventListener("click", () => {
    location.reload(); // Reload the page to reset the application
});



