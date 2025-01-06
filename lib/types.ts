// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ourMeta = import.meta;
type TImportMeta = typeof ourMeta;

type TPlatformLoadAsBlobFunc = (args: { pathToLoad: string }) => Promise<Blob>;
type TPlatformModule = {
  loadAsBlob: TPlatformLoadAsBlobFunc;
};

export type {
  TImportMeta,
  TPlatformLoadAsBlobFunc,
  TPlatformModule
};
