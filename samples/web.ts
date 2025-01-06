import express from "express";
import { resolve } from "../lib/index.ts";

const app = express();

app.use("/", express.static(resolve({ importMeta: import.meta, filepath: "./web" })));
app.use("/esm-resource", express.static(resolve({ importMeta: import.meta, filepath: "../" })));

const port = 8080;
app.listen(port, () => {
  console.log(`listening on :${port}`);
});
