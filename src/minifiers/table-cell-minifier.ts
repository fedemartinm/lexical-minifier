import type { SerializedTableCellNode } from "@lexical/table";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";
import { omitDefault, restoreDefault } from "../default-values";

export default buildMinifier(
  {
    type: "tablecell",
    minifiedType: "y",
    version: 1,
  },
  (raw: SerializedTableCellNode, config) => ({
    ...elementMinifier.minify(raw),
    ...omitDefault("h", raw.headerState, 0),
    ...omitDefault("w", raw.width, undefined),
    ...omitDefault("s", raw.colSpan, 1),
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    headerState: restoreDefault(minified.h, 0),
    width: restoreDefault(minified.w, undefined),
    colSpan: restoreDefault(minified.s, 1),
    type: config.type,
    version: config.version,
  }),
);
