import type { SerializedListNode } from "@lexical/list";
import { direction, format, listTag, listType } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "list",
    minifiedType: "i",
    version: 1,
  },
  (raw: SerializedListNode, config) => ({
    q: listType.toKey(raw.listType),
    w: listTag.toKey(raw.tag),
    s: raw.start,
    c: raw.children,
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    listType: listType.fromKey(minified.q),
    tag: listTag.fromKey(minified.w),
    start: minified.s,
    children: minified.c,
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
    type: config.type,
    version: config.version,
  }),
);
