## Problem
Occasionally, the `DevTools` `console log` may display an error message indicating the type of error encountered. For instance, an error message may appear stating that the DevTools failed to load SourceMap. 
Specifically, the error message may read `DevTools failed to load SourceMap: Could not load content for http://********/xyz/css/xyz.min.css.map: HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE.`

## Environment
- Visual Studio Code
- Angular

## How you fix it
You can debug the issue in two ways.

- You can resolve issue on browser terminal by just changing settings as you will see in the step `(Sol: A)` but I would not like to go with this solution because the problem is solved on browser terminal not in web page code!

- You can kick the issue out with just a small change in minified javascript file as I will mention in step `(Sol: B)`. I would go with this solution because It will solve the problem in web page code.

## Solution
#### Sol: A
You can resolve issue on browser terminal just follow the steps below:
```
Go to Inspect → Settings (Symbol) gear → Uncheck Enable JavaScript source maps and Enable CSS source map.
```
![image](https://user-images.githubusercontent.com/48677205/228214003-15d12036-880d-41cb-9680-7828c60d0f0e.png)


#### Sol: B
Follow the path shown in `DevTools` and open the file mentioned over there and scroll to the bottom. The commented line gives the error because the compiler confuses due to the merging of characters in the comment section, so you just need to add space between `*` and `#` like:
```
/* # sourceMappingURL=skin.min.css.map */
```



