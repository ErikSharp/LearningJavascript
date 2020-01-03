import { chapter2 } from "./get-started/chapter-2/chapter-2.js";
import { chapter3 } from "./get-started/chapter-3/chapter-3.js";
import { appendixA } from "./get-started/appendix-a/appendix-a.js";
import { appendixB } from "./get-started/appendix-b/appendix-b.js";

import { numbers } from "./w3schools/numbers.js";
import { arrays } from "./w3schools/arrays.js";
import { dates } from "./w3schools/dates.js";
import { strings } from "./w3schools/strings.js";

function execChapter(chapter, name) {
    console.log(`START - ${name}`);
    chapter();
    console.log(`END - ${name}`);
}

execChapter(chapter2, Object.keys({ chapter2 })[0]);
execChapter(chapter3, Object.keys({ chapter3 })[0]);
execChapter(appendixA, Object.keys({ appendixA })[0]);
execChapter(appendixB, Object.keys({ appendixB })[0]);
execChapter(strings, Object.keys({ strings })[0]);
execChapter(numbers, Object.keys({ numbers })[0]);
execChapter(arrays, Object.keys({ arrays })[0]);
execChapter(dates, Object.keys({ dates })[0]);

let headerMessage = document.getElementById("message");
headerMessage.innerText = "All of the assertions have run";
