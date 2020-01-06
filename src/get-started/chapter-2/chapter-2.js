import { create as messengerFactory } from "./some-es-module.js";
import { assert } from "../../utilities/asserts.js";

export function chapter2() {
    let name = "Erik";

    let lastNames = ["Sharp", "Cornwell"];

    assert(lastNames.length === 2);

    if (true) {
        let message = `Hello ${name} ${lastNames[0]}`;
        assert(message === "Hello Erik Sharp");
    }

    assert(lastNames !== undefined);

    let person = {
        first: "Erik",
        last: "Sharp",
        age: 43,
        specialities: ["pickles", "dirt"]
    };

    let anotherName = person.first;
    let anotherName2 = person["first"];

    assert(anotherName === anotherName2);

    assert(typeof 42 === "number");
    assert(typeof 3.141592 === "number");
    assert(typeof "abc" === "string");
    assert(typeof true === "boolean");
    assert(typeof undefined === "undefined");
    assert(typeof null === "object");
    assert(typeof { a: 1 } === "object");
    assert(typeof [1, 2, 3] === "object");
    assert(typeof function Hello() {} === "function");
    assert(typeof (() => 42) === "function");

    // variable assigning
    {
        var assignedWithVar = "Erik";
        let assignedWithLet = "Lynsey";
        var notAssigned;
        const mustAssignAndCantChange = true;
        const thisIsConfusingAsCanStillChangeContents = {
            changeMe: true
        };

        //dont make objects constants
        thisIsConfusingAsCanStillChangeContents.changeMe = false;

        //or arrays
        const thisIsConfusingAsCanStillChangeContents2 = [1, 2];
        thisIsConfusingAsCanStillChangeContents2[1] = 3;

        if (assignedWithVar) {
            assert(notAssigned === undefined);
            var youCanSeeVarOutsideItsScope = true;
            let youCantReferenceMeOutOfHere = true;
            assert(youCantReferenceMeOutOfHere);
            assert(assignedWithVar === "Erik");
            assert(assignedWithLet === "Lynsey");
        }

        //assert(youCantReferenceMeOutOfHere); //wont compile
        assert(youCanSeeVarOutsideItsScope);

        // function assigning
        {
            // assigning a function to a variable named hello (all happens during compile phase)
            function hello(name) {
                try {
                    console.log(`hello ${name}`);
                } catch (err) {
                    //error object is assigned to the variable err as
                    //though it was done with let and is only available in the catch
                    console.log(err);
                }
            }

            // assigning a function expression to a variable (function expression is compiled, but only assigned to the variable at runtime)
            var hello2 = function(name) {
                console.log(`hello ${name}`);
            };

            // assigning function to the properties of an object
            let someObject = {
                // notice that this is shorthand for the definition of a property named greeting that is bound to a function
                greeting() {
                    console.log("hello");
                },
                question() {
                    console.log("what is your name?");
                },
                answer() {
                    console.log("my name is Erik");
                }
            };
        }
    }

    // comparisons
    {
        // checking the value and not allowing any type conversion (coercion) with ===
        assert(3 === 3.0);
        assert("yes" === "yes");
        assert(null === null);
        assert(false === false);

        assert(42 !== "42");
        assert("hello" !== "Hello");
        assert(true !== 1);
        assert(0 !== null);
        assert("" !== null);
        assert(null !== undefined);

        // gotchas where it lies
        {
            assert(NaN !== NaN);
            var useInstead = Number.isNaN(NaN);

            assert(0 === -0);
            var negativeZero = -0;
            assert(!Object.is(negativeZero, 0));
            // Humorously, you could think of Object.is(..) as the "quadruple-equals" ====, the really-really-strict comparison!
        }

        // comparison with ==
        {
            // With the == comparison operator, if both values are of the same type then it does the same as ===
            // == will allow a type conversion before the comparison
            // You can think of it as coercive equality
            assert(42 == "42");
            assert(1 == true);
            // it prefers primitive and numeric comparison so in the two examples above it converted "42" to 42 and true to 1

            // gotchas
            assert(0 == false);
            assert("" == 0);
            // these seem odd because anything not true is false

            // You cannot get away from using coercive comparisons so you have to know how these work
            // Consider the < operator
            assert("30" < 50); // the "30" coerced into a number
            assert("10" < "9"); // be careful - when they are both strings it does an ascii alpha comparison
        }

        // object comparison
        {
            // === only does identity equality and not structural equality
            // object values are held by reference, assigned and passed by reference
            assert([1, 2, 3] !== [1, 2, 3]);
            assert({ a: 42 } !== { a: 42 });
            assert((x => x * 2) !== (x => x * 2));
            assert([1, 2, 3] != [1, 2, 3]);
            assert({ a: 42 } != { a: 42 });
            assert((x => x * 2) != (x => x * 2));

            let x = [1, 2, 3];
            let y = x;
            assert(x === y);
            assert(x == y);
            let z = [1, 2, 3];
            assert(x !== z);
            assert(x != z);

            //JS does not provide a mechanism for structural equality comparison of object values, only reference identity comparison.
            //To do structural equality comparison, you'll need to implement the checks yourself.
            function myObjectsAreEqual(objA, objB) {
                return objA.a === objB.a;
            }

            let objA = { a: 42 };
            let objB = { a: 42, name: "foo" };
            assert(myObjectsAreEqual(objA, objB));
        }
    }

    // classes
    {
        // all methods and data are public!
        class Page {
            constructor(text) {
                this.text = text;
            }

            print() {
                console.log(this.text);
            }
        }

        class Notebook {
            constructor(name) {
                this.name = name;
                this.pages = [];
            }

            addPage(text) {
                let page = new Page(text);
                this.pages.push(page);
            }

            print() {
                console.log(`Notebook: ${this.name}`);

                for (let page of this.pages) {
                    page.print();
                }
            }
        }

        class AcademicNotebook extends Notebook {
            constructor(subject, name) {
                super(name);
                this.subject = subject;
            }

            print() {
                console.log(`Subject: ${this.subject}`);
                super.print();
            }
        }

        let myBook = new AcademicNotebook("Science", "Lasers");
        myBook.addPage("page1 Lasers are cool");
        myBook.addPage("page2 Lasers are great in protests");
        myBook.addPage("page3 Lasers belong on sharks");
        myBook.print();
    }

    // modules
    {
        // classic module form (module factory) shares quite a bit with classes
        {
            // You have a function that returns an object that gives access to the behaviours
            function Animal(type, name) {
                // Returning the publicAPI lets you have encapsulation to what you are going to show to client code
                var publicAPI = {
                    print() {
                        console.log(`Type: ${type}, Name: ${name}`);
                    }
                };

                return publicAPI;
            }

            // Similar to inheritence, but is using composition instead
            function Cat(name) {
                var animal = Animal("Cat", name);

                var publicAPI = {
                    print() {
                        console.log("Meow");
                        animal.print();
                    }
                };

                return publicAPI;
            }

            var ocho = Cat("Ocho");
            ocho.print();
        }

        // ES modules
        {
            //the import statemnt is at the top of the page
            var messenger = messengerFactory("Erik");
            messenger.print();
        }
    }
}
