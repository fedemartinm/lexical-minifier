import type { SerializedLexicalNode } from "lexical";
import type { MinifiedLexicalNode, Minifier, MinifierConfig } from "./types";

/**
 * The `buildMinifier` function creates and returns an object that contains the necessary methods
 * and information for performing minification and unminification on serialized lexical nodes.
 *
 * The function takes in three arguments: a `MinifierConfig` object that contains information needed
 * for minification and unminification, a `minifyFunc` function that performs the actual minification,
 * and an `unminifyFunc` function that performs the actual unminification.
 *
 * The minify and unminify methods perform version and type checking on the data to ensure compatibility
 * with the MinifierConfig before applying the corresponding minification or unminification function.
 */
export function buildMinifier<
  K extends SerializedLexicalNode,
  U extends MinifiedLexicalNode,
  // Defining X, Y, and Z in this way for the types and version allows us to capture
  // the literal value of these values, which will be useful for detecting errors by
  // comparing the version and type defined in SerializedLexicalNode.
  X extends string,
  Y extends string,
  Z extends number,
>(
  config: Readonly<MinifierConfig<X, Y, Z>>,
  minifyFunc: (data: K, metadata: MinifierConfig<X, Y, Z>) => U,
  unminifyFunc: (data: U, metadata: MinifierConfig<X, Y, Z>) => K,
): Minifier<K, U, X, Y, Z> {
  const minify = (data: K) => {
    if (config.version !== data.version) {
      throw `version mismatch ${data.version} expected:${config.version}`;
    } else if (config.type !== data.type) {
      throw `type mismatch ${data.type} expected:${config.type}`;
    }
    return minifyFunc(data, config);
  };
  const unminify = (data: U) => {
    if (config.version !== data.v) {
      throw `version mismatch ${data.v} expected:${config.version}`;
    } else if (config.minifiedType !== data.t) {
      throw `type mismatch ${data.t} expected:${config.minifiedType}`;
    }
    return unminifyFunc(data, config);
  };
  return {
    config,
    minify,
    unminify,
  };
}
