import type { SerializedHeadingNode } from "@lexical/rich-text";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";
import { headingTag } from "../lookups/lookup-data";
import { omitDefault, restoreDefault } from "../default-values";

export default buildMinifier(
  {
    type: "heading",
    minifiedType: "h",
    version: 1,
  },
  (raw: SerializedHeadingNode, config) => ({
    ...elementMinifier.minify(raw),
    ...omitDefault("h", headingTag.toKey(raw.tag), 0),
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    tag: headingTag.fromKey(restoreDefault(minified.h, 0)),
    type: config.type,
    version: config.version,
  }),
);
