import { SerializedTableCellNode } from "@lexical/table";
import { direction, format } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "tablecell",
    minifiedType: "y",
    version: 1,
  },
  (raw: SerializedTableCellNode, config) => ({
    h: raw.headerState,
    w: raw.width,
    s: raw.colSpan,
    c: raw.children,
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    headerState: minified.h,
    width: minified.w,
    colSpan: minified.s,
    children: minified.c,
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
    type: config.type,
    version: config.version,
  }),
);
