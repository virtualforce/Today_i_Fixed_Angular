## Problem
...  Angular adding multi language support   ...

## Environment
- VS Code
## How you fix it
...  We can add multi language functionality in angular by using @ngx-translate/core  ...

## Solution

## 1. Installing libraries

``` npm install @ngx-translate/core ```
``` npm install @ngx-translate/http-loader ```

## 2. Creating HttpLoaderFactory in appModule

``` 
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

```
## 3. Import translate module in appModule along with other config

``` 
HttpClientModule,
TranslateModule.forRoot({
    loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
    }
}),
    
 ```
## 4. Specify language used on load application

```
add in module/component .ts file

constructor(private translateSrv : TranslateService){
    translateSrv.use('en');
} 
```
## 5. Generate translation json files

```   in your app /src/assets create directory i8n and then create json file for languages which needs translation e.g en.json used for english, sv.json used for swedish etc.. ```

## 6. en.json translations 
``` 
    {
        "message": "Translated message from english"
    }
```

## 7. Component HTML file
 ``` {{'message' | translate}} ```

 So in this case a 'Translated message from english' is showing as a translated message similary we can add multiple languages support by specify lanaguage in constructor along with JSON file in i8n directory.
