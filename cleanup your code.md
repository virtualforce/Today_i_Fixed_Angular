## Problem
The try...catch construct is essential for handling potential exceptions in a specific code block. However, it often leads to code repetition or forgetting to handle both error and success cases.
## Environment
- Angular
- JS

## How you fixed it
To address this issue, the 'finally()' method provides a solution.
## Solution
Code with cognitive complexity.
```
function processFile(filename) {
  let file = openFile(filename);
  try {
      // Perform operations on the file
      this.uiBlockerService.stop();
      file.close();
    } catch (error) {
      // Handle the exception
      this.uiBlockerService.stop();
      file.close;
    }
  }
  ```
  Here is a solution, `finally()` reduced the cognitive complexity.
  
  ```
  function processFile(filename) {
    let file = openFile(filename);
    try {
        // Perform operations on the file
        // ...
    } catch (error) {
      // Handle the exception
    } finally {
      this.uiBlockerService.stop();
      file.close();
    }
}
```
  
  
