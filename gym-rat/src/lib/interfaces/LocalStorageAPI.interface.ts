interface iLocalStorageAPI {
  name: string;
  get: () => Promise<any>;
}
