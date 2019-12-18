# Chapter 2 Notes

[Chapter 2 on GitHub](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)

-   Each file is a program
    -   They can share their state and their public functionality via the global scope
    -   Many build process tools combine multiple files into a single file and hence program
    -   ES6 modules
        -   Modules are file based
        -   Basically a collection of state and publicly exposed methods to operate on that state
        -   Any import will then treat the code as in the same module
-   Patterns to organize code
    -   The two major
        1. Classes
            - Single inheritance
            - All data and methods are public
            - Keywords
                - class
                - extends
                - constructor
                - super
                - this
        1. Modules
            - Types
                1. Classic module factories
                    - The wrapping context is a function
                1. ES Modules (ESM)
                    - The wrapping context is a file
                    - One file - one module
                    - When you import one you get a single instance of it - they are singletons even across multiple imports in different files
    -   Both have the goal of grouping together both data and behaviours
    -   Some programs may use neither
    -   Some programs may use both
