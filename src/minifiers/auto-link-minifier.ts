import type { SerializedAutoLinkNode } from "@lexical/link";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";
import { omitDefault, restoreDefault } from "../default-values";

export default buildMinifier(
  {
    type: "autolink",
    minifiedType: "u",
    version: 1,
  },
  (raw: SerializedAutoLinkNode, config) => ({
    ...elementMinifier.minify(raw),
    ...omitDefault("r", raw.rel, null),
    ...omitDefault("x", raw.target, null),
    ...omitDefault("u", raw.url, ""),
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    rel: restoreDefault(minified.r, null),
    target: restoreDefault(minified.x, null),
    url: restoreDefault(minified.u, ""),
    type: config.type,
    version: config.version,
  }),
);
