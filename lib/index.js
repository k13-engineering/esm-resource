const findScriptPathByUrl = ({ url }) => {
  const [protocol, ...remaining] = url.split("://");

  const path = remaining.join("://");

  if (protocol === "file") {
    return path;
  } else if (protocol === "http" || protocol === "https") {
    const [host, ...remainingPath] = path.split("/");

    return ["", ...remainingPath].join("/");
  } else {
    throw new Error(`unsupported protocol in "${url}"`);
  }
};

const resolve = ({ importMeta, filepath }) => {
  const { url } = importMeta;

  if (filepath.startsWith("/")) {
    throw new Error("absolute paths not supported");
  }

  const scriptPath = findScriptPathByUrl({ url });

  const scriptPathParts = scriptPath.split("/");
  const filepathParts = filepath.split("/");

  const scriptDirParts = [...scriptPathParts.slice(0, scriptPathParts.length - 1)];

  const resolvedParts = [...scriptDirParts, ...filepathParts].filter((part) => {
    return part !== ".";
  });

  const resolvedPath = resolvedParts.join("/");

  return resolvedPath;
};

let pNativeModule = undefined;

const maybeLoadNative = () => {
  if (!pNativeModule) {
    if (typeof window === "undefined") {
      if (typeof process === "undefined") {
        throw new Error("unknown platform");
      } else {
        pNativeModule = import("./node.js").then((imported) => {
          return {
            loadAsBinary: imported.loadAsBinary,
            loadAsUtf8String: imported.loadAsUtf8String
          };
        });
      }
    } else if (typeof window.Deno !== "undefined") {
      pNativeModule = import("./deno.js").then((imported) => {
        return {
          loadAsBinary: imported.loadAsBinary,
          loadAsUtf8String: imported.loadAsUtf8String
        };
      });
    } else {
      pNativeModule = import("./browser.js").then((imported) => {
        return {
          loadAsBinary: imported.loadAsBinary,
          loadAsUtf8String: imported.loadAsUtf8String
        };
      });
    }
  }

  return pNativeModule;
};

const loadAsBinary = ({ importMeta, filepath }) => {
  const pathToLoad = resolve({ importMeta, filepath });

  return maybeLoadNative().then((nativeModule) => {
    return nativeModule.loadAsBinary({ pathToLoad });
  });
};

const loadAsUtf8String = ({ importMeta, filepath }) => {
  const pathToLoad = resolve({ importMeta, filepath });

  return maybeLoadNative().then((nativeModule) => {
    return nativeModule.loadAsUtf8String({ pathToLoad });
  });
};

export {
  resolve,

  loadAsBinary,
  loadAsUtf8String
};
