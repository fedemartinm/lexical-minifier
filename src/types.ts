export interface MinifiedLexicalNode {
  t: string;
  v: number;
  c?: any[];
}

export type MinifierConfig<
  A extends string,
  B extends string,
  C extends number,
> = {
  minifiedType: A;
  type: B;
  version: C;
};

export type Minifier<
  I,
  O,
  A extends string,
  B extends string,
  C extends number,
> = {
  config: MinifierConfig<A, B, C>;
  minify: (data: I) => O;
  unminify: (data: O) => I;
};

export type GenericMinifier = Minifier<any, any, string, string, number>;
