import type { SerializedTableCellNode } from "@lexical/table";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "tablecell",
    minifiedType: "y",
    version: 1,
  },
  (raw: SerializedTableCellNode, config) => ({
    ...elementMinifier.minify(raw),
    h: raw.headerState,
    w: raw.width,
    s: raw.colSpan,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    headerState: minified.h,
    width: minified.w,
    colSpan: minified.s,
    type: config.type,
    version: config.version,
  }),
);
