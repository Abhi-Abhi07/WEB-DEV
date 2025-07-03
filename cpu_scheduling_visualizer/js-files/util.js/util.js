// Update Ready Queue Visualization
const updateReadyQueue = (queue) => {
    readyQueueContainer.innerHTML = queue.map((process) => `<div class="queue-item">${process}</div>`).join("");
};
//   these 5 line for understanding above method updateReadyQueue() 
//   const arr=[];
//   arr.push('p1');
//   arr.push('p2');
//   arr=['p1','p2'] without .join()
//   arr=['p1 p2'] with .join()

// Add Process to Gantt Chart
const addToGanttChart = (process, startTime, endTime) => {
    if(endTime-startTime>0 && endTime!==Infinity){
        if(ganttChartContainer.lastChild !== null){
            if(ganttChartContainer.lastChild.textContent === process){
                let arr=ganttChartContainer.lastChild.title;
                let temp="";
                for(let i=7; i<=10; i++){
                    temp+=arr[i];
                }
                startTime=Number(temp);
                ganttChartContainer.lastChild.remove();
            }
        };
        const ganttBlock = document.createElement("div");
        ganttBlock.classList.add("gantt-block");
        ganttBlock.textContent = process;
        ganttBlock.style.width = `${(endTime - startTime) * 10 + 20}px`; // Scale width for visualization
        ganttBlock.title = `Start: ${startTime.toFixed(2)}, End: ${endTime.toFixed(2)}`;
        if(process==='X'){
            ganttBlock.style.background="red";
            ganttBlock.style.color="#fff";
            ganttBlock.title = `Start: ${startTime.toFixed(2)}, End: ${endTime.toFixed(2)} CPU in Idle state`;
        }
        if(process=="CS"){
            ganttBlock.style.background="blue";
            ganttBlock.style.color="#fff";
            ganttBlock.title = `Start: ${startTime.toFixed(2)}, End: ${endTime.toFixed(2)} CPU in Context Switch time`;
        }
        ganttChartContainer.appendChild(ganttBlock);
    }
};

const refreshPreData=(()=>{
    // console.log(processTableBody.childNodes);
    for(let i=1; i<=rowValue; i++){
        // console.log(processTableBody.childNodes[i].childNodes);
        processTableBody.childNodes[i].childNodes[9].textContent=`---`;
        processTableBody.childNodes[i].childNodes[11].textContent=`---`;
        processTableBody.childNodes[i].childNodes[13].textContent=`---`;
    }

    for(let i=1; i<=rowValue; i++){
        statusTableBody.childNodes[i].childNodes[5].innerHTML=`<div class="status-bar">
                                                    <div class="status-bar--progress"></div>
                                                        </div>`;
        statusTableBody.childNodes[i].childNodes[7].textContent=`0`;
        statusTableBody.childNodes[i].childNodes[9].textContent=`0`;
    }

    statusCPU.textContent="Idle";

    statAWT.textContent = "---";
    statATAT.textContent =  "---";
  
    statExecutionTime.textContent =  "---";
    statEfficiency.textContent =  "---";

    readyQueueContainer.innerHTML=""; // Clear ready queue container
    ganttChartContainer.innerHTML = ""; // Clear Gantt chart container
})

