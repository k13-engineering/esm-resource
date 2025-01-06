import type { TPlatformLoadAsBlobFunc } from "./types.ts";

const loadAsBuffer = ({ pathToLoad }: { pathToLoad: string }) => {
  return import("node:fs").then((nodeFs) => {
    return nodeFs.promises.readFile(pathToLoad);
  });
};

const loadAsBlob: TPlatformLoadAsBlobFunc = ({ pathToLoad }) => {
  return loadAsBuffer({ pathToLoad }).then((buffer) => {
    return import("node:buffer").then((nodeBuffer) => {
      return new nodeBuffer.Blob([buffer]) as Blob;
    });
  });
};

export {
  loadAsBlob
};
