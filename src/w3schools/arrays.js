import { assert } from "../utilities/asserts.js";

// https://www.w3schools.com/js/js_arrays.asp

export function arrays() {
    let emptyArray = [];
    let cars = ["Nissan", "Renault", "Toyota"];
    let cars2 = new Array("Nissan", "Renault", "Toyota"); //exact same as above, but not preferred

    assert(cars[1] === "Renault");
    cars[2] = "Volkswagen"; //array values are mutable
    assert(cars[2] === "Volkswagen");
    assert(cars.toString() === "Nissan,Renault,Volkswagen"); //converts to csv
    assert(cars.join() === "Nissan,Renault,Volkswagen");
    assert(cars.join("|") === "Nissan|Renault|Volkswagen"); //with join you can specify the separator
    assert(cars.reverse()[0] === "Volkswagen");

    assert(typeof cars === "object");
    assert(Array.isArray(cars)); //how to detect arrays

    cars[2] = 42; //the elements don't have to be the same type
    assert(typeof cars[0] === "string");
    assert(typeof cars[2] === "number");

    let me = {
        first: "Erik",
        last: "Sharp"
    };

    cars[2] = me;
    assert(typeof cars[2] === "object");
    assert(cars[2].first === "Erik");

    let numbers = [4, 7, 3, 6, 9, 4, 2, 5];
    assert(numbers.length === 8); // length is a property
    assert(numbers[0] === 4);
    let sorted = numbers.sort(); //be careful! sort() changes the source array
    assert(sorted[0] === 2);
    assert(numbers[0] === 2);
    assert(sorted[7] === 9);

    //iterating
    {
        let concated = "";
        numbers.forEach(i => (concated = concated + i));
        assert(concated === "23445679");
    }

    cars.push("Audi");
    assert(cars.length === 4);
    assert(cars[cars.length - 1] === "Audi"); // push adds to the end

    cars[cars.length] = "Seat"; // this is doing the same as push
    assert(cars.length === 5);

    cars[6] = "Dodge"; // the array now has a hole in index 5
    assert(cars[5] === undefined);
    console.log(cars);

    //arrays use numbered indexes and objects use named indexes
    assert(cars[4] === "Seat");
    assert(me["first"] === "Erik");

    //create an empty array with 40 elements
    let emptyArray40 = new Array(40);
    assert(emptyArray40.length === 40);
    assert(emptyArray40[20] === undefined);

    //methods
    {
        let values = [1, 3, 5, 7, 9];
        assert(values.length === 5);
        let whatWasRemoved = values.pop(); //takes from the end
        assert(whatWasRemoved === 9);
        assert(values[values.length - 1] === 7);
        assert(values.length === 4);

        let newArrayLength = values.push(9); //adds to the end
        assert(values[newArrayLength - 1] === 9);
        assert(values.length === 5);

        whatWasRemoved = values.shift(); //same as pop, but takes from the front
        assert(whatWasRemoved === 1);
        assert(values[0] === 3);
        assert(values.length === 4);

        newArrayLength = values.unshift(1);
        assert(values[0] === 1);
        assert(newArrayLength === 5);

        delete values[2]; //be careful as you are leaving a hole
        assert(values[2] === undefined);
        assert(values.toString() === "1,3,,7,9");

        //splice
        {
            let deletedItems = values.splice(2, 1, 5); //remove the empty element and replace it with 5
            assert(values.toString() === "1,3,5,7,9");
            assert(deletedItems.length === 1); //the empty element
            assert(deletedItems[0] === undefined);

            deletedItems = values.splice(1, 2, 2, 4); //remove two elements starting at index 1 and replace with 2 and 4
            assert(deletedItems.length === 2);
            assert(deletedItems[0] === 3 && deletedItems[1] === 5);
            assert(values.toString() === "1,2,4,7,9");

            values.splice(3, 0, 5); //inserting values
            assert(values.toString() === "1,2,4,5,7,9");

            values.splice(3, 1); //deleting an element
            assert(values.toString() === "1,2,4,7,9");
        }

        //concat
        {
            let videoGames = ["Spyro", "Starcraft", "Apex Legends"];
            let boardGames = ["Cluedo", "Pictionary"];
            let movies = ["Harry Potter", "Chicken Run"];

            let games = videoGames.concat(boardGames); //returns the new array and leaves the others intact
            assert(games.length === 5);
            assert(games[3] === "Cluedo");

            let entertainment = videoGames.concat(boardGames, movies);
            assert(entertainment.length === 7);
            assert(entertainment[5] === "Harry Potter");

            let moreBoardGames = boardGames.concat("Monopoly", "Battleship"); //same as push, but can do more than just one at a time
            assert(moreBoardGames.length === 4);
            assert(moreBoardGames[2] === "Monopoly");
        }

        //slice
        {
            assert(values.toString() === "1,2,4,7,9"); //starting array
            let newArray = values.slice(2); //creates a new array starting from the element at index 2 to the end
            assert(newArray.length === 3);
            assert(newArray.toString() === "4,7,9");

            newArray = values.slice(1, 3); //creates a new array starting from the element at index 1 to index 3, but not including index 3
            assert(newArray.toString() === "2,4");
        }
    }

    //sort
    {
        let letters = ["c", "a", "d", "b"];
        letters.sort(); //changes the array
        assert(letters[0] === "a");
        assert(letters[3] === "d");

        letters.reverse();
        assert(letters[0] === "d");
        assert(letters[3] === "a");

        let numbers = [40, 20, 3, 100];
        numbers.sort(); //be careful! Numbers are sorted as strings
        assert(numbers[0] !== 3);
        assert(numbers[3] !== 100);
        assert(numbers[0] === 100);
        assert(numbers[3] === 40);

        //supplying a compare function to compare numbers
        numbers.sort((a, b) => a - b);
        assert(numbers[0] === 3);
        assert(numbers[3] === 100);

        //now descending
        numbers.sort((a, b) => b - a);
        assert(numbers[0] === 100);
        assert(numbers[3] === 3);

        //now random
        numbers.sort(() => 0.5 - Math.random());
        console.log(`Random array sort: ${numbers.toString()}`);

        //Max - strange syntax
        assert(Math.max.apply(null, numbers) === 100);
        //the equivalent with literals
        assert(Math.max(3, 56, 7, 43, 3) === 56);
        //Min
        assert(Math.min.apply(null, numbers) === 3);

        //homebrew
        function myArrayMax(arr) {
            var len = arr.length;
            var max = -Infinity;
            while (len--) {
                if (arr[len] > max) {
                    max = arr[len];
                }
            }
            return max;
        }

        assert(myArrayMax(numbers) === 100);
    }

    //iteration
    {
        let numbers = [1, 2, 3, 4];
        let total = 0;
        numbers.forEach(i => (total += i));
        assert(total === 10);

        //can also get the index
        numbers.forEach((value, index) =>
            console.log(`Index: ${index} is ${value}`)
        );

        let doubled = numbers.map(i => i * 2);
        assert(doubled[0] === 2);
        assert(doubled[3] === 8);
        assert(numbers[0] === 1); //doesn't change the original

        let displayable = numbers.map((value, index) => `${index}:${value}`);
        assert(displayable[2] === "2:3");

        //map with sparse array
        let someNumbers = [1, 2, , 4];
        let squared = someNumbers.map(i => i * i);
        assert(squared[2] === undefined);
        assert(squared[3] === 16);

        //filter
        let even = numbers.filter(i => i % 2 === 0);
        assert(even.length === 2);
        assert(even[1] === 4);

        //reduce
        assert(numbers.reduce(productReduction) === 24);

        //gets compiled first pass, so it can be listed after use as JS is NOT an interpretted language
        function productReduction(total, value, index, array) {
            //as we aren't using the index and array they could be removed
            return total * value;
        }

        //set an initial total
        assert(numbers.reduce(productReduction, 2) === 48);

        //go from right to left
        assert(numbers.reduceRight(productReduction) === 24);

        //every
        let allArePositive = numbers.every(i => i > 0);
        assert(allArePositive);

        let someAreGreaterThanThree = numbers.some(i => i > 3);
        assert(someAreGreaterThanThree);

        //indexOf
        assert(numbers.indexOf(3) === 2); //index found at
        assert(numbers.indexOf(-2) === -1); //not found
        assert(numbers.indexOf(1, 2) === -1); //not found since starting at index 2

        let nameInArray = "Erik Sharp".split("");
        assert(nameInArray.lastIndexOf("r") === 8);

        assert(nameInArray.find(findFunction) === "r"); //returns the first occurence that the function returns true

        function findFunction(value, index, array) {
            return value.charCodeAt(0) === 114;
        }

        assert(nameInArray.findIndex(findFunction) === 1);
    }
}
