export function fibonacci(num) {
    if (typeof num !== 'number' || num <= 0 || !Number.isInteger(num)) {
        throw new Error('Input must be a positive integer');
    }
  
    let num1 = 0n; // Use BigInt from the start
    let num2 = 1n;
    let sum;
  
    if (num === 1) {
        return num1;
    } else if (num === 2) {
        return num2;
    } else {
        for (let i = 3; i <= num; i++) {
            sum = num1 + num2;
            num1 = num2;
            num2 = sum;
        }
        return num2;
    }
}