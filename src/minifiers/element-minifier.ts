import type { SerializedElementNode } from "lexical";
import { buildPartialMinifier } from "../builder";
import { omitDefault, restoreDefault } from "../default-values";
import { direction, format } from "../lookups/lookup-data";

type PartialSerializedElementNode = Omit<
  SerializedElementNode,
  "type" | "version"
>;

export default buildPartialMinifier(
  (raw: PartialSerializedElementNode) => ({
    c: raw.children,
    ...omitDefault("d", direction.toKey(raw.direction), 0),
    ...omitDefault("f", format.toKey(raw.format), 0),
    ...omitDefault("i", raw.indent, 0),
  }),
  (minified) => ({
    children: minified.c,
    direction: direction.fromKey(restoreDefault(minified.d, 0)),
    format: format.fromKey(restoreDefault(minified.f, 0)),
    indent: restoreDefault(minified.i, 0),
  }),
);
