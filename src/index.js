import { chapter2 } from "./get-started/chapter-2/chapter-2.js";
import { chapter3 } from "./get-started/chapter-3/chapter-3.js";
import { appendixA } from "./get-started/appendix-a/appendix-a.js";
import { appendixB } from "./get-started/appendix-b/appendix-b.js";

import { stringApi } from "./js-api/strings.js";

function execChapter(chapter, name) {
    console.log(`START - ${name}`);
    chapter();
    console.log(`END - ${name}`);
}

execChapter(chapter2, Object.keys({ chapter2 })[0]);
execChapter(chapter3, Object.keys({ chapter3 })[0]);
execChapter(appendixA, Object.keys({ appendixA })[0]);
execChapter(appendixB, Object.keys({ appendixB })[0]);
execChapter(stringApi, Object.keys({ stringApi })[0]);

let headerMessage = document.getElementById("message");
headerMessage.innerText = "All of the assertions have run";
