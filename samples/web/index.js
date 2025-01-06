import { loadAsBlob } from "./esm-resource/dist/lib/index.js";

const fileAsBlob = await loadAsBlob({ importMeta: import.meta, filepath: "./hello.txt" });

// eslint-disable-next-line no-undef
console.log({ fileAsBlob });
