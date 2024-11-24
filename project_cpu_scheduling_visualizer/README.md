# CPU Scheduling Algo Visualizer

Welcome to the CPU Scheduling Visualization project! This interactive application visually demonstrates how various CPU scheduling algorithms work. Built using HTML, CSS, and JavaScript, it is designed to enhance your understanding of these algorithms through engaging animations and real-time simulations.

## Supported CPU Scheduling Algorithms

This project currently supports the following CPU scheduling algorithms:

- **FCFS (First-Come, First-Served)**:
  - A non-preemptive scheduling algorithm where the first process to arrive is the first to execute.
  - Processes are handled based on their arrival time in the queue.

- **RR (Round Robin)**:
  - A preemptive scheduling algorithm where each process gets a fixed time slice (time quantum).
  - Once a process completes its time slice, it goes to the back of the queue if it still requires more execution time.

- **SJF (Shortest Job First)**:
  - A non-preemptive scheduling algorithm that prioritizes processes with the shortest burst time.
  - It reduces the average waiting time by executing shorter processes first.

- **SRTF (Shortest Remaining Time First)**:
  - A preemptive version of SJF, where the process with the shortest remaining burst time is executed next.
  - If a new process arrives with a shorter remaining burst time, the current process is preempted.

- **Priority**:
  - A non-preemptive scheduling algorithm that assigns priorities to processes.
  - The process with the highest priority (smallest priority value) is executed first.

- **Preemptive-Priority**:
  - A preemptive version of the Priority Scheduling algorithm.
  - If a new process arrives with a higher priority than the currently executing process, it preempts the current process.

## Features

- **Visual Representation**: 
  - See how each algorithm works in real-time with animated Gantt charts and status bars representing process states.
  - The ready queue and process states (e.g., waiting, executing, completed) are clearly visualized.

- **Adjustable Speed**: 
  - Control the speed of the algorithm execution using a slider. This allows you to better observe and understand each step of the scheduling process.

- **Process Management**:
  - Dynamically add and remove processes to the process table.
  - Automatically or manually generate random process data for simulation.
  - Edit process attributes such as arrival time, burst time, and priority for further customization.

- **CPU Efficiency & Statistics**:
  - View performance metrics such as average waiting time (AWT), average turnaround time (ATAT), and CPU efficiency.
  - The Gantt chart provides a visual representation of the time slots allocated to each process.

- **Ready Queue**:
  - The ready queue is dynamically updated as processes are added or executed, helping you visualize the order in which processes are scheduled.

- **Context Switching**: 
  - Includes a context switch time that represents the overhead of switching between processes. The context switch time is adjustable for testing its impact on the system.

## Technologies Used

- **HTML**: For structuring the web application and defining the layout of the process tables, buttons, and charts.
- **CSS**: For styling the application and ensuring an aesthetically pleasing and responsive user interface.
- **JavaScript**: For implementing the core logic of the CPU scheduling algorithms, managing process data, and handling interactivity. It also drives the animations and visual updates.

## How It Works

1. **Add/Remove Processes**: 
   - Add processes to the simulation through the "Add Row" button and remove them using the "Delete Row" button.
   - You can specify the arrival time, burst time, and priority for each process, or generate random values for them.
   
2. **Select Algorithm**: 
   - Choose from one of the supported algorithms (FCFS, RR, SJF, SRTF, Priority, Preemptive-Priority) from the dropdown menu.
   - Based on the selected algorithm, the processes are scheduled accordingly.
   
3. **Execute Simulation**: 
   - Click the "Start" button to begin the simulation. The processes will be executed step by step, and the visual representation will update dynamically.
   - The algorithm speed can be adjusted during the simulation to control the speed of execution.

4. **Statistics & Visualization**: 
   - As the simulation progresses, the average waiting time (AWT), average turnaround time (ATAT), total execution time, and CPU efficiency are displayed.
   - The ready queue and Gantt chart are continuously updated to provide real-time insights into the process scheduling.

## Getting Started

To view the CPU scheduling visualizer:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abhi-Abhi07/WEB-DEV/tree/master/project_cpu_scheduling_visualizer
