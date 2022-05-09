export interface ITemplate {
  save();
  load();
  setToken(tokenKey: string, isTranslated: boolean);
  getData(): string;
  setData(data: string);
  setTokensData<T>(data: T, mainKey: string);
  // formatToken(tokenKey: string, isTranslated: boolean): string;
}
