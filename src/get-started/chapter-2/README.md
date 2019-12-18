# Chapter 2 Notes

[Chapter 2 on GitHub](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)

-   Each file is a program
    -   The can share their state and their public functionality via the global scope
        _ Many build process tools combine multiple files into a single file and hence program
        _ ES6 modules
        _ Modules are file based
        _ Basically a collection of state and publicly exposed methods to operate on that state \* Any import will then treat the code as in the same module
-   Patterns to organize code
    _ The two major 1. Classes
    _ Single inheritance
    _ All data and methods are public
    _ Keywords
    _ class
    _ extends
    _ constructor
    _ super
    _ this 1. Modules
    _ Types 1. Classic module factories
    _ The wrapping context is a function 1. ES Modules (ESM)
    _ The wrapping context is a file
    _ One file - one module
    _ When you import one you get a single instance of it - they are singletons even across multiple imports in different files
    -   Both have the goal of grouping together both data and behaviours \* Some programs may use neither
    -   Some programs may use both
