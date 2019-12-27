import { assert } from "../../utilities/asserts.js";

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
                        }
                        else {
                            throw "wrong colon location";
                        }
                    }
                    else {
                        throw "wrong length";
                    }

                    return {
                        hour,
                        minute
                    };
                }

                let timeComponents = getTimeComponents(time);
                return (timeComponents.hour * 60) + timeComponents.minute;
            }

            let failed = false;

            try {
                failed |= getTotalMinutes(startTime) < getTotalMinutes(dayStart);
                failed |= durationMinutes + getTotalMinutes(startTime) > getTotalMinutes(dayEnd);
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
}