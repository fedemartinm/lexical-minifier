import type { SerializedListItemNode } from "@lexical/list";
import elementMinifier from "./element-minifier";
import { boolean } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "listitem",
    minifiedType: "e",
    version: 1,
  },
  (raw: SerializedListItemNode, config) => ({
    ...elementMinifier.minify(raw),
    k: boolean.toKey(raw.checked),
    w: raw.value,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    checked: boolean.fromKey(minified.k),
    value: minified.w,
    type: config.type,
    version: config.version,
  }),
);
