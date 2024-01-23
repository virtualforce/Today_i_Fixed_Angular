## Problem
If we use an image tag and set the image path (src attribute) dynamically, is there a way to show a user-friendly message if the src (path where the image is located) doesn't exist?
## Environment
- VS code
- JS

## How you fixed it
If the src cannot be found on rendering then you can handle this issue by using the events which are `<img>` tag supports like:
- `abort` (onAbort)
- `error` (onError)
- `load` (onLoad)
## Solution
```
<img src="whatever" onError="this.src = 'new default path'" />
```
or
``` 
<img src="whatever" onError="doSomething();" />
```
