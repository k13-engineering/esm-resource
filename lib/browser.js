const loadAsBinary = ({ pathToLoad }) => {
  return fetch(pathToLoad).then((response) => {
    if (!response.ok) {
      throw new Error(`failed to load "${pathToLoad}"`);
    }

    return response.arrayBuffer().then((arrayBuffer) => {
      return new Uint8Array(arrayBuffer);
    });
  });
};

const loadAsUtf8String = ({ pathToLoad }) => {
  return fetch(pathToLoad).then((response) => {
    if (!response.ok) {
      throw new Error(`failed to load "${pathToLoad}"`);
    }

    return response.text();
  });
};

export {
  loadAsBinary,
  loadAsUtf8String
};
