export interface ITemplate {
  save(data: string): boolean;
  load(): string | null;
}
