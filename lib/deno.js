const loadAsBinary = ({ pathToLoad }) => {
  return Deno.readFile(pathToLoad);
};

const loadAsUtf8String = ({ pathToLoad }) => {
  return Deno.readTextFile(pathToLoad);
};

export {
  loadAsBinary,
  loadAsUtf8String
};
