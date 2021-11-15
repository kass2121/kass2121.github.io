/*
## Exercise 04
Create a memoized version of the following `fibonacci()` recursive method to improve its performance.
```javascript
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```
You may use `console.time(label)` and `console.timeEnd(label)` to measure the difference in performance.
*/
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));