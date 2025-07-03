// FCFS Algorithm Execution
const runFCFS = async () => {
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
    // Process details format: [priority, processNo, AT, BT, Visited]
    for (let i = 0; i < rowValue; i++) {
        arr[i] = new Array(5).fill(0);
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

    for (let index = 0; index < rowValue; index++) {
    // Extract process details
      const processName = arr[index][1];
    //   console.log(processName);
    //   console.log(typeof processName);
      const arrivalTime=arr[index][2];
      const burstTime = arr[index][3];

    // Skip process if burst time is zero
    if (burstTime === 0) {
        // Handle idle time if no process is ready
        if(ganttChartContainer.lastChild!==null && typeof(Number(ganttChartContainer.lastChild.textContent))==="number"){
            if (index+1 < rowValue && arr[index+1][2] > totalTime && arr[index+1][3]!==0) {
                totalTime = arr[index+1][2];
                idleTime += (totalTime-completeTime);
                addToGanttChart("X",completeTime,totalTime);
            }else{
                // else add context switch time
                if(index+1 < rowValue && arr[index+1][3]!==0){
                    addToGanttChart("CS",completeTime,completeTime+contextSwitchValue);
                    totalTime = completeTime+=contextSwitchValue;
                }
            }
        }
        continue;
    }

    // Find corresponding row in the table for updates
    let row = 0;
    for (let j = 0; j < rowValue; j++) {
        if (processName === Number(processTableRows[j].cells[1].textContent)) {
            row = j;
        }
    }

    totalBT += burstTime; // Accumulate burst time
    completeTime = totalTime + burstTime; // Calculate completion time

    // Calculate turnaround time (TAT) and waiting time (WT)
    const turnaroundTime = completeTime - arrivalTime;
    totalTAT += turnaroundTime;

    const waitTime = turnaroundTime - burstTime;
    totalWt += waitTime;
    
    //   update cpu status
    statusCPU.textContent=`P${processName}`;

    // Update process details in the process table
    processTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}`;
    processTableRows[row].cells[5].textContent = `${turnaroundTime.toFixed(2)}`;
    processTableRows[row].cells[6].textContent = `${waitTime.toFixed(2)}`;
  
    // Add process to ready queue and visualize
    for(let i=index; i<rowValue; i++){
        if(arr[i][2]<=totalTime && arr[i][4]!==1 && arr[i][3]!==0){
            arr[i][4]=1;
            readyQueue.push(arr[i][1]);
            updateReadyQueue(readyQueue);
        }
    }
  
      // Update status bar for remaining burst time
      let remainingBT = burstTime * 1000;
      const progressBar = statusTableRows[row].querySelector(".status-bar--progress");
  
      while (remainingBT > 0) {
        progressBar.style.width = `${((burstTime * 1000 - remainingBT) / (burstTime * 1000)) * 100}%`;
        statusTableRows[row].cells[3].textContent = `${(remainingBT / 1000).toFixed(2)}s`;
        remainingBT -= 100; // Decrease remaining burst time by 100ms
        await waitforme(100-algoSpeedValue); // Wait for (1-100)ms
      }
      // Mark process as completed
      progressBar.style.width = `100%`;
      statusTableRows[row].cells[3].textContent = `0.00s`;

    // Update the completion time in the status table to display the final time when the process ends
    statusTableRows[row].cells[4].textContent = `${completeTime.toFixed(2)}s`;

    for(let temp=index; temp<rowValue; temp++){
        if(arr[temp][2]<=(completeTime+contextSwitchValue) && arr[temp][4]!==1 && arr[temp][3]!==0){
            arr[temp][4]=1;
            readyQueue.push(arr[temp][1]);
            updateReadyQueue(readyQueue);
        }
      }
    //   console.log(`${processName} : ${row} :${index}`);
      // Remove process from ready queue
          readyQueue.shift();
          updateReadyQueue(readyQueue);
  
      // Add process to Gantt chart
      addToGanttChart(processName, totalTime, completeTime);
      totalTime=completeTime;

        // Handle idle time if no process is ready
        if(ganttChartContainer.lastChild!==null && typeof Number(ganttChartContainer.lastChild.textContent)==="number"){
            if (index+1 < rowValue && arr[index+1][2] > totalTime && arr[index+1][3]!==0) {
                totalTime = arr[index+1][2];
                idleTime += (totalTime-completeTime);
                addToGanttChart("X",completeTime,totalTime);
            }else{
                // else add context switch time
                if(index+1 < rowValue && arr[index+1][3]!==0){
                    addToGanttChart("CS",completeTime,completeTime+contextSwitchValue);
                    totalTime = completeTime+=contextSwitchValue;
                }
            }
        }
    }
  
    // Update statistics
    statusCPU.textContent=`Idle`;
    statAWT.textContent = (totalWt / rowValue).toFixed(2);
    statATAT.textContent = (totalTAT / rowValue).toFixed(2);
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
  