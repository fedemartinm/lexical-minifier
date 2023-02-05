import listNodeMinifier from "../src/minifiers/list-node-minifier";
import { SerializedListNode } from "@lexical/list";
import { create, oneOf } from "./utils";

describe("list-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedListNode = {
      listType: "bullet",
      start: 0,
      tag: "ol",
      children: [],
      type: "list",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = listNodeMinifier.minify(serialized);

    expect(minified).toEqual({
      q: 0,
      w: 0,
      s: 0,
      c: [],
      d: 2,
      f: 6,
      i: 0,
      t: "i",
      v: 1,
    });

    const outputData = listNodeMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different list nodes", () => {
    const items = create<SerializedListNode>({
      listType: oneOf("number", "bullet", "check"),
      tag: oneOf("ol", "ul"),
      start: 3,
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "list",
      version: 1,
    });
    items.forEach((item) => {
      const minified = listNodeMinifier.minify(item);
      const unminified = listNodeMinifier.unminify(minified);
      expect(unminified).toEqual(item);
    });
  });
});
