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
            console.log(entries);
            let entriesToArray = [...entries];
            console.log(entriesToArray);
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

    // this
    {
        function classroom(teacher) {
            return function study() {
                //this function is context aware as it uses this
                console.log(`${teacher} wants you to study ${this.topic}`);
            };
        }

        let assignment = classroom("Kyle");

        //assignment(); //won't work as there is no execution context

        var homework = {
            topic: "JS",
            assignment: assignment
        };

        homework.assignment(); //the homework object is the execution context

        let otherHomework = {
            topic: "Math"
        };

        //another why to call the function passing in the execution context
        assignment.call(otherHomework);
    }
}
