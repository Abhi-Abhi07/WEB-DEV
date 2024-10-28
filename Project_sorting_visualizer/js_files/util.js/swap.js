// Function to swap the heights of two bars in the visualizer
function swap(bar1, bar2) {
    // Temporarily store the height of the first bar
    const tempHeight = bar1.style.height;
    
    // Set the height of the first bar to the height of the second bar
    bar1.style.height = bar2.style.height;
    
    // Set the height of the second bar to the temporarily stored height
    bar2.style.height = tempHeight;
}
