import type { SerializedCodeNode } from "@lexical/code";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "code",
    minifiedType: "c",
    version: 1,
  },
  (raw: SerializedCodeNode, config) => ({
    ...elementMinifier.minify(raw),
    l: raw.language,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    language: minified.l,
    type: config.type,
    version: config.version,
  }),
);
