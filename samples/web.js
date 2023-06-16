import express from "express";
import { resolve } from "../lib/index.js";

const app = express();

app.use("/", express.static(resolve({ importMeta: import.meta, filepath: "./web" })));
app.use("/esm-resource", express.static(resolve({ importMeta: import.meta, filepath: "../" })));

app.listen(8080);
