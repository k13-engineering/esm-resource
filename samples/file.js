import { loadAsBinary, loadAsUtf8String } from "../lib/index.js";

const fileAsBinary = await loadAsBinary({ importMeta: import.meta, filepath: "./assets/hello.txt" });
const fileAsUtf8String = await loadAsUtf8String({ importMeta: import.meta, filepath: "./assets/hello.txt" });

console.log({ fileAsBinary, fileAsUtf8String });