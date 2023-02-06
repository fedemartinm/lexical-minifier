import type { SerializedParagraphNode } from "lexical";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "paragraph",
    minifiedType: "p",
    version: 1,
  },
  (raw: SerializedParagraphNode, config) => ({
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
