import type { SerializedListNode } from "@lexical/list";
import elementMinifier from "./element-minifier";
import { listTag, listType } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "list",
    minifiedType: "i",
    version: 1,
  },
  (raw: SerializedListNode, config) => ({
    ...elementMinifier.minify(raw),
    q: listType.toKey(raw.listType),
    w: listTag.toKey(raw.tag),
    s: raw.start,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    listType: listType.fromKey(minified.q),
    tag: listTag.fromKey(minified.w),
    start: minified.s,
    type: config.type,
    version: config.version,
  }),
);
