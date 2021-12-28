export type Params = {
  payload: any;
  subject?: string;
};

export interface TokenProvider {
  generate(params: Params): Promise<string>;
}
