// Function to create a delay using Promises, pausing execution for a specified time
const waitforme = ((millisec) => {
    // Returns a Promise that resolves after the specified milliseconds
    return new Promise((resolve) => {
        // Sets a timeout to resolve the promise after the delay period
        setTimeout(() => {
            resolve();
        }, millisec);
    });
});
