import { assert } from "../../utilities/asserts.js";

export function chapter3() {
    // iteration
    {
        let numbers = [1, 2, 3, 4];
        let sum = 0;
        for (const val of numbers) {
            sum += val;
        }

        assert(sum === 10);

        // iterates the numbers array and spreading each value into the new array
        let shallowCopy = [...numbers];

        // string to a character array
        let characters = [..."Erik Sharp"];
        assert(characters.length === 10);

        // Maps
        {
            let agesByName = new Map();
            agesByName.set("Erik", 43);
            agesByName.set("Lynsey", 38);

            for (let [name, age] of agesByName) {
                console.log(`${name} is ${age}`);
            }

            // getting iterators from the map
            let onlyTheValues = agesByName.values();
            let onlyTheKeys = agesByName.keys();
            let entries = agesByName.entries();
            console.log(entries); //MapIterator {"Erik" => 43, "Lynsey" => 38}
            let entriesToArray = [...entries];
            console.log(entriesToArray); //(2) [Array(2), Array(2)]
        }

        // Arrays
        {
            let names = ["Erik", "Lynsey"];
            let indexAndValuesIterator = names.entries();
            let indexAndValues = [...indexAndValuesIterator];
            assert(indexAndValues.length === 2);
            assert(indexAndValues[0].length === 2);
            assert(indexAndValues[0][0] === 0);
            assert(indexAndValues[0][1] === "Erik");
            console.log(indexAndValues);
        }
    }

    // Closures
    {
        // example 1
        {
            function greeting(msg) {
                return function who(name) {
                    return `${msg}, ${name}!`;
                };
            }

            var hello = greeting("Hello");
            var howdy = greeting("Howdy");

            assert(hello("Kyle") === "Hello, Kyle!");
            assert(hello("Sarah") === "Hello, Sarah!");
            assert(howdy("Grant") === "Howdy, Grant!");
        }

        //example 2
        {
            function counter(step = 1, start = 0) {
                var count = start;
                return function increaseCount() {
                    count = count + step;
                    return count;
                };
            }

            var incBy1 = counter();
            var incBy3 = counter(3, 1);

            assert(incBy1() === 1);
            assert(incBy1() === 2);
            assert(incBy3() === 4);
            assert(incBy3() === 7);
            assert(incBy3() === 10);
        }
    }

    // this - a characteristic of function execution
    {
        function classroom(teacher) {
            return function study() {
                //this function is context aware as it uses this
                return `${teacher} wants you to study ${this.topic}`;
            };
        }

        let assignment = classroom("Kyle");

        //assignment(); //won't work as there is no execution context for 'this' to work

        var homework = {
            topic: "JS",
            assignment: assignment
        };

        let result = homework.assignment(); //the homework object is the execution context
        assert(result === "Kyle wants you to study JS");

        let otherHomework = {
            topic: "Math"
        };

        //another way to call the function passing in the execution context
        result = assignment.call(otherHomework);
        assert(result === "Kyle wants you to study Math");
    }

    // prototypes - a characteristic of an object, and specifically resolution of a property access
    {
        var homework = {
            topic: "JS"
        };

        // default prototype linkage to Object.prototype
        homework.toString();
        assert(homework.toString !== undefined); //checking that the function exists

        // creates a new object that is linked to homework
        var otherHomework = Object.create(homework);
        assert(otherHomework.topic === "JS"); // reads prototype property topic
        otherHomework.topic = "Math"; // create a property topic that shadows the prototype
        assert(otherHomework.topic === "Math");
        assert(homework.topic === "JS"); // proves that Object.create makes a deep-clone

        // no prototypes
        {
            let foo = Object.create(null);
            foo.bar = 42;
            assert(foo.bar !== undefined);
            assert(foo.toString === undefined);
        }

        // this revisited
        {
            // defining the behavior at the end of the chain
            let homework = {
                study() {
                    return `Please study ${this.topic}`;
                }
            };

            // create objects that link to the above and then set their own topic
            let jsHomework = Object.create(homework);
            jsHomework.topic = "JS";
            assert(jsHomework.study() === "Please study JS");

            let mathHomework = Object.create(homework);
            mathHomework.topic = "Math";
            assert(mathHomework.study() === "Please study Math");
        }
    }
}
