import fs from "fs";

const loadAsBuffer = ({ pathToLoad }) => {
  return fs.promises.readFile(pathToLoad);
};

const loadAsBinary = ({ pathToLoad }) => {
  return loadAsBuffer({ pathToLoad }).then((buffer) => {
    return new Uint8Array(buffer.buffer);
  });
};

const loadAsUtf8String = ({ pathToLoad }) => {
  return loadAsBuffer({ pathToLoad }).then((buffer) => {
    return buffer.toString("utf8");
  });
};

export {
  loadAsBinary,
  loadAsUtf8String
};
