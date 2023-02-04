import type { SerializedMarkNode } from "@lexical/mark";
import { buildMinifier } from "../builder";
import { direction, format } from "../lookups/lookup-data";

export default buildMinifier(
  {
    type: "mark",
    minifiedType: "m",
    version: 1,
  },
  (raw: SerializedMarkNode, config) => ({
    c: raw.children,
    y: raw.ids,
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ids: minified.y,
    children: minified.c,
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
    type: config.type,
    version: config.version,
  }),
);
