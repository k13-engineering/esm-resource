import type { TPlatformLoadAsBlobFunc } from "./types.ts";

const loadAsBlob: TPlatformLoadAsBlobFunc = ({ pathToLoad }) => {
  return fetch(pathToLoad).then((response) => {
    if (!response.ok) {
      throw new Error(`failed to load "${pathToLoad}"`);
    }

    return response.blob();
  });
};

export {
  loadAsBlob
};
