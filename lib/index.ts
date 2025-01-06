import type { TPlatformModule, TImportMeta } from "./types.ts";
import { loadAsBlob as browserLoadAsBlob } from "./browser.ts";
import { loadAsBlob as denoLoadAsBlob } from "./deno.ts";
import { loadAsBlob as nodeLoadAsBlob } from "./node.ts";

const findScriptPathByUrl = ({ url }: { url: string }) => {
  const [protocol, ...remaining] = url.split("://");

  const path = remaining.join("://");

  if (protocol === "file") {
    return path;
  } else if (protocol === "http" || protocol === "https") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [host, ...remainingPath] = path.split("/");

    return ["", ...remainingPath].join("/");
  } else {
    throw new Error(`unsupported protocol in "${url}"`);
  }
};

const resolve = ({ importMeta, filepath }: { importMeta: TImportMeta, filepath: string }) => {
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

const determineNativeModule = (): TPlatformModule => {
  if (typeof window === "undefined") {
    if (typeof (globalThis as Record<string, unknown>).process === "undefined") {
      throw new Error("unknown platform");
    } else {

      return {
        loadAsBlob: nodeLoadAsBlob
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof (window as any).Deno !== "undefined") {
    return {
      loadAsBlob: denoLoadAsBlob
    };
  }

  return {
    loadAsBlob: browserLoadAsBlob
  };
};

const loadAsBlob = ({ importMeta, filepath }: { importMeta: TImportMeta, filepath: string }) => {
  const pathToLoad = resolve({ importMeta, filepath });
  const nativeModule = determineNativeModule();

  return nativeModule.loadAsBlob({ pathToLoad });
};

export {
  resolve,
  loadAsBlob
};

export type {
  TPlatformModule
};
