# Chapter 3 Notes

[Chapter 3 on GitHub](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md)

-   Iterables
    -   ES6 defined the basic data structure/collection types in JS as iterables
        -   This includes strings, arrays, maps, sets, and others
    -   For the most part, all built-in iterables in JS have three iterator forms available: keys-only (`keys()`), values-only (`values()`), and entries (`entries()`)
-   Closures
    -   Closure is the ability of a function to remember and continue to access variables defined outside its scope, even when that function is executed in a different scope
        -   Only functions gets closures, objects do not
-   this
    -   Can be described as an execution context
    -   a characteristic of function execution
    -   Scope is static and is the list of variables available at a certain location
        -   A function that closes over a scope can never reference a different scope or set of variables
    -   An execution context is dynamic and changes based on how the function is called
        -   It is determined everytime that the function is called
        -   It is a tangible object
        -   It has the ability to more flexibly re-use a single function with data from different objects
-   prototypes
    -   a characteristic of an object
    -   A series of objects linked together via prototypes is called the "prototype chain"
    -   Created with `Object.create(foo)
