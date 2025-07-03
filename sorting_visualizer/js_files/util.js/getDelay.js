// Function to get the current delay value based on the speed slider
export function getCurrentDelay() {
    const speedSlider = document.getElementById("algoSpeed");
    
    // Convert slider value (0-1000) to delay (1000-0ms)
    // - Slider at 0 = 1000ms delay (slowest)
    // - Slider at 500 = 500ms delay (medium)
    // - Slider at 1000 = 0ms delay (fastest)
    return Math.max(0, 1000 - speedSlider.value);
} 