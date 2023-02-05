import { SerializedTableNode } from "@lexical/table";
import { direction, format } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "table",
    minifiedType: "b",
    version: 1,
  },
  (raw: SerializedTableNode, config) => ({
    c: raw.children,
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    children: minified.c,
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
    type: config.type,
    version: config.version,
  }),
);
