import type { SerializedTableRowNode } from "@lexical/table";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "tablerow",
    minifiedType: "w",
    version: 1,
  },
  (raw: SerializedTableRowNode, config) => ({
    ...elementMinifier.minify(raw),
    h: raw.height,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    height: minified.h,
    type: config.type,
    version: config.version,
  }),
);
