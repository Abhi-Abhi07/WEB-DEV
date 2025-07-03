// Utility functions for managing bar colors during sorting

// Reset all bars to default state
export function resetBars(bars) {
    bars.forEach(bar => {
        bar.className = 'array_bar';
    });
}

// Set bars to comparing state
export function setComparing(bars, indices) {
    indices.forEach(index => {
        if (bars[index]) {
            bars[index].classList.add('comparing');
        }
    });
}

// Set bars to sorted state
export function setSorted(bars, indices) {
    indices.forEach(index => {
        if (bars[index]) {
            bars[index].classList.add('sorted');
        }
    });
}

// Set bars to swapping state
export function setSwapping(bars, indices) {
    indices.forEach(index => {
        if (bars[index]) {
            bars[index].classList.add('swapping');
        }
    });
}

// Set pivot element
export function setPivot(bars, index) {
    if (bars[index]) {
        bars[index].classList.add('pivot');
    }
}

// Set minimum element (for selection sort)
export function setMin(bars, index) {
    if (bars[index]) {
        bars[index].classList.add('min');
    }
}

// Set merged elements (for merge sort)
export function setMerged(bars, indices) {
    indices.forEach(index => {
        if (bars[index]) {
            bars[index].classList.add('merged');
        }
    });
}

// Remove all states from bars
export function removeStates(bars, indices) {
    indices.forEach(index => {
        if (bars[index]) {
            bars[index].className = 'array_bar';
        }
    });
} 