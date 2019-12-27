import { assert } from "../../utilities/asserts.js";

export function appendixA() {
    // values vs references
    {
        //values are copied
        var myName = "Erik";
        var yourName = myName;
        assert(myName === yourName);
        yourName = "Lynsey";
        assert(myName !== yourName);

        //objects have their references copied only
        var address = {
            line1: "123 pickles ln",
            line2: "Ely"
        };

        var address2 = address;
        assert(address.line1 === address2.line1);
        address2.line1 = "321 pickles ln";
        assert(address.line1 === address2.line1);
    }

    // functions
    {
        let someFunc = function foo() { };

        assert(someFunc.name !== "someFunc");
        assert(someFunc.name === "foo");

        someFunc = function () { };
        assert(someFunc.name === "someFunc");

        function getFuncName(func) {
            return func.name;
        }
        assert(getFuncName.name === "getFuncName");
        assert(getFuncName(() => { }) === "");

        var f;
        f = () => 42;
        assert(f() === 42);

        f = x => x * 2;
        assert(f(2) === 4);

        f = (x) => x * 2; // parenthesis are optional with one parameter
        assert(f(2) === 4);

        f = (x, y) => x * y;
        assert(f(2, 3) === 6);

        f = x => ({ x: x * 2 });
        assert(f(2).x === 4);

        f = x => { return x * 2; };
        assert(f(2) === 4);

        class SomethingKindaGreat {
            // class methods
            coolMethod() { }   // no commas!
            boringMethod() { }
        }

        let instance = new SomethingKindaGreat();
        assert(instance.coolMethod.name === "coolMethod");

        let EntirelyDifferent = {
            // object methods
            coolMethod() { },   // commas!
            boringMethod() { },

            // (anonymous) function expression property
            oldSchool: function () { }
        };

        assert(EntirelyDifferent.oldSchool.name === "oldSchool");
    }

    // prototypal class pattern
    {
        function Classroom() { }

        Classroom.prototype.welcome = () => "Welcome to class";

        let classroom = new Classroom();
        assert(classroom.welcome() === "Welcome to class");

        //All functions by default reference an empty object at a property named prototype. 
        //Despite the confusing naming, this is not the function's prototype
        //--where the function is prototype linked to
        //--but rather the prototype object to link to when other objects are created by calling the function with new.
        //This "prototypal class" pattern is now strongly discouraged, in favor of using ES6's class mechanism

        class ClassroomClass {
            welcome() {
                return "Welcome to class";
            }
        }

        let classroomClass = new ClassroomClass();
        assert(classroomClass.welcome() === "Welcome to class");
    }
}