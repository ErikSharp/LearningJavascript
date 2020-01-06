import { assert } from "../utilities/asserts.js";

// https://www.w3schools.com/js/js_string_methods.asp

export function strings() {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let name = "erik sharp";

    assert(alphabet.length === 26);
    assert(alphabet.indexOf("cde") === 2);
    assert(name.indexOf("w") === -1);
    assert(name.search("har*") === 6); // same as indexOf but no start parameter and can use reg-ex
    let matchArray = "The rain in SPAIN stays mainly in the plain".match(
        /ain/g
    );
    assert(matchArray.length === 3 && matchArray[0] === "ain");
    assert(name.lastIndexOf("r") === 8);
    assert(name.indexOf("r", 3) === 8); // start at the third index
    assert(alphabet.lastIndexOf("d", 10) === 3); // specifying the start makes it search backwards!
    assert(name.startsWith("erik"));
    assert(name.endsWith("sharp"));

    //slice
    assert(alphabet.slice(1, 4) === "bcd"); //start and end (not included)
    assert(name.slice(-9, -6) === "rik"); //negatives count from the end
    assert(alphabet.slice(23) === "xyz"); //no end will take the rest of the string
    assert(alphabet.slice(-3) === "xyz"); //start from the end

    //substring
    assert(alphabet.substring(1, 4) === "bcd"); //same as slice, but no negatives
    assert(alphabet.substring(23) === "xyz");

    //substr
    assert(alphabet.substr(14, 3) === "opq"); //second parameter is length
    assert(
        alphabet.substr(23) === alphabet.substring(23) &&
            alphabet.substr(23) === alphabet.slice(23)
    ); //just take to the end
    assert(alphabet.substr(-3) === alphabet.slice(-3)); //count from the end

    //replace
    assert(name.replace("erik", "lynsey") === "lynsey sharp");
    assert(name === "erik sharp"); //only creates new strings - original intact
    assert(name.replace("Erik", "lynsey") === "erik sharp"); //is case sensitive
    assert(name.replace(/Erik/i, "lynsey") === "lynsey sharp"); //make case insensitive

    //case change
    assert(name.toUpperCase() === "ERIK SHARP");
    assert(name === "erik sharp"); //only creates new strings
    assert("LOL".toLowerCase() === "lol");

    //triming
    assert("Hello".concat(" World") === "Hello World");
    let whitespace = "  Erik Sharp   ";
    assert(whitespace.trim() === "Erik Sharp");
    assert(whitespace.trimLeft() === "Erik Sharp   ");
    assert(whitespace.trimRight() === "  Erik Sharp");

    //character codes
    assert(name.charCodeAt(0) === 101);
    assert(String.fromCharCode(101) === "e");

    //character index
    assert(name[0] === "e"); //as strings are not arrays it's better to use charAt
    assert(name[999] === undefined);
    assert(name.charAt(0) === "e");
    assert(name.charAt(999) === ""); //notice the different behavior

    //splitting
    let csv = "a,b,c,d,e";
    assert(csv.split()[0] === csv); //no separator puts it all in index 0
    assert(csv.split(",")[2] === "c");
    let eachCharacter = csv.split(""); //string into array
    assert(eachCharacter[0] === "a");
    assert(eachCharacter[1] === ",");
    assert(eachCharacter[2] === "b");

    //repeat
    assert(name.repeat(2) === "erik sharperik sharp");
    assert("- ".repeat(5) === "- - - - - ");
}
