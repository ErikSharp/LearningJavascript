import { assert } from "../../utilities/asserts.js";

// https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/apB.md

export function appendixB() {
    //comparisons
    {
        const dayStart = "07:30";
        const dayEnd = "17:45";

        function scheduleMeeting(startTime, durationMinutes) {
            function getTotalMinutes(time) {
                function getTimeComponents(time) {
                    let correctLength = time.length === 5 || time.length === 4;

                    if (correctLength) {
                        let colonLocation = time.indexOf(":");
                        if (colonLocation > 0) {
                            var hour = +time.substr(0, colonLocation);
                            var minute = +time.substr(colonLocation + 1);
                        } else {
                            throw "wrong colon location";
                        }
                    } else {
                        throw "wrong length";
                    }

                    return {
                        hour,
                        minute
                    };
                }

                let timeComponents = getTimeComponents(time);
                return timeComponents.hour * 60 + timeComponents.minute;
            }

            let failed = false;

            try {
                failed |=
                    getTotalMinutes(startTime) < getTotalMinutes(dayStart);
                failed |=
                    durationMinutes + getTotalMinutes(startTime) >
                    getTotalMinutes(dayEnd);
                return !failed;
            } catch (error) {
                return false;
            }
        }

        assert(!scheduleMeeting("7:00", 15));
        assert(!scheduleMeeting("07:15", 30));
        assert(scheduleMeeting("7:30", 30));
        assert(scheduleMeeting("11:30", 60));
        assert(scheduleMeeting("17:00", 45));
        assert(!scheduleMeeting("17:30", 30));
        assert(!scheduleMeeting("18:00", 15));
        assert(!scheduleMeeting("erik", 15));
        assert(!scheduleMeeting("00:00", 15));
        assert(!scheduleMeeting(27, 15));
        assert(!scheduleMeeting());
    }

    // closures
    {
        function range(start, end) {
            function createRangeArray(start, end) {
                try {
                    if (start > end) {
                        throw "start must be <= end";
                    }

                    let result = [];
                    for (let i = start; i <= end; i++) {
                        result.push(i);
                    }

                    return result;
                } catch (error) {
                    return [];
                }
            }

            try {
                if (end > -1) {
                    return createRangeArray(start, end);
                } else {
                    return function calcRange(end) {
                        return createRangeArray(start, end);
                    };
                }
            } catch (error) {
                return [];
            }
        }

        let result = range(3, 3); // [3]
        assert(result.length === 1 && result[0] === 3);

        result = range(3, 8); // [3,4,5,6,7,8]
        assert(result.length === 6 && result[0] === 3 && result[5] === 8);

        result = range(3, 0); // []
        assert(result.length === 0);

        var start3 = range(3);
        var start4 = range(4);

        result = start3(3); // [3]
        assert(result.length === 1 && result[0] === 3);

        result = start3(8); // [3,4,5,6,7,8]
        assert(result.length === 6 && result[0] === 3 && result[5] === 8);

        result = start3(0); // []
        assert(result.length === 0);

        result = start4(6); // [4,5,6]
        assert(result.length === 3 && result[0] === 4 && result[2] === 6);
    }

    // prototypes
    {
        function randMax(max) {
            return Math.trunc(1e9 * Math.random()) % max;
        }

        var reel = {
            symbols: ["♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"],
            spin() {
                if (this.position == null) {
                    this.position = randMax(this.symbols.length - 1);
                }
                this.position =
                    (this.position + 100 + randMax(100)) % this.symbols.length;
            },
            display(positionModifier = 0) {
                if (this.position == null) {
                    this.position = randMax(this.symbols.length - 1);
                }

                let index =
                    (this.position + positionModifier) % this.symbols.length;

                if (index < 0) index = this.symbols.length + index;

                return this.symbols[index];
            }
        };

        var slotMachine = {
            reels: [
                Object.create(reel),
                Object.create(reel),
                Object.create(reel)
            ],
            spin() {
                this.reels.forEach(function spinReel(reel) {
                    reel.spin();
                });
            },
            display() {
                let prevLine = this.reels
                    .map(reel => reel.display(-1))
                    .join(" | ");
                console.log(prevLine);

                let line = this.reels.map(reel => reel.display()).join(" | ");
                console.log(line);

                let nextLine = this.reels
                    .map(reel => reel.display(1))
                    .join(" | ");
                console.log(nextLine);
                console.log("");
            }
        };

        slotMachine.spin();
        slotMachine.display();
        // ☾ | ☀ | ★
        // ☀ | ♠ | ☾
        // ♠ | ♥ | ☀

        slotMachine.spin();
        slotMachine.display();
        // ♦ | ♠ | ♣
        // ♣ | ♥ | ☺
        // ☺ | ♦ | ★
    }
}
