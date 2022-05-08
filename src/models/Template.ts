import type { ITemplate } from "@/types/interfaces";
import i18n from "../i18n";

export default class Template implements ITemplate {
  constructor(key = "template") {
    this.key = key;
    this.setDataFrom();
  }

  private data = "";
  private isRowTemplate = true;
  private key: string;
  private tokenMainKey: string | undefined;
  private tokens: any;
  private getFormattedTemplate(): string {
    let formattedTemplate = this.data;
    const { tokens, formatToken } = this;

    Object.entries(tokens).forEach(([tokenKey, tokenValue]) => {
      const visibleTokenValue = formatToken(tokenKey);
      formattedTemplate = formattedTemplate.replaceAll(
        visibleTokenValue,
        tokenValue as string
      );
    });

    return formattedTemplate;
  }
  // TODO separate logic to specific module
  private setDataFrom(src = "localStorage") {
    let templateData = "" as string | null;
    switch (src) {
      case "localStorage":
        templateData = window.localStorage.getItem(this.key);
        this.data = templateData ? JSON.parse(templateData) : "";
        break;
      default:
        throw Error(`Can't load data from ${src}`);
    }
  }
  formatToken(key: string, isTranslated = true) {
    const tokenKey = isTranslated ? i18n.t(`${this.tokenMainKey}.${key}`) : key;
    return `*${tokenKey}*`.toUpperCase();
  }

  switchTemplateMode() {
    this.isRowTemplate = !this.isRowTemplate;
  }

  setData(data: string) {
    this.data = data;
  }

  getData(): string {
    if (this.isRowTemplate) {
      return this.data;
    }
    return this.getFormattedTemplate();
  }

  save() {
    console.log(this.data);
    const textData = JSON.stringify(this.data);
    window.localStorage.setItem(this.key, textData);
  }

  load() {
    this.data = this.getData();
  }

  setToken(tokenKey: string, isTranslated = true) {
    this.data = `${this.data}${this.formatToken(tokenKey, isTranslated)}`;
  }

  setTokensData<T>(data: T, mainKey: string) {
    this.tokens = data;
    this.tokenMainKey = mainKey;
  }
}
