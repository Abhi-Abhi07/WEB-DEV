// Algorithm information object
const algorithmInfo = {
    bubble_sort: {
        name: "Bubble Sort",
        definition: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        properties: {
            stable: true,
            comparisonBased: true,
            swapBased: true,
            inPlace: true
        }
    },
    selection_sort: {
        name: "Selection Sort",
        definition: "A simple sorting algorithm that divides the input into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region.",
        timeComplexity: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        properties: {
            stable: false,
            comparisonBased: true,
            swapBased: true,
            inPlace: true
        }
    },
    insertion_sort: {
        name: "Insertion Sort",
        definition: "A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        properties: {
            stable: true,
            comparisonBased: true,
            swapBased: true,
            inPlace: true
        }
    },
    merge_sort: {
        name: "Merge Sort",
        definition: "A divide-and-conquer algorithm that recursively breaks down the array into smaller subarrays until each has only one element, then merges them back together in sorted order.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        properties: {
            stable: true,
            comparisonBased: true,
            swapBased: false,
            inPlace: false
        }
    },
    quick_sort: {
        name: "Quick Sort",
        definition: "A divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around it, placing smaller elements before and larger elements after the pivot.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(log n)",
        properties: {
            stable: false,
            comparisonBased: true,
            swapBased: true,
            inPlace: true
        }
    }
};

// Property definitions
const propertyDefinitions = {
    stable: "A sorting algorithm is stable if it maintains the relative order of equal elements in the sorted output.",
    comparisonBased: "A comparison sort is a type of sorting algorithm that only reads the list elements through a single abstract comparison operation.",
    swapBased: "A swap-based algorithm rearranges elements by exchanging their positions in the array.",
    inPlace: "An in-place algorithm transforms input using no auxiliary data structure, modifying the input in-place."
};

// Function to update algorithm information display
export function updateAlgorithmInfo(algoClass) {
    const currentAlgoElement = document.getElementById("currentAlgo");
    const timeComplexityElement = document.getElementById("timeComplexity");
    const propertiesElement = document.getElementById("algorithmProperties");
    
    if (algorithmInfo[algoClass]) {
        const algo = algorithmInfo[algoClass];
        currentAlgoElement.textContent = algo.name;
        currentAlgoElement.title = algo.definition;
        
        // Create detailed time complexity string
        const timeComplexityStr = `Best: ${algo.timeComplexity.best} | Avg: ${algo.timeComplexity.average} | Worst: ${algo.timeComplexity.worst} | Space: ${algo.spaceComplexity}`;
        timeComplexityElement.textContent = timeComplexityStr;
        timeComplexityElement.title = "Time complexity measures how the algorithm's running time grows with input size. Space complexity measures the extra space required.";

        // Create properties string with tooltips
        const propertiesStr = `Stable: ${algo.properties.stable ? 'Yes' : 'No'} | Comparison: ${algo.properties.comparisonBased ? 'Yes' : 'No'} | Swap: ${algo.properties.swapBased ? 'Yes' : 'No'} | In-place: ${algo.properties.inPlace ? 'Yes' : 'No'}`;
        propertiesElement.textContent = propertiesStr;
        
        // Add tooltips for each property
        const propertyTooltips = [
            `Stable: ${propertyDefinitions.stable}`,
            `Comparison-based: ${propertyDefinitions.comparisonBased}`,
            `Swap-based: ${propertyDefinitions.swapBased}`,
            `In-place: ${propertyDefinitions.inPlace}`
        ].join('\n');
        propertiesElement.title = propertyTooltips;
    } else {
        currentAlgoElement.textContent = "None";
        currentAlgoElement.title = "";
        timeComplexityElement.textContent = "-";
        timeComplexityElement.title = "";
        propertiesElement.textContent = "-";
        propertiesElement.title = "";
    }
} 