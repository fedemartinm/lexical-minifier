import type { SerializedListItemNode } from "@lexical/list";
import elementMinifier from "./element-minifier";
import { boolean } from "../lookups/lookup-data";
import { buildMinifier } from "../builder";
import { omitDefault, restoreDefault } from "../default-values";

export default buildMinifier(
  {
    type: "listitem",
    minifiedType: "e",
    version: 1,
  },
  (raw: SerializedListItemNode, config) => ({
    ...elementMinifier.minify(raw),
    ...omitDefault("k", boolean.toKey(raw.checked), 0),
    w: raw.value,
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    ...elementMinifier.unminify(minified),
    checked: boolean.fromKey(restoreDefault(minified.k, 0)),
    value: minified.w,
    type: config.type,
    version: config.version,
  }),
);
