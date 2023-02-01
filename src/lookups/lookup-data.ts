import type { SerializedParagraphNode, SerializedTextNode } from "lexical";
import { LookupTable } from "./lookup-table";

export const direction = new LookupTable<SerializedParagraphNode["direction"]>([
  null,
  "ltr",
  "rtl",
]);

export const format = new LookupTable<SerializedParagraphNode["format"]>([
  "",
  "center",
  "end",
  "justify",
  "left",
  "right",
  "start",
]);

export const mode = new LookupTable<SerializedTextNode["mode"]>([
  "normal",
  "token",
  "segmented",
]);
