// Function to swap two elements
export function swap(el1, el2) {
    // Swap heights
    const tempHeight = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = tempHeight;

    // Swap data-values
    const tempValue = el1.getAttribute('data-value');
    el1.setAttribute('data-value', el2.getAttribute('data-value'));
    el2.setAttribute('data-value', tempValue);
}
