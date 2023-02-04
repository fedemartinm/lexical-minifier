import type { SerializedHeadingNode } from "@lexical/rich-text";
import { buildMinifier } from "../builder";
import { direction, format, headingTag } from "../lookups/lookup-data";

export default buildMinifier(
  {
    type: "heading",
    minifiedType: "h",
    version: 1,
  },
  (raw: SerializedHeadingNode, config) => ({
    c: raw.children,
    h: headingTag.toKey(raw.tag),
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    children: minified.c,
    tag: headingTag.fromKey(minified.h),
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
    type: config.type,
    version: config.version,
  }),
);
