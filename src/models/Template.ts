import type { ITemplate } from "@/types/interfaces";
import i18n from "../i18n";

export default class Template implements ITemplate {
  constructor(tokenMainKey: string, key = "template") {
    this.key = key;
    this.data = "";
    this.isRowTemplate = true;
    this.tokenMainKey = tokenMainKey;

    this.setDataFromLocalStorage();
  }

  private data: string;
  private isRowTemplate: boolean;
  private key: string;
  private tokenMainKey: string;
  private tokens: any;
  private getFormattedTemplate(): string {
    let formattedTemplate = this.data;
    const { tokens } = this;

    Object.entries(tokens).forEach(([tokenKey, tokenValue]) => {
      const visibleTokenValue = this.formatToken(tokenKey);
      formattedTemplate = formattedTemplate.replaceAll(
        visibleTokenValue,
        tokenValue as string
      );
    });

    return formattedTemplate;
  }
  private setDataFromLocalStorage() {
    const templateData = window.localStorage.getItem(this.key);
    this.data = templateData ? JSON.parse(templateData) : "";
  }
  private formatToken(key: string, isTranslated = true) {
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
    const textData = JSON.stringify(this.data);
    window.localStorage.setItem(this.key, textData);
  }

  load() {
    this.setDataFromLocalStorage();
  }

  setToken(tokenKey: string, isTranslated = true) {
    this.data = `${this.data}${this.formatToken(tokenKey, isTranslated)}`;
  }

  setTokensData<T>(data: T, mainKey?: string) {
    this.tokens = data;
    if (mainKey) {
      this.tokenMainKey = mainKey;
    }
  }
}
