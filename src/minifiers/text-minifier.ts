import type { SerializedTextNode } from "lexical";
import { mode } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "text",
    minifiedType: "t",
    version: 1,
  },
  (raw: SerializedTextNode, config) => ({
    d: raw.detail,
    f: raw.format,
    m: mode.toKey(raw.mode),
    s: raw.style,
    x: raw.text,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    detail: minified.d,
    format: minified.f,
    mode: mode.fromKey(minified.m),
    style: minified.s,
    text: minified.x,
    type: config.type,
    version: config.version,
  }),
);
