function findIndex(index,arr,totalTime){
    let priorityJob=Infinity;
    let priorityJobIndex=-1;
    for(let j=index; j<index+rowValue; j++){
        let i=j%rowValue;
        if(arr[i][5]!==1 && arr[i][2]<=totalTime && arr[i][3]!==0){
            if(priorityJob>arr[i][0]){
                priorityJob=arr[i][0];
                priorityJobIndex=i;
            }
        }
    }

    if(priorityJobIndex===-1){
        for(let j=index; j<index+rowValue; j++){
            let i=j%rowValue;
            if(arr[i][5]!==1 && arr[i][3]!==0){
                if(priorityJob>arr[i][0]){
                    priorityJob=arr[i][0];
                    priorityJobIndex=i;
                }
            }
        }
    }
    return priorityJobIndex;
}

// Function to update the ready queue
const addProcessIntoReadyQueue = (arr, totalTime, readyQueue) => {
    // Clear current queue
    readyQueue.length = 0;

    // Add processes that are eligible (arrived and not completed)
    for (let i = 0; i < rowValue; i++) {
        if (arr[i][2] <= totalTime && arr[i][5] !== 1 && arr[i][3] !== 0) {
            readyQueue.push(arr[i][1]); // Add process ID to ready queue
        }
    }

    // Sort the ready queue by priority (smaller priority value is higher priority)
    readyQueue.sort((a, b) => {
        const processA = arr.find(p => p[1] === a);
        const processB = arr.find(p => p[1] === b);
        return processA[0] - processB[0]; // Compare priority values
    });

    updateReadyQueue(readyQueue);
};

// Priority Algorithm Execution
const runPriority = async () => {
    // Initialization of variables
    let totalTime = 0; // Total time elapsed
    let totalWt = 0; // Total waiting time
    let totalTAT = 0; // Total turnaround time
    let completeTime = 0; // Time at which the current process finishes
    let totalBT = 0; // Total burst time of all processes
    let totalExecutionTime = 0; // Total execution time (includes context switches)
    let idleTime = 0; // Total idle time for CPU efficiency tracking

    const readyQueue = []; // Array to store ready queue for visualization
    ganttChartContainer.innerHTML = ""; // Clear Gantt chart visualization

    const processTableRows = processTableBody.querySelectorAll("tr");
    const statusTableRows = statusTableBody.querySelectorAll("tr");

    let arr=new Array(rowValue);
    // arr details [priority    processNo      AT      BT      Visited     completed(0,1)]
    for(let i=0; i<rowValue; i++){
        arr[i]=new Array(6).fill(0);
        for(let j=0; j<4; j++){
            arr[i][j]=Number(processTableRows[i].cells[j].textContent);
        }
    }

    // for(let i=0; i<rowValue; i++){
    //     console.log(arr[i]);
    // }

    // Sort processes by AT in Acending order
    for (let i = 0; i < rowValue -1; i++) {
        for (let j = 0; j < rowValue - 1 -i; j++) {
            if (arr[j][2] > arr[j+1][2]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }

    // Handle processes with BT = 0 immediately
    for(let i=0; i<rowValue; i++){
        // Mark the process as completed immediately
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
            break;
        }
    }

    let index=findIndex(0,arr,totalTime);

    while (index!==-1) {
        const processName = arr[index][1];
        const arrivalTime=arr[index][2];
        const burstTime = arr[index][3];

        // Skip process if burst time is zero
        if (burstTime === 0) {
            index = findIndex(index+1,arr,totalTime);
            continue;
        }

        // Find corresponding row in the table for updates
        let row = 0;
        for (let j = 0; j < rowValue; j++) {
            if (arr[index][1] === Number(processTableRows[j].cells[1].textContent)) {
                row = j;
            }
        }

        totalBT += burstTime; // Accumulate burst time

        completeTime = totalTime + burstTime// Calculate completion time

        // Calculate turnaround time (TAT) and waiting time (WT)
        const turnaroundTime = completeTime - arrivalTime;
        totalTAT += turnaroundTime;

        const waitTime = turnaroundTime - burstTime;
        totalWt += waitTime;

        // Update process details in the process table
        processTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}`;
        processTableRows[row].cells[5].textContent = `${turnaroundTime.toFixed(2)}`;
        processTableRows[row].cells[6].textContent = `${waitTime.toFixed(2)}`;

        //   update cpu status
        statusCPU.textContent=`P${processName}`;

        // Add process to ready queue and update visualization
        addProcessIntoReadyQueue(arr,totalTime,readyQueue);

        // Update progress bar for the current process
        let remainingBT = burstTime * 1000;
        const progressBar = statusTableRows[row].querySelector(".status-bar--progress");
  
        while (remainingBT > 0) {
            remainingBT -= 100;
            progressBar.style.width = `${((burstTime * 1000 - remainingBT) / (burstTime * 1000)) * 100}%`;
            statusTableRows[row].cells[3].textContent = `${(remainingBT / 1000).toFixed(2)}s`;
            await waitforme(100 - algoSpeedValue); // Adjust speed based on user setting
        }

        // Update the completion time in the status table to display the final time when the process ends
        statusTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}s`;
  
        // Mark completed
        arr[index][5]=1;

        // Add process to ready queue and update visualization
        addProcessIntoReadyQueue(arr,totalTime,readyQueue);

        // Remove the process from the ready queue
        readyQueue.shift();
        updateReadyQueue(readyQueue);

        // Add the process to the Gantt chart
        addToGanttChart(processName, totalTime, completeTime);
        totalTime=completeTime;

        // Find the next process to execute
        index = findIndex(index+1,arr, totalTime);

        // Handle idle time between processes
        if (index !== -1 && arr[index][2] > totalTime) {
            totalTime = arr[index][2];
            idleTime += (totalTime-completeTime); 
            addToGanttChart("X",completeTime,totalTime);
        }else{
            if(index!==-1){
                addToGanttChart("CS",completeTime,completeTime+contextSwitchValue);
                totalTime = completeTime+=contextSwitchValue;
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
  