// Function to find the index of the process with the shortest remaining burst time (SRTF logic)
function getNextProcess(index,arr,totalTime){
    let shortestJob=Infinity;// Initialize shortest burst time to a large value
    let shortestJobIndex=-1;// Index of the process with the shortest burst time
    // Loop through the processes to find the shortest remaining burst time
    for(let i=index; i<rowValue+index; i++){
        let temp=i%rowValue;// Circular traversal
        if(arr[temp][5]!==1 && arr[temp][2]<=totalTime && arr[temp][6]!==0){
            if(shortestJob>arr[temp][6]){
                shortestJob=arr[temp][6];// Update shortest burst time
                shortestJobIndex=temp;// Update index of the process
            }
        }
    }
    // If no process is ready, find the next available process (handles idle time)
    if(shortestJobIndex===-1){
        for(let i=index; i<rowValue+index; i++){
            let temp=i%rowValue;
            if(arr[temp][5]!==-1 && arr[temp][6]!==0){
                if(shortestJob>arr[temp][6]){
                    shortestJobIndex=temp;
                }
            }
        }
    }
    return shortestJobIndex;// Return index of the selected process
}

// Function to update the ready queue with processes eligible for execution
function addProcessInReadyQueue(arr, readyQueue, totalTime) {
    // Clear the ready queue
    readyQueue.length = 0;

    // Add eligible processes (based on arrival time and remaining burst time) to the queue
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][5] !== 1 && arr[i][2] <= totalTime && arr[i][6] > 0) {
            readyQueue.push(arr[i][1]); // Add process number to the queue
        }
    }

    // Sort the ready queue by the shortest remaining burst time
    readyQueue.sort((a, b) => {
        const processA = arr.find(process => process[1] === a);
        const processB = arr.find(process => process[1] === b);
        return processA[6] - processB[6];
    });

    // Update the ready queue visualization (if applicable)
    updateReadyQueue(readyQueue);
}

