# Chapter 1 Notes

[Chapter 1 on GitHub](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md)

-   Polyfills or Shims
    -   Provides a stand-in definition for a missing API when running in a specific environment
    -   You may be running in an environment that doesn't support finally in try/finally
        -   You can check the truthiness of finally and if it isn't there implement a version of it
    -   There are official polyfill libraries such as ES-Shim that you should use
    -   Babel typically detects what polyfills you will need depending on the environment you are targeting such as ES5
-   Babel and transpiling
    -   Allows you to use the most current portions of the language always, but then outputs a version of the code that will conform to the needs of the environment that you need to run in
    -   You could use ES2019 features that transpile to ES5
-   JS as an interpreted or compiled language?
    -   Steps
        1. It gets parsed first
            - It will detect things like duplicate parameter names early during this parsing phase
            - Functions can be declared after they are referenced
        1. The code then gets converted to a optimized (binary) form which is what will be executed
            - This is similar to the output of a .NET language that the CLR will execute
                - In this case it is the JS virtual machine that will execute it
    -   JS is a bit like .NET except that it is not pre compiled
-   WASM (Web Assembly)
    -   Doesn't perform the initial parsing and compilation that JS does
        -   Is compiled ahead of time (AOT)
    -   Still runs within the JS engine
    -   Relies on heavy static typing
    -   Blazor runs a version of the CLR on WASM
        -   There is a possibility that this type of activity will render JS obsolete
-   Strict Mode
    -   Should always be turned on
        -   It will enable certain optimizations
    -   Is NOT on by default
        -   ES6 module format assumes strict mode so code in such files already has it on
    -   Virtually all transpiled code gets it turned on
    -   `"use strict";`
        -   Only whitespace and comments are allowed before the pragma
        -   Has to be done in every file
            \*It can be done per function as well, but must be the first statement
