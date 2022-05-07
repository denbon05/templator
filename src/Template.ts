import type { ITemplate } from "./types/interfaces";

export default class Template implements ITemplate {
  private data: string | null;
  private key: string;

  private getData(): string | null {
    return window.localStorage.getItem(this.key);
  }

  constructor(key = "template") {
    this.key = key;
    this.data = this.getData();
  }

  save(data: string): boolean {
    try {
      const textData = JSON.stringify(data);
      window.localStorage.setItem(this.key, textData);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  load() {
    return this.data;
  }
}
