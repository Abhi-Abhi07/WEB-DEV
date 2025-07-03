// Function to find the next process to execute based on SJF criteria
function findNextProcess(arr, j ,completeTime) {
    let index = -1;
    // temp is use for finding shortest job
    let temp = Infinity;

    // Check for processes ready to execute
    for (let k = j; k < rowValue+j; k++) {
        // arr[i][2] check for arrivalTime 
        // arr[i][3] check for burstTime
        // arr[i][5] check for completed or not
        let i=k%rowValue;
        if (arr[i][2] <= completeTime && arr[i][3]!==0 && arr[i][5]!==1) {
            if (temp > arr[i][3]) {
                temp = arr[i][3];
                index = i;
            }
        }
    }

    // If no process is ready, find the next earliest arrival time
    if (index === -1) {
        for (let k = j; k < rowValue+j; k++) {
            let i=k%rowValue;
            if (temp > arr[i][3] && arr[i][3]!==0 && arr[i][5]!==1) {
                temp = arr[i][2];
                index = i;
            }
        }
    }

    return index;
}

// SJF Algorithm Execution
const runSJF = async () => {
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
    
    // Initialize process data from the table
    let arr = new Array(rowValue);
    // Process details format: [priority, processNo, AT, BT, Visited, completed(0,1)]
    for (let i = 0; i < rowValue; i++) {
        arr[i] = new Array(6).fill(0);
        for (let j = 0; j < 4; j++) {
            arr[i][j] = Number(processTableRows[i].cells[j].textContent); // Extract data
        }
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

    // Continuously select the next process to execute
    let index=findNextProcess(arr,0,totalTime);
    // Process execution loop
    while(index!==-1) {
        const processName = arr[index][1];
        const arrivalTime=arr[index][2];
        const burstTime = arr[index][3];

        // Skip process if burst time is zero
        if (burstTime === 0) {
            index = findNextProcess(arr,index+1, completeTime);
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
        for(let i=0; i<rowValue; i++){
            if(arr[i][2]<=totalTime && arr[i][4]!==1 && arr[i][3]!==0){
                arr[i][4]=1;
                readyQueue.push(arr[i][1]);
                updateReadyQueue(readyQueue);
            }
        }

        // Update progress bar for the current process
        let remainingBT = burstTime * 1000;
        const progressBar = statusTableRows[row].querySelector(".status-bar--progress");

        while (remainingBT > 0) {
            progressBar.style.width = `${((burstTime * 1000 - remainingBT) / (burstTime * 1000)) * 100}%`;
            statusTableRows[row].cells[3].textContent = `${(remainingBT / 1000).toFixed(2)}s`;
            remainingBT -= 100;
            await waitforme(100 - algoSpeedValue); // Adjust speed based on user setting
        }

        // Mark process as complete
        progressBar.style.width = `100%`;
        statusTableRows[row].cells[3].textContent = `0.00s`;

        // Update the completion time in the status table to display the final time when the process ends
        statusTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}s`;

        // Mark completed
        arr[index][5]=1;

        // Add process to ready queue and update visualization
        for(let i=0; i<rowValue; i++){
            if(arr[i][2]<=(completeTime+contextSwitchValue) && arr[i][4]!==1 && arr[i][3]!==0){
                arr[i][4]=1;
                readyQueue.push(arr[i][1]);
                updateReadyQueue(readyQueue);
            }
        }

        // Remove the process from the ready queue
        readyQueue.shift();
        updateReadyQueue(readyQueue);

        // Add the process to the Gantt chart
        addToGanttChart(processName, totalTime, completeTime);
        totalTime=completeTime;

        // Find the next process to execute
        index = findNextProcess(arr,index+1, completeTime);

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
