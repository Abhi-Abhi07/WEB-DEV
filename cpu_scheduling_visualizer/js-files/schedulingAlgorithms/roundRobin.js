// Function to Find the Next Process
function getNextProcessIndex(arr, i, totalTime) {
    // Check for processes that have arrived and have burst time remaining
    for (let index = i; index < rowValue + i; index++) {
        if (
            arr[index % rowValue][2] <= totalTime && // Process has arrived
            arr[index % rowValue][3] > 0 // Process still has burst time left
        ) {
            return index % rowValue;
        }
    }

    // If no processes meet the criteria, find the next process by earliest arrival time
    let nextProcessIndex = -1;
    let earliestArrivalTime = Infinity;
    for (let index = 0; index < rowValue; index++) {
        if (arr[index][3] > 0 && arr[index][2] < earliestArrivalTime) {
            earliestArrivalTime = arr[index][2];
            nextProcessIndex = index;
        }
    }

    // Mark idle period in Gantt chart if no process is ready
    // if (nextProcessIndex === -1) {
    //     addToGanttChart("X", totalTime, earliestArrivalTime);
    // }
    return nextProcessIndex; // Return the index of the next process
}

// Round Robin Algorithm Execution
const runRR = async () => {
    // Initialization
    let totalTime = 0; // Tracks total execution time
    let totalWt = 0; // Accumulates total waiting time
    let totalTAT = 0; // Accumulates total turnaround time
    let completeTime = 0; // Completion time for the current process
    let totalBT = 0; // Tracks the total burst time executed
    let totalExecutionTime = 0; // Tracks total time including context switches
    let idleTime = 0; // Total idle time for CPU efficiency tracking

    // Arrays to store process attributes
    let fixBurstTimeArr = []; // Original burst times for reference

    // Get time quantum input and validate it
    const TQ = document.getElementById("timeQuantumInput");
    let timeQuantumValue = Number(TQ.value);
    if (timeQuantumValue < 1 || timeQuantumValue > 5) {
        timeQuantumValue = 2; // Default to 2 if input is invalid
        TQ.value = `2`;
    }
    
    const readyQueue = []; // Queue to maintain ready processes
    ganttChartContainer.innerHTML = ""; // Clear Gantt chart for fresh execution
    
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

    // Populate arrival and burst time arrays from the process table
    for (let i = 0; i < rowValue; i++) {
        let burstTime =  arr[i][3];
        fixBurstTimeArr.push(burstTime);
    }
    
    // for(let i=0; i<rowValue; i++){
    //     console.log(arr[i]);
    // }
    // console.log(fixBurstTimeArr);

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

    let index = getNextProcessIndex(arr, 0, totalTime); // Start with the first process

    while(index!==-1) {
        let processName = arr[index][1];
        let arrivalTime = arr[index][2];
        let burstTime = arr[index][3];
        
        // Skip process if burst time is zero
        if (burstTime === 0) {
            // get next process
            index = getNextProcessIndex(arr, index + 1, totalTime);
            continue;
        }

        // Handle idle time if the process hasn't arrived yet
        if (arrivalTime > totalTime) {
            addToGanttChart("X", totalTime, arrivalTime);
            idleTime += (arrivalTime - totalTime);
            totalTime = arrivalTime;
        }

        // Find corresponding row in the table for updates
        let row = 0;
        for (let j = 0; j < rowValue; j++) {
            if (processName === Number(processTableRows[j].cells[1].textContent)) {
                row = j;
            }
        }

        // Calculate execution time for the process (min of burst time and time quantum)
        let executionTime = Math.min(burstTime, timeQuantumValue);
        totalBT += executionTime;

        completeTime = totalTime + executionTime; // Calculate completion time


        // Update CPU status
        statusCPU.textContent = `P${processName}`;

        for(let j=index; j<rowValue+index; j++){
            let temp=j%rowValue;
            if(arr[temp][2]<=totalTime && arr[temp][5]!==1 && arr[temp][4]!==1 && fixBurstTimeArr[temp]!==0){
                // mark visited
                arr[temp][4]=1;
                // update ready queue
                readyQueue.push(arr[temp][1]);
                updateReadyQueue(readyQueue);
            }
        }

        // Simulate process execution and update the progress bar
        let remainingBT = burstTime * 1000;
        let remainingExecutionTime = executionTime * 1000;
        const progressBar = statusTableRows[row].querySelector(".status-bar--progress");

        while (remainingBT >= 0 && remainingExecutionTime >= 0) {
            progressBar.style.width = `${((fixBurstTimeArr[index] * 1000 - remainingBT) / (fixBurstTimeArr[index] * 1000)) * 100}%`;
            statusTableRows[row].cells[3].textContent = `${(remainingBT / 1000).toFixed(2)}s`;
            remainingBT-=100;
            remainingExecutionTime -= 100; // Decrement by 100ms
            await waitforme(100 - algoSpeedValue); // Adjust execution speed
        }

        totalTime += executionTime; // update total time


        // Update burst time and mark completion if necessary
        arr[index][3] = Math.max(0, arr[index][3] - timeQuantumValue);
        // if (burstTime <= timeQuantumValue) {
        //     arr[index][3] = 0;
        // } else {
        //     arr[index][3] -= timeQuantumValue;
        // }
        if (arr[index][3] === 0) {
            // Calculate turnaround time and waiting time (including context switch)
            let turnaroundTime = completeTime - arrivalTime;
            let waitTime = turnaroundTime - fixBurstTimeArr[index];
            processTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}`;
            processTableRows[row].cells[5].textContent = `${turnaroundTime.toFixed(2)}`;
            processTableRows[row].cells[6].textContent = `${waitTime.toFixed(2)}`;
            totalTAT += turnaroundTime;
            totalWt += waitTime;
        }

        statusTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}s`;

        // Remove process from ready queue
        arr[index][4]=0;// before remove mark unvisited
        readyQueue.shift();
        updateReadyQueue(readyQueue);

        // competion Mark
        if(progressBar.style.width==="100%"){
            arr[index][5]=1;
        }

        for(let j=index; j<rowValue+index; j++){
            let temp=j%rowValue;
            if(arr[temp][2]<=totalTime && arr[temp][5]!==1 && arr[temp][4]!==1 && fixBurstTimeArr[temp]!==0){
                arr[temp][4]=1;
                readyQueue.push(arr[temp][1]);
                updateReadyQueue(readyQueue);  
            }
        }

        // Add process to Gantt chart
        addToGanttChart(processName, completeTime - executionTime , completeTime);

        // Find the next process index
        index = getNextProcessIndex(arr, index + 1, totalTime);

        // Handle idle time if no process is ready
        if (index >= 0 && arr[index][2] > totalTime) {
            totalTime = arr[index][2];
            idleTime += (totalTime-completeTime);
            addToGanttChart("X",completeTime,totalTime);
        }else{
            // else add context switch time
            if (index !== -1) {
                addToGanttChart("CS", totalTime, totalTime+contextSwitchValue);
                completeTime+=contextSwitchValue;
                totalTime+=contextSwitchValue;
            }
        }
    } 

    // Update final statistics
    statusCPU.textContent = `Idle`;
    statAWT.textContent = (totalWt / rowValue).toFixed(2);
    statATAT.textContent = (totalTAT / rowValue).toFixed(2);

    // Calculate execution time and CPU efficiency
    let completeTimeOfLastProcess=completeTime;
    let arrivalTimeOfFirstProcess=0;
    for(let i=0; i<rowValue; i++){
        if(fixBurstTimeArr[i]!==0){
            arrivalTimeOfFirstProcess=arr[i][2];
            break;
        }
    }
    totalExecutionTime = completeTimeOfLastProcess - arrivalTimeOfFirstProcess;
    statExecutionTime.textContent = totalExecutionTime.toFixed(2);
    statEfficiency.textContent = totalTime === 0 ? `0%` :`${((totalBT * 100) / totalExecutionTime).toFixed(2)}%`;
};
