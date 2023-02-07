import { SerializedHeadingNode } from "@lexical/rich-text";
import type { SerializedListNode } from "@lexical/list";
import type { SerializedParagraphNode, SerializedTextNode } from "lexical";
import { LookupTable } from "./lookup-table";

export const listTag = new LookupTable<SerializedListNode["tag"]>(["ul", "ol"]);

export const listType = new LookupTable<SerializedListNode["listType"]>([
  "bullet",
  "check",
  "number",
]);

export const boolean = new LookupTable<boolean | undefined>([
  undefined,
  true,
  false,
]);

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

export const headingTag = new LookupTable<SerializedHeadingNode["tag"]>([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);
