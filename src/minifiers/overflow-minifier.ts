import type { SerializedOverflowNode } from "@lexical/overflow";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "overflow",
    minifiedType: "o",
    version: 1,
  },
  (raw: SerializedOverflowNode, config) => ({
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
