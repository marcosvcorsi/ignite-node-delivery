export interface HashProvider {
  generate(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}