// SRTF (shortest remaining time first) Algorithm Execution
const runSRTF = async () => {
    // Initialization of variables
    let totalTime = 0; // Total time elapsed
    let totalWt = 0; // Total waiting time
    let totalTAT = 0; // Total turnaround time
    let completeTime = 0; // Time at which the current process finishes
    let totalBT = 0; // Total burst time of all processes
    let totalExecutionTime = 0; // Total execution time (includes context switches)
    let idleTime = 0; // Total idle time for CPU efficiency tracking
    let preProcessCompleteTime=0;// Tracks the last completion time for the Gantt chart

    const readyQueue = []; // Array to store ready queue for visualization
    ganttChartContainer.innerHTML = ""; // Clear Gantt chart visualization
    
    const processTableRows = processTableBody.querySelectorAll("tr");
    const statusTableRows = statusTableBody.querySelectorAll("tr");
    
    // Initialize process data from the table
    let arr = new Array(rowValue);
    // Process details format: 
    // [priority, processNo, AT, BT, Visited, completed(0,1), remainingTime]
    for (let i = 0; i < rowValue; i++) {
        arr[i] = new Array(7).fill(0);
        for (let j = 0; j < 4; j++) {
            arr[i][j] = Number(processTableRows[i].cells[j].textContent); // Extract data
        }
        arr[i][6]=arr[i][3];
    }
    
    // Sort processes by AT in Acending order
    for (let i = 0; i < rowValue -1; i++) {
        for (let j = 0; j < rowValue - 1 -i; j++) {
            if (arr[j][2] > arr[j+1][2]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }

    // for(let i=0; i<rowValue; i++){
    //     console.log(arr[i]);
    // }

    // Handle processes with BT = 0 immediately
    for(let i=0; i<rowValue; i++){
        if(arr[i][3]===0){
            // mark the process completed
            arr[i][5]=1;
            // Find corresponding row in the table for updates
            let row = 0;
            for (let j = 0; j < rowValue; j++) {
                if (arr[i][1] === Number(processTableRows[j].cells[1].textContent)) {
                    row = j;
                }
            }
            
            // Update process table for this process
            processTableRows[row].cells[4].textContent = `0.00s`;
            processTableRows[row].cells[5].textContent = `0.00s`;
            processTableRows[row].cells[6].textContent = `0.00s`;

            // Update status table
            statusTableRows[row].cells[3].textContent = `0.00s`;
            statusTableRows[row].cells[4].textContent = `0.00s`;

            statusTableRows[row].querySelector(".status-bar--progress").style.width=`100%`;
            waitforme(100);
        }
    }

    // find initial idle time 
    for(let i=0; i<rowValue; i++){
        if(arr[i][3]!==0){
            idleTime = arr[i][2]; // Tracks current time for scheduling
            addToGanttChart("X", 0, idleTime); // Add initial idle time if any
            totalTime = idleTime;
            preProcessCompleteTime=idleTime;
            break;
        }
    }
    // Continuously select the next process to execute
    let index=getNextProcess(0,arr,totalTime);
    while(index!==-1){
        const processName = arr[index][1];
        const arrivalTime=arr[index][2];
        const currBurstTime = arr[index][6];

        // Skip process if burst time is zero
        if (currBurstTime === 0) {
            index = getNextProcess(index+1,arr, totalTime);
            continue;
        }

        // Find corresponding row in the table for updates
        let row = 0;
        for (let j = 0; j < rowValue; j++) {
            if (arr[index][1] === Number(processTableRows[j].cells[1].textContent)) {
                row = j;
                break;
            }
        }

        //   update cpu status
        statusCPU.textContent=`P${processName}`;
        
        // Add process to ready queue and update visualization
        addProcessInReadyQueue(arr,readyQueue,totalTime);

        let executionTime=1000;
        let tempCurrBT=arr[index][6]*1000;
        const progressBar = statusTableRows[row].querySelector(".status-bar--progress");

        while(executionTime>0){
            executionTime-=100;
            tempCurrBT-=100;
            progressBar.style.width = `${(((arr[index][3] * 1000) - tempCurrBT) / (arr[index][3] * 1000)) * 100}%`;
            statusTableRows[row].cells[3].textContent = `${(tempCurrBT / 1000).toFixed(2)}s`;
            await waitforme(100 - algoSpeedValue);
        }
        
        arr[index][6]-=1;
        totalTime+=1;
        let nextProcess=getNextProcess(index,arr,totalTime);

        if(index!==nextProcess && arr[index][6]!==0){
            // arr[index][4]=0;// before remove mark unvisited
            readyQueue.shift();
            updateReadyQueue(readyQueue);

            completeTime=totalTime; //calculate completetime

            // Calculate turnaround time (TAT) and waiting time (WT)
            const turnaroundTime = completeTime - arrivalTime;
            totalTAT += turnaroundTime;

            const waitTime = turnaroundTime - (arr[index][3]-arr[index][6]);
            totalWt += waitTime;

            // Update process details in the process table
            processTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}`;
            processTableRows[row].cells[5].textContent = `${turnaroundTime.toFixed(2)}`;
            processTableRows[row].cells[6].textContent = `${waitTime.toFixed(2)}`;

            // update status table
            statusTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}s`;

            // Add the process to the Gantt chart
            addToGanttChart(processName, preProcessCompleteTime, completeTime);
            preProcessCompleteTime=completeTime;

            // set index to nextProcess
            index=nextProcess;

            // Handle idle time between processes
            if (index !== -1 && arr[index][2] > totalTime) {
                totalTime = arr[index][2];
                idleTime += (totalTime-completeTime); 
                addToGanttChart("X",completeTime,totalTime);
                preProcessCompleteTime=totalTime;
            }else{
                if(index!==-1){
                    addToGanttChart("CS",completeTime,completeTime+contextSwitchValue);
                    totalTime = completeTime+=contextSwitchValue;
                    preProcessCompleteTime=totalTime;
                }
            }

            continue;
        }

        if(arr[index][6]===0 && arr[index][5]!==1){
            // Mark completed
            arr[index][5]=1;
        
            const burstTime=arr[index][3];
            totalBT+=burstTime; //accumulate burst time
            completeTime=totalTime; //calculate completetime

            // Calculate turnaround time (TAT) and waiting time (WT)
            const turnaroundTime = completeTime - arrivalTime;
            totalTAT += turnaroundTime;

            const waitTime = turnaroundTime - burstTime;
            totalWt += waitTime;

            // Update process details in the process table
            processTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}`;
            processTableRows[row].cells[5].textContent = `${turnaroundTime.toFixed(2)}`;
            processTableRows[row].cells[6].textContent = `${waitTime.toFixed(2)}`;

            // update status table
            statusTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}s`;

            // Add process to ready queue and update visualization
            addProcessInReadyQueue(arr,readyQueue,totalTime);

            // Remove the process from the ready queue
            // arr[index][4]=0;// before remove mark unvisited
            readyQueue.shift();
            updateReadyQueue(readyQueue);

            // Add the process to the Gantt chart
            addToGanttChart(processName, preProcessCompleteTime, completeTime);
            preProcessCompleteTime=completeTime;

            // Find the next process to execute
            index = getNextProcess(index+1,arr, completeTime);

            // Handle idle time between processes
            if (index !== -1 && arr[index][2] > totalTime) {
                totalTime = arr[index][2];
                idleTime += (totalTime-completeTime); 
                addToGanttChart("X",completeTime,totalTime);
                preProcessCompleteTime=totalTime;
            }else{
                if(index!==-1){
                    addToGanttChart("CS",completeTime,completeTime+contextSwitchValue);
                    totalTime = completeTime+=contextSwitchValue;
                    preProcessCompleteTime=totalTime;
                }
            }
        }
    }
    // Final statistics update
    statusCPU.textContent = `Idle`; // CPU is idle after all processes are completed
    statAWT.textContent = `${(totalWt / rowValue).toFixed(2)}s`; // Average waiting time
    statATAT.textContent = `${(totalTAT / rowValue).toFixed(2)}s`; // Average turnaround time
    statExecutionTime.textContent = `${totalExecutionTime.toFixed(2)}s`; // Total execution time
    let completeTimeOfLastProcess=completeTime;
    let arrivalTimeOfFirstProcess=0;
    for(let i=0; i<rowValue; i++){
        if(arr[i][3]!==0){
            arrivalTimeOfFirstProcess=arr[i][2];
            break;
        }
    }
    totalExecutionTime = completeTimeOfLastProcess - arrivalTimeOfFirstProcess;
    statExecutionTime.textContent = totalExecutionTime.toFixed(2);
    statEfficiency.textContent = totalTime === 0 ? `0%` :`${((totalBT * 100) / totalExecutionTime).toFixed(2)}%`;
};
