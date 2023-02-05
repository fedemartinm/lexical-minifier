import type { SerializedListItemNode } from "@lexical/list";
import { boolean, direction, format } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "listitem",
    minifiedType: "e",
    version: 1,
  },
  (raw: SerializedListItemNode, config) => ({
    k: boolean.toKey(raw.checked),
    w: raw.value,
    c: raw.children,
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    checked: boolean.fromKey(minified.k),
    value: minified.w,
    children: minified.c,
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
    type: config.type,
    version: config.version,
  }),
);
