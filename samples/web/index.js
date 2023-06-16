import { loadAsBinary, loadAsUtf8String } from "./esm-resource/lib/index.js";

const fileAsBinary = await loadAsBinary({ importMeta: import.meta, filepath: "./hello.txt" });
const fileAsUtf8String = await loadAsUtf8String({ importMeta: import.meta, filepath: "./hello.txt" });

console.log({ fileAsBinary, fileAsUtf8String });
