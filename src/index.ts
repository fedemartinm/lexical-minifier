export { minify, unminify, toArrayPack, fromArrayPack } from "./utils";
export { buildMinifier } from "./builder";
export { LexicalMinifier } from "./lexical-minifier";
export { LookupTable } from "./lookups/lookup-table";

export type {
  ArrayPackNode,
  MinifiedLexicalNode,
  Minifier,
  MinifierConfig,
} from "./types";
