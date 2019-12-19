import { chapter2 } from "./get-started/chapter-2/chapter-2.js";
import { chapter3 } from "./get-started/chapter-3/chapter-3.js";

function execChapter(chapter, name) {
    console.log(`START - ${name}`);
    chapter();
    console.log(`END - ${name}`);
}

execChapter(chapter2, Object.keys({ chapter2 })[0]);
execChapter(chapter3, Object.keys({ chapter3 })[0]);

let headerMessage = document.getElementById("message");
headerMessage.innerText = "All of the assertions have run";
