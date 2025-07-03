# Sorting Visualizer

A modern, interactive web application that visualizes various sorting algorithms in action. Built with HTML, CSS, and JavaScript, this project helps you understand how different sorting algorithms work through engaging animations and real-time visualization.

![Sorting Visualizer](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

- **Interactive Visualization**: Watch sorting algorithms in action with animated bar graphs
- **Multiple Algorithms**: Compare different sorting algorithms side by side
- **Customizable Settings**:
  - Adjust animation speed
  - Change array size
  - Generate new random arrays
- **Real-time Information**:
  - Current algorithm being used
  - Time complexity
  - Algorithm properties
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes

## 🎯 Supported Algorithms

1. **Bubble Sort** (O(n²))
   - Simple comparison-based algorithm
   - Repeatedly steps through the list
   - Compares adjacent elements and swaps if needed

2. **Selection Sort** (O(n²))
   - Divides input into sorted and unsorted regions
   - Repeatedly selects smallest element from unsorted region
   - Moves it to the sorted region

3. **Insertion Sort** (O(n²))
   - Builds sorted array one element at a time
   - Takes elements from unsorted section
   - Inserts them into correct position in sorted section

4. **Quick Sort** (O(n log n))
   - Divide-and-conquer strategy
   - Uses pivot element for partitioning
   - Recursively sorts sub-arrays

5. **Merge Sort** (O(n log n))
   - Divide-and-conquer algorithm
   - Splits array into halves
   - Recursively sorts and merges

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic understanding of sorting algorithms (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhi-Abhi07/WEB-DEV/tree/master/sorting_visualizer
   ```

2. Navigate to the project directory:
   ```bash
   cd Project_sorting_visualizer
   ```

3. Open `index.html` in your web browser:
   - Double-click the file
   - Or use a local server (recommended)

### Using a Local Server

For the best experience, use a local server:

```bash
# Using Python 3
python -m http.server

# Using Node.js
npx serve
```

Then open `http://localhost:8000` in your browser.

## 💻 Usage

1. **Generate Array**:
   - Click "Generate New Array" to create a new random array
   - Adjust array size using the slider

2. **Select Algorithm**:
   - Choose from the available sorting algorithms
   - Each algorithm has its own button with complexity information

3. **Control Speed**:
   - Use the speed slider to adjust animation speed
   - Slower speeds help understand the process better

4. **Theme Toggle**:
   - Click the moon/sun icon to switch between dark and light themes

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and animations
- **JavaScript (ES6+)**: 
  - Modern JavaScript features
  - Async/await for animations
  - ES6 modules for code organization

## 📁 Project Structure

```
sorting_visualizer/
├── index.html          # Main HTML file
├── style.css          # Styles and animations
├── js_files/          # JavaScript modules
│   ├── index.js       # Main application logic
│   ├── theme.js       # Theme management
│   ├── util.js/       # Utility functions
│   ├── sorting_algo/  # Sorting algorithms
│   └── disable_enable_btns/  # Button state management
└── README.md          # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by various sorting visualization projects
- Built with modern web technologies
- Special thanks to the open-source community
