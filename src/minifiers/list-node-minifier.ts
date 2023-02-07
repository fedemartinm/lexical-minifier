import type { SerializedListNode } from "@lexical/list";
import elementMinifier from "./element-minifier";
import { listTag, listType } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";
import { omitDefault, restoreDefault } from "../default-values";

export default buildMinifier(
  {
    type: "list",
    minifiedType: "i",
    version: 1,
  },
  (raw: SerializedListNode, config) => ({
    ...elementMinifier.minify(raw),
    ...omitDefault("q", listType.toKey(raw.listType), 0),
    ...omitDefault("w", listTag.toKey(raw.tag), 0),
    ...omitDefault("s", raw.start, 1),
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    listType: listType.fromKey(restoreDefault(minified.q, 0)),
    tag: listTag.fromKey(restoreDefault(minified.w, 0)),
    start: restoreDefault(minified.s, 1),
    type: config.type,
    version: config.version,
  }),
);
