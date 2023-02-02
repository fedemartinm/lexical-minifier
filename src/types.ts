/**
 * Defines the shape of a minified lexical node object.
 * @property t - The string representation of the type of the node `t`.
 * @property v - The number representation of the version of the node `v`.
 * @property c? - An optional array of child nodes `c`.
 */
export interface MinifiedLexicalNode {
  t: string;
  v: number;
  c?: any[];
}

/**
 * Defines the shape of an object for configuration of a minifier.
 *
 * By using `X extends string` and `Y extends number`, we limit `X` and `Y` to specific string
 * and number literals respectively, allowing for more precise type inferences in TypeScript.
 *
 * @property minifiedType - The string representing the minified type (X)
 * @property type - The string representing the original type (Y)
 * @property version - The number representing the version of the minification process (Z)
 */
export interface MinifierConfig<
  X extends string,
  Y extends string,
  Z extends number,
> {
  minifiedType: X;
  type: Y;
  version: Z;
}

/**
 * Defines the shape of an object for a minifier.
 * @property config - The configuration object that defines the minified type `X`, original type `Y`, and version `Z` of the minification process
 * @property minify - A function that takes in data of type `I` and returns the minified version of the data `O`
 * @property unminify - A function that takes in data of type `O` and returns the original version of the data `I`
 */
export interface Minifier<
  I = any,
  O = any,
  X extends string = string,
  Y extends string = string,
  Z extends number = number,
> {
  config: MinifierConfig<X, Y, Z>;
  minify: (data: I) => O;
  unminify: (data: O) => I;
}
