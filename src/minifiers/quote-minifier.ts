import type { SerializedQuoteNode } from "@lexical/rich-text";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "quote",
    minifiedType: "q",
    version: 1,
  },
  (raw: SerializedQuoteNode, config) => ({
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
