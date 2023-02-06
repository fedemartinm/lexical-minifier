import type { SerializedTableNode } from "@lexical/table";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "table",
    minifiedType: "b",
    version: 1,
  },
  (raw: SerializedTableNode, config) => ({
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
