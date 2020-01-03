import { assert } from "../utilities/asserts.js";

//w3schools.com/js/js_string_methods.asp

export function numbers() {
    let pi = 3.14159; // a number with decimals
    let age = 43; // an integer
    assert(123e5 === 12300000); // exponents in scientific notation
    assert(123e-5 === 0.00123);

    // In JS, numbers are always stored in 64 bit floating point numbers IEEE 754 standard
    // The number(fraction/mantissa) is stored in bits 0 to 51, the exponent in bits 52 to 62, and the sign in bit 63

    //Precision
    //Integers are accurate up to 15 digits
    assert(999999999999999 === 999999999999999);
    assert(9999999999999999 === 10000000000000000); //no longer exact
    assert(9999999999999999n === 9999999999999999n); //bigInt
    assert(typeof 9999999999999999n === "bigint");
    assert(BigInt("0x1fffffffffffff") === 9007199254740991n);

    assert(2.0 + 1.0 === 3.0); //integer math in floating point is exact
    assert(0.2 + 0.1 !== 0.3);
    assert(0.2 + 0.1 === 0.30000000000000004);
    // a way around the above
    assert((0.2 * 10 + 0.1 * 10) / 10 === 0.3);

    //be careful as + concatenates strings
    assert("erik" + 4 === "erik4");
    assert("result: " + 5 + 3 === "result: 53");
    assert("result: " + (5 + 3) === "result: 8");
    assert(10 + 20 + "30" === "3030"); // the interpreter works from left to right

    assert("100" / "10" === 10); // the strings are coerced automatically
    assert("100" * "10" === 1000); // the strings are coerced automatically
    assert("100" - "10" === 90); // the strings are coerced automatically
    assert("100" + "10" === "10010"); // again be careful

    assert(isNaN(100 / "Apple"));
    //assert(100 / "Apple" === Number.NaN); //can't do this as you can't compare NaN
    assert(isNaN(NaN + 5));
    assert(typeof NaN === "number");

    assert(5 / 0 === Infinity);
    assert(5 / 0 === Number.POSITIVE_INFINITY);
    assert(-5 / 0 === -Infinity);
    assert(-5 / 0 === Number.NEGATIVE_INFINITY);
    assert(typeof Infinity === "number");

    assert(0xff === 255);
    let aNum = 255;
    assert(aNum.toString(2) === "11111111"); //binary
    assert(aNum.toString(8) === "377"); //octal
    assert(aNum.toString(10) === "255"); //decimal
    assert(aNum.toString(16) === "ff"); //hex
    assert(aNum.toString(32) === "7v"); //base 32

    //numbers as objects (don't do this as it is boxing and slows down the code)
    let bNum = new Number(255);
    assert(typeof aNum === "number");
    assert(typeof bNum === "object");
    assert(aNum + bNum === 510);
    assert(aNum !== bNum); // they are different types
    assert(aNum == bNum); // after coersion they are equal
    let cNum = new Number(255);
    assert(bNum != cNum); // this is why you also don't want to do numbers as objects
    assert(typeof bNum.valueOf() === "number"); // this is how you convert back to a number

    //convert to strings
    {
        assert((123).toString() === "123"); //requires the parentheses

        //returns a string with the number rounded
        assert((9.656).toExponential(1) === "9.7e+0");
        assert((9.656).toExponential(2) === "9.66e+0");
        assert((9.656).toExponential(3) === "9.656e+0");
        assert((9.656).toExponential(6) === "9.656000e+0");

        //specify the number of decimals (would be good for showing ccy rates to a certain dps)
        assert((9.656).toFixed(0) === "10");
        assert((9.656).toFixed(1) === "9.7");
        assert((9.656).toFixed(2) === "9.66");
        assert((9.656).toFixed(5) === "9.65600");

        //returns a string at a specified length (would be good for fitting in a fixed column size output)
        assert((9.656).toPrecision() === "9.656");
        assert((9.656).toPrecision(2) === "9.7");
        assert((9.656).toPrecision(3) === "9.66");
        assert((9.656).toPrecision(6) === "9.65600");
        assert((100.123456).toPrecision(4) === "100.1");
    }

    //extract a number
    {
        assert(Number(true) === 1);
        assert(Number(false) === 0);
        assert(Number("10") === 10);
        assert(Number("  10") === 10);
        assert(Number("10  ") === 10);
        assert(Number(" 10  ") === 10);
        assert(Number("10.33") === 10.33);
        assert(isNaN(Number("10,33")));
        assert(isNaN(Number("10 33")));
        assert(isNaN(Number("John")));

        assert(Number(new Date("2017-09-30")) === 1506729600000); //the number of milliseconds since 1970-1-1

        assert(parseInt("10") === 10);
        assert(+"10" === 10);
        assert(parseInt("10.33") === 10);
        assert(parseInt("10 20 30") === 10); //only the first occurence
        assert(parseInt("10 years") === 10);
        assert(isNaN(parseInt("years 10"))); //has to be at the front

        assert(parseFloat("10") === 10);
        assert(parseFloat("10.33") === 10.33);
        assert(parseFloat("10 20 30") === 10); //only the first occurence
        assert(parseFloat("10 years") === 10);
        assert(isNaN(parseFloat("years 10"))); //has to be at the front

        assert(Number.MAX_VALUE.toString() === "1.7976931348623157e+308");
        assert(Number.MIN_VALUE.toString() === "5e-324");
    }

    //random numbers
    {
        function getRndInteger(min, max, includeMax = false) {
            let inclusiveModifier = includeMax ? 1 : 0;
            return (
                Math.floor(Math.random() * (max - min + inclusiveModifier)) +
                min
            );
        }

        assert(getRndInteger(3, 4) === 3); //since excludes 4 always 3

        console.log(
            `getRndInteger(3, 7, true) - 3, 4, 5, 6, 7 : ${getRndInteger(
                3,
                7,
                true
            )}`
        );
    }
}
