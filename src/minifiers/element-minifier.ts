import type { SerializedElementNode } from "lexical";
import { buildPartialMinifier } from "../builder";
import { direction, format } from "../lookups/lookup-data";

type PartialSerializedElementNode = Omit<
  SerializedElementNode,
  "type" | "version"
>;

export default buildPartialMinifier(
  (raw: PartialSerializedElementNode) => ({
    c: raw.children,
    d: direction.toKey(raw.direction),
    f: format.toKey(raw.format),
    i: raw.indent,
  }),
  (minified) => ({
    children: minified.c,
    direction: direction.fromKey(minified.d),
    format: format.fromKey(minified.f),
    indent: minified.i,
  }),
);
