import { assert } from "../utilities/asserts.js";

// http://www.w3schools.com/js/js_dates.asp

export function dates() {
    let rightNow = new Date();
    console.log(`toString(): ${rightNow.toString()}`); //browser's time zone and full text string
    console.log(`toUTCString(): ${rightNow.toUTCString()}`); //this is a date display standard
    console.log(`toDateString(): ${rightNow.toDateString()}`);

    //You have to use Date.UTC if you want the values to be in UTC otherwise they pick up your time zone
    let christmas83 = new Date(Date.UTC(1983, 11, 25, 8, 30, 10)); //be careful as the month is zero-based!!!
    assert(christmas83.toUTCString() === "Sun, 25 Dec 1983 08:30:10 GMT");

    let janTwentyTwenty = new Date(Date.UTC(2020, 0)); //this is the minimum that you can put in
    assert(janTwentyTwenty.toUTCString() === "Wed, 01 Jan 2020 00:00:00 GMT");

    let theBeginning = new Date(0); //supplying only one number is milliseconds from epoch
    assert(theBeginning.toUTCString() === "Thu, 01 Jan 1970 00:00:00 GMT");
    assert(
        new Date(-324234234).toUTCString() === "Sun, 28 Dec 1969 05:56:05 GMT"
    );

    let jan1903 = new Date(Date.UTC(3, 0)); //1 or 2 digits assumes the 20th century - notice that you can reference before epoch
    assert(jan1903.toUTCString() === "Thu, 01 Jan 1903 00:00:00 GMT");
    assert(
        new Date(Date.UTC(13, 0)).toUTCString() ===
            "Wed, 01 Jan 1913 00:00:00 GMT"
    );
    assert(new Date(813, 0).toUTCString() === "Tue, 01 Jan 0813 00:01:15 GMT"); //reseting of the date/time in the past

    //parsing
    {
        // Remember that the creation of a date takes the time zone into account automatically!!!
        // The only way to prevent this is to specify UTC with the Z character
        // If you lived in Calfornia and used new Date(2020, 0, 1) it would mean 2020-01-01T08:00:00Z

        let parsed = new Date("December 25, 1983 08:30:10"); //This might be browser specific!!!
        parsed = new Date("1983-12-25"); //ISO but be careful - the computed result is relative to your time zone and could be the 24th
        // T is the time separator
        parsed = new Date("1983-12-25T00:00:00+02:00"); //You should either specify your offset or
        assert(parsed.toUTCString() === "Sat, 24 Dec 1983 22:00:00 GMT");
        parsed = new Date("1983-12-25T00:00:00Z"); //specify Z which means that this is a UTC date
        assert(parsed.toUTCString() === "Sun, 25 Dec 1983 00:00:00 GMT");

        //short dates are written in the USA format and accepted as UTC
        parsed = new Date("12/25/1983"); //You should always specify leading zeroes
        console.log(
            `Short date parse: new Date("12/25/1983") = ${parsed.toUTCString()}`
        );

        //long dates
        parsed = new Date("Dec 25 1983");
        console.log(
            `Long date parse - month first: new Date("Dec 25 1983") = ${parsed.toUTCString()}`
        );

        parsed = new Date("25 Dec 1983");
        console.log(
            `Long date parse - day first: new Date("25 Dec 1983") = ${parsed.toUTCString()}`
        );

        parsed = new Date("25 December 1983");
        console.log(
            `Long date parse - day first/long month: new Date("25 December 1983") = ${parsed.toUTCString()}`
        );

        parsed = new Date("25, DECEMBER, 1983");
        console.log(
            `Long date parse - case insensitive with ignored commas: new Date("25, DECEMBER, 1983") = ${parsed.toUTCString()}`
        );

        let msecSinceEpochUtc = Date.parse("25 December 1983"); //this number could be bigger or smaller depending on where it's run
        console.log(`MS since epoch for Xmas '83: ${msecSinceEpochUtc}`);
    }

    //get methods
    {
        console.log(`new Date().getHours(): ${new Date().getHours()}`); //In my local time zone
        console.log(`new Date().getUTCHours(): ${new Date().getUTCHours()}`); //In my local time zone

        const moonLanding = new Date("1969-07-20T00:20:18Z");
        let msSinceLanding = Date.now() - moonLanding;
        console.log(
            `Days since moon landing: ${(
                msSinceLanding /
                (1000 * 3600 * 24)
            ).toLocaleString(undefined, {
                maximumFractionDigits: 0
            })}`
        );
    }
}
