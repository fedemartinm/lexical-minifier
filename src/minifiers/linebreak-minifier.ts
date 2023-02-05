import type { SerializedLineBreakNode } from "lexical";
import { buildMinifier } from "../builder";

export default buildMinifier(
  {
    type: "linebreak",
    minifiedType: "n",
    version: 1,
  },
  (_raw: SerializedLineBreakNode, config) => ({
    t: config.minifiedType,
    v: config.version,
  }),
  (_minified, config) => ({
    type: config.type,
    version: config.version,
  }),
);
