import type { SerializedLinkNode } from "@lexical/link";
import { direction, format } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "link",
    minifiedType: "l",
    version: 1,
  },
  (raw: SerializedLinkNode, config) => ({
    c: raw.children,
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
    r: raw.rel,
    x: raw.target,
    u: raw.url,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    children: minified.c,
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
    rel: minified.r,
    target: minified.x,
    url: minified.u,
    type: config.type,
    version: config.version,
  }),
);
