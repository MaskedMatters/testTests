import assert from 'node:assert';
import test from 'node:test';
import { fibonacci } from './fibonacci.mjs';

test('Extreme Fibonacci Tests', async (t) => {
  await t.test('Very Large Numbers', () => {
    // Test cases with extremely large inputs (using BigInt)
    assert.strictEqual(fibonacci(200), 280571172992510140037611932413038677189525n);
    assert.strictEqual(fibonacci(300), 222232244629420445529739893461909967206666939096499764990979600n);
    assert.strictEqual(fibonacci(400), 176023680645013966468226945392411250770384383304492191886725992896575345044216019675n); 
  });

  await t.test('Extreme Edge Cases', () => {
    // Test cases with various edge case inputs
    assert.strictEqual(fibonacci(1), 0); 
    assert.strictEqual(fibonacci(2), 1);
    assert.throws(() => fibonacci(0), { message: 'Input must be a positive integer' }); 
    assert.throws(() => fibonacci(-1), { message: 'Input must be a positive integer' });
    assert.throws(() => fibonacci(-100), { message: 'Input must be a positive integer' }); 
    assert.throws(() => fibonacci(1.5), { message: 'Input must be a positive integer' }); 
    assert.throws(() => fibonacci('abc'), { message: 'Input must be a positive integer' }); 
  });

  await t.test('Stress Test', () => {
    // Test a large number of consecutive Fibonacci numbers
    for (let i = 1; i <= 1000; i++) { 
      fibonacci(i); 
    }
    // No assertion here, the test passes if it doesn't crash or time out
  });

  await t.test('Performance with Varying Inputs', async (t) => {
    // Test performance with different input sizes
    const inputSizes = [100, 200, 300, 400, 500]; 
    for (const size of inputSizes) {
      await t.test(`Performance for input size ${size}`, () => {
        const startTime = performance.now();
        fibonacci(size);
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`Execution time for input size ${size}: ${executionTime} ms`);

        // Assert that the execution time is within an acceptable limit (adjust as needed)
        assert.ok(executionTime < size * 10, `Execution time exceeded the limit: ${executionTime} ms`); 
      });
    }
  });

  await t.test('Memory Usage', () => {
    // This is a basic memory usage test. You might need more sophisticated tools for accurate measurement
    const usedMemoryBefore = process.memoryUsage().heapUsed;
    fibonacci(500); // Or a very large input
    const usedMemoryAfter = process.memoryUsage().heapUsed;
    const memoryDifference = usedMemoryAfter - usedMemoryBefore;

    console.log(`Memory usage difference: ${memoryDifference}`);

    // Assert that the memory usage is within an acceptable limit (adjust as needed)
    assert.ok(memoryDifference < 10000000, `Memory usage exceeded the limit: ${memoryDifference}`); 
  });
});