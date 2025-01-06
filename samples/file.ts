import { loadAsBlob } from "../lib/index.ts";

const fileAsBlob = await loadAsBlob({ importMeta: import.meta, filepath: "./assets/hello.txt" });

console.log({ fileAsBlob });
