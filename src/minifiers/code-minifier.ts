import type { SerializedCodeNode } from "@lexical/code";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";
import { omitDefault, restoreDefault } from "../default-values";

export default buildMinifier(
  {
    type: "code",
    minifiedType: "c",
    version: 1,
  },
  (raw: SerializedCodeNode, config) => ({
    ...elementMinifier.minify(raw),
    ...omitDefault("l", raw.language, undefined),
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    language: restoreDefault(minified.l, undefined),
    type: config.type,
    version: config.version,
  }),
);
