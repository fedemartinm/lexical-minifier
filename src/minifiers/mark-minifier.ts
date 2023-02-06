import type { SerializedMarkNode } from "@lexical/mark";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "mark",
    minifiedType: "m",
    version: 1,
  },
  (raw: SerializedMarkNode, config) => ({
    ...elementMinifier.minify(raw),
    y: raw.ids,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    ids: minified.y,
    type: config.type,
    version: config.version,
  }),
);
