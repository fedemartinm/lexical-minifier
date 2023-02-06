import type { SerializedHeadingNode } from "@lexical/rich-text";
import elementMinifier from "./element-minifier";
import { buildMinifier } from "../builder";
import { headingTag } from "../lookups/lookup-data";

export default buildMinifier(
  {
    type: "heading",
    minifiedType: "h",
    version: 1,
  },
  (raw: SerializedHeadingNode, config) => ({
    ...elementMinifier.minify(raw),
    h: headingTag.toKey(raw.tag),
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    tag: headingTag.fromKey(minified.h),
    type: config.type,
    version: config.version,
  }),
);
