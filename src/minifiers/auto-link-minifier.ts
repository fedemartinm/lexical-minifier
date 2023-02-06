import type { SerializedAutoLinkNode } from "@lexical/link";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "autolink",
    minifiedType: "u",
    version: 1,
  },
  (raw: SerializedAutoLinkNode, config) => ({
    ...elementMinifier.minify(raw),
    r: raw.rel,
    x: raw.target,
    u: raw.url,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    rel: minified.r,
    target: minified.x,
    url: minified.u,
    type: config.type,
    version: config.version,
  }),
);
