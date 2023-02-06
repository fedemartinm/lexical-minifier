import type { SerializedRootNode } from "lexical";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "root",
    minifiedType: "r",
    version: 1,
  },
  (raw: SerializedRootNode, config) => ({
    ...elementMinifier.minify(raw),
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    type: config.type,
    version: config.version,
  }),
);
